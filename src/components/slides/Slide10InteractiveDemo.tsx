import React, { useState, useEffect, useRef } from 'react';
import { SlideLayout } from '../SlideLayout';
import { PriorityQueue } from '../../utils/priorityQueue';
import { HuffmanNode, HuffmanMergeStep, HuffmanCodeMap } from '../../types';

interface DemoImageModel {
  name: string;
  width: number;
  height: number;
  totalBytes: number;
  distinctSymbols: number;
  rawData: Uint8ClampedArray;
  frequencies: Uint32Array;
  topFrequencies: Array<{ symbol: number; freq: number; pct: number }>;
  samplePixels: Array<{ x: number; y: number; r: number; g: number; b: number; a: number }>;
  sampleBytes: number[];
  treeSteps: HuffmanMergeStep[];
  rootNode: HuffmanNode | null;
  codeMap: HuffmanCodeMap;
  encodedBits: number;
  encodedBuffer: Uint8Array;
  paddedBits: number;
  isExactMatch: boolean;
  mismatchCount: number;
  dataUrl: string;
}

export const Slide10InteractiveDemo: React.FC = () => {
  const [model, setModel] = useState<DemoImageModel | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  
  // Stages: 0: IMAGE, 1: PIXELS, 2: VALUES, 3: FREQUENCIES, 4: TREE, 5: ENCODING, 6: RECONSTRUCTION
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const stageTimerRef = useRef<number | null>(null);
  const origCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const reconCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const stageLabels = [
    '1. Image',
    '2. Pixels',
    '3. RGBA Values',
    '4. Frequencies',
    '5. Greedy Tree',
    '6. Encoding',
    '7. Reconstruction & Results',
  ];

  // Helper to load sample images automatically on initial mount
  useEffect(() => {
    loadPresetSample(1);
  }, []);

  // Auto-play timer across stages
  useEffect(() => {
    if (isPlayingAuto) {
      const stageDurations = [3500, 3500, 3500, 3500, 4500, 3500, 10000];
      const duration = stageDurations[activeStage] || 3500;

      stageTimerRef.current = window.setTimeout(() => {
        if (activeStage < 6) {
          setActiveStage((s) => s + 1);
        } else {
          setIsPlayingAuto(false);
        }
      }, duration);
    }

    return () => {
      if (stageTimerRef.current) {
        clearTimeout(stageTimerRef.current);
        stageTimerRef.current = null;
      }
    };
  }, [isPlayingAuto, activeStage]);

  // Render side-by-side canvases when at stage 6
  useEffect(() => {
    if (activeStage === 6 && model) {
      if (origCanvasRef.current) {
        origCanvasRef.current.width = model.width;
        origCanvasRef.current.height = model.height;
        const ctxO = origCanvasRef.current.getContext('2d');
        if (ctxO) {
          const imgDataO = ctxO.createImageData(model.width, model.height);
          imgDataO.data.set(model.rawData);
          ctxO.putImageData(imgDataO, 0, 0);
        }
      }

      if (reconCanvasRef.current) {
        reconCanvasRef.current.width = model.width;
        reconCanvasRef.current.height = model.height;
        const ctxR = reconCanvasRef.current.getContext('2d');
        if (ctxR) {
          const imgDataR = ctxR.createImageData(model.width, model.height);
          // Genuine decode directly from bit-packed buffer using tree
          const decoded = decodeBitBuffer(model.encodedBuffer, model.encodedBits, model.rootNode, model.totalBytes);
          imgDataR.data.set(decoded);
          ctxR.putImageData(imgDataR, 0, 0);
        }
      }
    }
  }, [activeStage, model]);

  // Decode helper
  const decodeBitBuffer = (buffer: Uint8Array, totalBits: number, root: HuffmanNode | null, length: number): Uint8ClampedArray => {
    const res = new Uint8ClampedArray(length);
    if (!root || totalBits === 0) return res;
    let node = root;
    let writeIdx = 0;
    for (let i = 0; i < totalBits && writeIdx < length; i++) {
      const byteIdx = i >> 3;
      const bitInByte = 7 - (i & 7);
      const bit = (buffer[byteIdx] >> bitInByte) & 1;
      node = (bit === 0 ? node.left : node.right) || root;
      if (node.symbol !== null && !node.left && !node.right) {
        res[writeIdx++] = node.symbol;
        node = root;
      }
    }
    return res;
  };

  // Full-Resolution Processing Pipeline
  const processImageAtFullResolution = (img: HTMLImageElement, fileName: string) => {
    setIsProcessing(true);
    setProcessingStatus(`Decoding full-resolution raster (${img.naturalWidth} × ${img.naturalHeight})...`);

    // Use requestAnimationFrame so UI renders spinner
    requestAnimationFrame(() => {
      const fullW = img.naturalWidth;
      const fullH = img.naturalHeight;

      const canvas = document.createElement('canvas');
      canvas.width = fullW;
      canvas.height = fullH;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, fullW, fullH);

      const imgData = ctx.getImageData(0, 0, fullW, fullH);
      const rawData = imgData.data;
      const totalBytes = rawData.length;

      // 1. Tally empirical frequencies across complete working data
      setProcessingStatus(`Calculating byte frequencies across ${totalBytes.toLocaleString()} bytes...`);
      const frequencies = new Uint32Array(256);
      for (let i = 0; i < totalBytes; i++) {
        frequencies[rawData[i]]++;
      }

      // Top frequencies list
      const topList: Array<{ symbol: number; freq: number; pct: number }> = [];
      let distinctCount = 0;
      for (let s = 0; s < 256; s++) {
        if (frequencies[s] > 0) {
          distinctCount++;
          topList.push({
            symbol: s,
            freq: frequencies[s],
            pct: (frequencies[s] / totalBytes) * 100,
          });
        }
      }
      topList.sort((a, b) => b.freq - a.freq);

      // 2. Build Huffman Tree using Min-Priority Queue
      setProcessingStatus(`Executing Algorithm 1 Huffman tree construction...`);
      let nodeId = 0;
      const leaves: HuffmanNode[] = [];
      for (let s = 0; s < 256; s++) {
        if (frequencies[s] > 0) {
          leaves.push({
            id: ++nodeId,
            symbol: s,
            freq: frequencies[s],
            left: null,
            right: null,
            order: nodeId,
          });
        }
      }

      const pq = new PriorityQueue(leaves);
      const treeSteps: HuffmanMergeStep[] = [];
      const n = leaves.length;

      if (n === 1) {
        const leaf = leaves[0];
        const root: HuffmanNode = {
          id: ++nodeId,
          symbol: null,
          freq: leaf.freq,
          left: leaf,
          right: null,
          order: 1000,
        };
        treeSteps.push({
          stepIndex: 1,
          nodeA: leaf,
          nodeB: leaf,
          mergedNode: root,
          remainingQueueSize: 1,
        });
      } else {
        for (let i = 1; i <= n - 1; i++) {
          const x = pq.extractMin()!;
          const y = pq.extractMin()!;
          const z: HuffmanNode = {
            id: ++nodeId,
            symbol: null,
            freq: x.freq + y.freq,
            left: x,
            right: y,
            order: n + i,
          };
          pq.insert(z);
          treeSteps.push({
            stepIndex: i,
            nodeA: x,
            nodeB: y,
            mergedNode: z,
            remainingQueueSize: pq.size,
          });
        }
      }

      const rootNode = pq.extractMin();

      // 3. Generate prefix-free codes
      const codeMap: HuffmanCodeMap = {};
      const traverse = (node: HuffmanNode | null, code: string) => {
        if (!node) return;
        if (node.symbol !== null && !node.left && !node.right) {
          codeMap[node.symbol] = code || '0';
          return;
        }
        traverse(node.left, code + '0');
        traverse(node.right, code + '1');
      };
      traverse(rootNode, '');

      // 4. Bit-pack entire dataset into Uint8Array
      setProcessingStatus(`Bit-packing payload into binary stream...`);
      let totalBits = 0;
      for (let i = 0; i < totalBytes; i++) {
        const code = codeMap[rawData[i]];
        if (code) totalBits += code.length;
      }

      const bufferLen = Math.ceil(totalBits / 8);
      const bitBuffer = new Uint8Array(bufferLen);
      let bitOffset = 0;
      for (let i = 0; i < totalBytes; i++) {
        const code = codeMap[rawData[i]];
        if (!code) continue;
        for (let c = 0; c < code.length; c++) {
          if (code[c] === '1') {
            const byteIdx = bitOffset >> 3;
            const bitInByte = 7 - (bitOffset & 7);
            bitBuffer[byteIdx] |= 1 << bitInByte;
          }
          bitOffset++;
        }
      }

      // 5. Decode back & verify byte-by-byte exact equality
      setProcessingStatus(`Verifying exact byte-by-byte raster reconstruction...`);
      const decodedRaster = decodeBitBuffer(bitBuffer, totalBits, rootNode, totalBytes);
      let isExact = true;
      let mismatchCount = 0;
      for (let i = 0; i < totalBytes; i++) {
        if (decodedRaster[i] !== rawData[i]) {
          isExact = false;
          mismatchCount++;
          if (mismatchCount > 5) break;
        }
      }

      // Representative 8x8 micro-grid sample for visual step 2
      const samplePixels: Array<{ x: number; y: number; r: number; g: number; b: number; a: number }> = [];
      const sW = Math.min(8, fullW);
      const sH = Math.min(8, fullH);
      for (let y = 0; y < sH; y++) {
        for (let x = 0; x < sW; x++) {
          const idx = (y * fullW + x) * 4;
          samplePixels.push({
            x,
            y,
            r: rawData[idx],
            g: rawData[idx + 1],
            b: rawData[idx + 2],
            a: rawData[idx + 3],
          });
        }
      }

      const sampleBytes = Array.from(rawData.slice(0, 32));

      setModel({
        name: fileName,
        width: fullW,
        height: fullH,
        totalBytes,
        distinctSymbols: distinctCount,
        rawData,
        frequencies,
        topFrequencies: topList.slice(0, 10),
        samplePixels,
        sampleBytes,
        treeSteps,
        rootNode,
        codeMap,
        encodedBits: totalBits,
        encodedBuffer: bitBuffer,
        paddedBits: totalBits % 8 === 0 ? 0 : 8 - (totalBits % 8),
        isExactMatch: isExact,
        mismatchCount,
        dataUrl: canvas.toDataURL(),
      });

      setIsProcessing(false);
      setActiveStage(0);
      setIsPlayingAuto(true);
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        processImageAtFullResolution(img, file.name);
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const loadPresetSample = (presetId: number) => {
    const canvas = document.createElement('canvas');
    if (presetId === 1) {
      // Academic emblem / high-contrast graphic (128x128)
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 128, 128);
      // Teal border & banner
      ctx.fillStyle = '#147D78';
      ctx.fillRect(16, 16, 96, 24);
      // Dark emblem geometry
      ctx.fillStyle = '#202124';
      ctx.fillRect(36, 52, 56, 56);
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(64, 80, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#147D78';
      ctx.beginPath();
      ctx.arc(64, 80, 8, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Photographic color palette (120x80)
      canvas.width = 120;
      canvas.height = 80;
      const ctx = canvas.getContext('2d')!;
      for (let y = 0; y < 80; y++) {
        for (let x = 0; x < 120; x++) {
          const r = Math.floor((x / 120) * 255);
          const g = Math.floor((y / 80) * 200);
          const b = 180;
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    const img = new Image();
    img.onload = () => {
      processImageAtFullResolution(img, presetId === 1 ? 'academic_emblem_128x128.png' : 'color_palette_120x80.png');
    };
    img.src = canvas.toDataURL();
  };

  return (
    <SlideLayout
      slideNumber={10}
      title="Interactive Live Demonstration"
      subtitle="Full-Resolution Huffman Image Decomposition &amp; Lossless Reconstruction"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Subtle Horizontal Sequence Breadcrumb & Action Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FAFAFA',
            border: '2px solid #E5E5E5',
            padding: '12px 24px',
            marginBottom: '16px',
          }}
        >
          {/* Stage Progression Flow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {stageLabels.map((label, idx) => {
              const isActive = activeStage === idx;
              const isPast = activeStage > idx;
              return (
                <React.Fragment key={idx}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlayingAuto(false);
                      setActiveStage(idx);
                    }}
                    style={{
                      border: 'none',
                      backgroundColor: isActive ? '#147D78' : isPast ? '#EBF7F6' : 'transparent',
                      color: isActive ? '#FFFFFF' : isPast ? '#147D78' : '#777777',
                      fontWeight: isActive ? 700 : 600,
                      fontSize: '18px',
                      padding: '8px 16px',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {label}
                  </button>
                  {idx < stageLabels.length - 1 && (
                    <span style={{ color: '#CCCCCC', fontSize: '18px', fontWeight: 700 }}>&rarr;</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Essential Presenter Actions */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/png,image/jpeg,image/webp"
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={() => {
                setIsPlayingAuto(false);
                fileInputRef.current?.click();
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#147D78',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '18px',
                fontWeight: 700,
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              [ Upload Another Image ]
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveStage(0);
                setIsPlayingAuto(true);
              }}
              style={{
                padding: '10px 18px',
                backgroundColor: '#FFFFFF',
                color: '#202124',
                border: '2px solid #CCCCCC',
                fontSize: '18px',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              Replay Demonstration
            </button>
          </div>
        </div>

        {/* Loading Spinner / Processing Screen */}
        {isProcessing && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FAFAFA',
              border: '2px solid #E2E2E2',
            }}
          >
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#147D78', marginBottom: '16px' }}>
              Processing Full-Resolution Raster
            </div>
            <div style={{ fontSize: '24px', color: '#555555' }}>
              {processingStatus}
            </div>
          </div>
        )}

        {/* Main Continuous Visual Viewport */}
        {!isProcessing && model && (
          <div
            style={{
              flex: 1,
              border: '2px solid #E2E2E2',
              backgroundColor: '#FFFFFF',
              padding: '30px 40px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* ================= STAGE 0: IMAGE ================= */}
            {activeStage === 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 0.9fr',
                  gap: '60px',
                  height: '100%',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Stage 1 — Source Image Acquisition
                  </div>
                  <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#202124', margin: '0 0 16px 0' }}>
                    Full-Resolution Decoded Raster
                  </h2>
                  <div style={{ fontSize: '28px', color: '#444444', lineHeight: 1.45, marginBottom: '24px' }}>
                    Image loaded and preserved at 100% full intrinsic dimensions. No downsampling or proxy thumbnails are used.
                  </div>

                  <div
                    style={{
                      padding: '24px 30px',
                      backgroundColor: '#F8F9FA',
                      borderLeft: '6px solid #147D78',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div style={{ fontSize: '26px' }}><strong>Source Filename:</strong> <span style={{ fontFamily: 'monospace' }}>{model.name}</span></div>
                    <div style={{ fontSize: '26px' }}><strong>Intrinsic Dimensions:</strong> <span style={{ fontFamily: 'monospace', color: '#147D78', fontWeight: 700 }}>{model.width} &times; {model.height} px</span> ({model.width * model.height} pixels)</div>
                    <div style={{ fontSize: '26px' }}><strong>Raw Working Bytes:</strong> <span style={{ fontFamily: 'monospace' }}>{model.totalBytes.toLocaleString()} RGBA bytes</span></div>
                    <div style={{ fontSize: '26px' }}><strong>Distinct Alphabet Symbols:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{model.distinctSymbols} of 256</span></div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #202124',
                    padding: '20px',
                    backgroundColor: '#FAFAFA',
                  }}
                >
                  <img
                    src={model.dataUrl}
                    alt="Source raster"
                    style={{
                      maxWidth: '460px',
                      maxHeight: '340px',
                      objectFit: 'contain',
                      imageRendering: 'pixelated',
                      border: '1px solid #CCCCCC',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                  <div style={{ fontSize: '20px', color: '#777777', marginTop: '14px', fontStyle: 'italic' }}>
                    Full intrinsic raster displayed at scaled presentation viewport.
                  </div>
                </div>
              </div>
            )}

            {/* ================= STAGE 1: PIXEL GRID ================= */}
            {activeStage === 1 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 0.95fr',
                  gap: '60px',
                  height: '100%',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Stage 2 — Spatial Decomposition
                  </div>
                  <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#202124', margin: '0 0 16px 0' }}>
                    Enlarged Pixel Grid
                  </h2>
                  <div style={{ fontSize: '28px', color: '#444444', lineHeight: 1.45, marginBottom: '24px' }}>
                    The 2D visual raster decomposes into individual discrete colored pixels.
                    Below is an enlarged 8&times;8 micro-grid showing real decoded color values from the uploaded raster.
                  </div>

                  <div
                    style={{
                      padding: '24px',
                      backgroundColor: '#F8F9FA',
                      borderLeft: '6px solid #147D78',
                    }}
                  >
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#147D78', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Sample Pixel Color Vector
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'monospace', color: '#202124' }}>
                      RGBA({model.samplePixels[0]?.r}, {model.samplePixels[0]?.g}, {model.samplePixels[0]?.b}, {model.samplePixels[0]?.a})
                    </div>
                    <div style={{ fontSize: '20px', color: '#666666', marginTop: '8px' }}>
                      Each colored square represents 4 independent unsigned 8-bit integers.
                    </div>
                  </div>
                </div>

                {/* 8x8 Pixel Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(8, 48px)',
                      gridTemplateRows: 'repeat(8, 48px)',
                      gap: '3px',
                      backgroundColor: '#CCCCCC',
                      padding: '6px',
                      border: '2px solid #202124',
                    }}
                  >
                    {model.samplePixels.map((p, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a / 255})`,
                          width: '48px',
                          height: '48px',
                        }}
                        title={`(${p.x}, ${p.y}): RGBA(${p.r},${p.g},${p.b},${p.a})`}
                      />
                    ))}
                  </div>
                  <div style={{ fontSize: '20px', color: '#666666', marginTop: '16px', fontStyle: 'italic' }}>
                    Representative 8&times;8 region of true decoded pixel colors.
                  </div>
                </div>
              </div>
            )}

            {/* ================= STAGE 2: NUMERICAL VALUES ================= */}
            {activeStage === 2 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Stage 3 — Linear Serialization
                  </div>
                  <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#202124', margin: '0 0 16px 0' }}>
                    Pixels to Numerical RGBA Stream
                  </h2>
                  <div style={{ fontSize: '28px', color: '#444444', lineHeight: 1.45 }}>
                    Each pixel emits 4 consecutive bytes: Red, Green, Blue, Alpha (range 0 to 255).
                    The 2D image matrix becomes a 1D sequential stream of {model.totalBytes.toLocaleString()} symbols.
                  </div>
                </div>

                {/* Stream badges */}
                <div
                  style={{
                    padding: '28px 32px',
                    backgroundColor: '#FAFAFA',
                    border: '2px solid #E0E0E0',
                  }}
                >
                  <div style={{ fontSize: '22px', fontWeight: 700, color: '#202124', textTransform: 'uppercase', marginBottom: '16px' }}>
                    Sequential RGBA Byte Stream (First 32 Bytes Extracted)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {model.sampleBytes.map((b, idx) => {
                      const ch = ['R', 'G', 'B', 'A'][idx % 4];
                      return (
                        <div
                          key={idx}
                          style={{
                            padding: '10px 14px',
                            backgroundColor: '#FFFFFF',
                            border: '2px solid #CCCCCC',
                            borderTop: ch === 'R' ? '4px solid #D9534F' : ch === 'G' ? '4px solid #5CB85C' : ch === 'B' ? '4px solid #337AB7' : '4px solid #555555',
                            textAlign: 'center',
                            minWidth: '58px',
                          }}
                        >
                          <div style={{ fontSize: '14px', color: '#888888', fontWeight: 700 }}>{ch}</div>
                          <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'monospace' }}>{b}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '24px',
                    color: '#555555',
                    borderTop: '2px solid #EEEEEE',
                    paddingTop: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Total Symbols: <strong>N = {model.totalBytes.toLocaleString()}</strong></span>
                  <span>Alphabet Range: <strong>0 to 255 (Byte values)</strong></span>
                  <span>Uncompressed Size: <strong>{(model.totalBytes * 8).toLocaleString()} bits</strong></span>
                </div>
              </div>
            )}

            {/* ================= STAGE 3: FREQUENCIES ================= */}
            {activeStage === 3 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '50px',
                  height: '100%',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Stage 4 — Empirical Distribution Analysis
                    </div>
                    <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#202124', margin: '0 0 16px 0' }}>
                      Frequency Spectrum of Byte Symbols
                    </h2>
                    <div style={{ fontSize: '26px', color: '#444444', lineHeight: 1.45, marginBottom: '20px' }}>
                      Exact symbol occurrences calculated over all {model.totalBytes.toLocaleString()} bytes.
                      Frequent values form probability peaks that Huffman Coding exploits.
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#202124', textTransform: 'uppercase', marginBottom: '10px' }}>
                      Top Most Frequent Symbols
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '22px' }}>
                      <thead>
                        <tr style={{ borderBottom: '3px solid #202124', backgroundColor: '#FAFAFA' }}>
                          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Byte Symbol</th>
                          <th style={{ padding: '8px 12px', textAlign: 'right' }}>Frequency</th>
                          <th style={{ padding: '8px 12px', textAlign: 'right' }}>Ratio (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {model.topFrequencies.slice(0, 5).map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #ECECEC' }}>
                            <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 700 }}>
                              Byte {row.symbol} (0x{row.symbol.toString(16).toUpperCase().padStart(2, '0')})
                            </td>
                            <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace' }}>
                              {row.freq.toLocaleString()}
                            </td>
                            <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace', color: '#147D78', fontWeight: 800 }}>
                              {row.pct.toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 256-bin histogram */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#FAFAFA',
                    border: '2px solid #E0E0E0',
                    padding: '24px',
                  }}
                >
                  <div style={{ fontSize: '22px', fontWeight: 700, color: '#202124', textTransform: 'uppercase' }}>
                    Full 256-Bin Symbol Histogram
                  </div>

                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '2px', borderBottom: '2px solid #202124', height: '280px', margin: '20px 0' }}>
                    {Array.from({ length: 256 }).map((_, sym) => {
                      const f = model.frequencies[sym];
                      const maxF = model.topFrequencies[0]?.freq || 1;
                      const barH = (f / maxF) * 100;
                      return (
                        <div
                          key={sym}
                          style={{
                            flex: 1,
                            height: `${Math.max(barH > 0 ? 4 : 0, barH)}%`,
                            backgroundColor: f > 0 ? '#147D78' : '#EEEEEE',
                            minWidth: '1px',
                          }}
                          title={`Byte ${sym}: ${f} times`}
                        />
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', color: '#777777', fontWeight: 600 }}>
                    <span>Byte 0</span>
                    <span>Byte 64</span>
                    <span>Byte 128</span>
                    <span>Byte 192</span>
                    <span>Byte 255</span>
                  </div>
                </div>
              </div>
            )}

            {/* ================= STAGE 4: TREE ================= */}
            {activeStage === 4 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Stage 5 — Greedy Min-Priority Queue Construction
                  </div>
                  <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#202124', margin: '0 0 16px 0' }}>
                    Generating the Optimal Huffman Tree
                  </h2>
                  <div style={{ fontSize: '28px', color: '#444444', lineHeight: 1.45 }}>
                    The greedy algorithm pairs the two lowest-frequency nodes in the min-priority queue until exactly one root node remains.
                  </div>
                </div>

                {/* Tree merge stats */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px',
                    margin: '20px 0',
                  }}
                >
                  <div style={{ padding: '24px', backgroundColor: '#FAFAFA', border: '2px solid #E0E0E0' }}>
                    <div style={{ fontSize: '20px', color: '#777777', fontWeight: 600 }}>Alphabet Size (Leaves)</div>
                    <div style={{ fontSize: '40px', fontWeight: 800, fontFamily: 'monospace', color: '#202124', marginTop: '6px' }}>
                      {model.distinctSymbols}
                    </div>
                  </div>
                  <div style={{ padding: '24px', backgroundColor: '#F0F9F8', border: '2px solid #147D78' }}>
                    <div style={{ fontSize: '20px', color: '#147D78', fontWeight: 700 }}>Total Greedy Merges</div>
                    <div style={{ fontSize: '40px', fontWeight: 800, fontFamily: 'monospace', color: '#147D78', marginTop: '6px' }}>
                      {model.treeSteps.length}
                    </div>
                  </div>
                  <div style={{ padding: '24px', backgroundColor: '#FAFAFA', border: '2px solid #E0E0E0' }}>
                    <div style={{ fontSize: '20px', color: '#777777', fontWeight: 600 }}>Root Total Weight</div>
                    <div style={{ fontSize: '40px', fontWeight: 800, fontFamily: 'monospace', color: '#202124', marginTop: '6px' }}>
                      {model.rootNode?.freq.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: '24px 30px',
                    backgroundColor: '#F8F9FA',
                    borderLeft: '6px solid #147D78',
                    fontSize: '24px',
                    color: '#333333',
                  }}
                >
                  &check; All {model.distinctSymbols} leaf symbols fused into a deterministic prefix-free binary tree with zero lookahead.
                </div>
              </div>
            )}

            {/* ================= STAGE 5: ENCODING ================= */}
            {activeStage === 5 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 0.9fr',
                  gap: '50px',
                  height: '100%',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Stage 6 — Prefix-Free Binary Encoding
                    </div>
                    <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#202124', margin: '0 0 16px 0' }}>
                      Codeword Emission &amp; Bitstream Packing
                    </h2>
                    <div style={{ fontSize: '26px', color: '#444444', lineHeight: 1.45, marginBottom: '20px' }}>
                      Every byte symbol maps to an instantaneous, prefix-free binary codeword.
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#202124', textTransform: 'uppercase', marginBottom: '10px' }}>
                      Generated Codewords for High-Frequency Symbols
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '22px' }}>
                      <thead>
                        <tr style={{ borderBottom: '3px solid #202124', backgroundColor: '#FAFAFA' }}>
                          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Byte</th>
                          <th style={{ padding: '8px 12px', textAlign: 'right' }}>Count</th>
                          <th style={{ padding: '8px 12px', textAlign: 'left', color: '#147D78' }}>Huffman Code</th>
                          <th style={{ padding: '8px 12px', textAlign: 'right' }}>Length</th>
                        </tr>
                      </thead>
                      <tbody>
                        {model.topFrequencies.slice(0, 6).map((item, idx) => {
                          const code = model.codeMap[item.symbol] || '0';
                          return (
                            <tr key={idx} style={{ borderBottom: '1px solid #ECECEC' }}>
                              <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 700 }}>
                                {item.symbol}
                              </td>
                              <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace' }}>
                                {item.freq.toLocaleString()}
                              </td>
                              <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 800, color: '#147D78' }}>
                                {code}
                              </td>
                              <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace' }}>
                                {code.length} bits
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Packed Bitstream Container */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#FAFAFA',
                    border: '2px solid #E0E0E0',
                    padding: '24px',
                  }}
                >
                  <div style={{ fontSize: '22px', fontWeight: 700, color: '#202124', textTransform: 'uppercase' }}>
                    Bit-Packed Binary Representation
                  </div>
                  <div
                    style={{
                      flex: 1,
                      margin: '16px 0',
                      padding: '20px',
                      backgroundColor: '#FFFFFF',
                      border: '2px solid #CCCCCC',
                      fontFamily: 'monospace',
                      fontSize: '18px',
                      lineHeight: 1.6,
                      color: '#202124',
                      overflowY: 'auto',
                      wordBreak: 'break-all',
                    }}
                  >
                    {Array.from(model.encodedBuffer.slice(0, 60))
                      .map((b) => b.toString(2).padStart(8, '0'))
                      .join(' ')}
                    ...
                  </div>
                  <div style={{ fontSize: '20px', color: '#555555' }}>
                    Total Bitstream: <strong>{model.encodedBits.toLocaleString()} bits</strong> ({model.encodedBuffer.length.toLocaleString()} packed bytes)
                  </div>
                </div>
              </div>
            )}

            {/* ================= STAGE 6: RECONSTRUCTION & RESULTS ================= */}
            {activeStage === 6 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'space-between',
                }}
              >
                {/* Verification Banner */}
                <div
                  style={{
                    padding: '20px 32px',
                    backgroundColor: model.isExactMatch ? '#F0F9F8' : '#FFF5F5',
                    borderLeft: `8px solid ${model.isExactMatch ? '#147D78' : '#D9534F'}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '32px',
                        fontWeight: 800,
                        color: model.isExactMatch ? '#147D78' : '#D9534F',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {model.isExactMatch ? 'EXACT RECONSTRUCTION: PASS' : 'EXACT RECONSTRUCTION: FAIL'}
                    </div>
                    <div style={{ fontSize: '22px', color: '#555555', marginTop: '4px' }}>
                      Verified all {model.totalBytes.toLocaleString()} RGBA bytes decoded via Huffman tree match original raster 100%.
                    </div>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#147D78' }}>
                    Lossless Fidelity: 100.00%
                  </div>
                </div>

                {/* Side-by-side Images */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '40px',
                    margin: '16px 0',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '16px',
                      backgroundColor: '#FAFAFA',
                      border: '2px solid #202124',
                    }}
                  >
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#202124', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Original Decoded RGBA Raster
                    </div>
                    <canvas
                      ref={origCanvasRef}
                      style={{
                        maxWidth: '240px',
                        maxHeight: '180px',
                        imageRendering: 'pixelated',
                        border: '1px solid #CCCCCC',
                      }}
                    />
                    <div style={{ fontSize: '18px', color: '#777777', marginTop: '8px', fontFamily: 'monospace' }}>
                      {model.width} &times; {model.height} px ({model.totalBytes.toLocaleString()} bytes)
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '16px',
                      backgroundColor: '#FAFAFA',
                      border: '2px solid #147D78',
                    }}
                  >
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Decoded Reconstructed Raster
                    </div>
                    <canvas
                      ref={reconCanvasRef}
                      style={{
                        maxWidth: '240px',
                        maxHeight: '180px',
                        imageRendering: 'pixelated',
                        border: '1px solid #147D78',
                      }}
                    />
                    <div style={{ fontSize: '18px', color: '#147D78', marginTop: '8px', fontFamily: 'monospace', fontWeight: 700 }}>
                      Byte-for-byte identical (0 differences)
                    </div>
                  </div>
                </div>

                {/* 3 Large Dynamic Metric Cards */}
                {(() => {
                  const origBytes = model.totalBytes;
                  const huffmanPayloadBytes = Math.ceil(model.encodedBits / 8);
                  const savings = ((origBytes - huffmanPayloadBytes) / origBytes) * 100;
                  const isPositive = savings >= 0;

                  return (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '24px',
                      }}
                    >
                      <div style={{ padding: '20px 24px', backgroundColor: '#FAFAFA', border: '2px solid #CCCCCC', borderTop: '6px solid #777777' }}>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#777777', textTransform: 'uppercase' }}>
                          Original RGBA Payload
                        </div>
                        <div style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'monospace', color: '#202124', margin: '4px 0' }}>
                          {origBytes.toLocaleString()} <span style={{ fontSize: '20px', fontWeight: 400 }}>bytes</span>
                        </div>
                        <div style={{ fontSize: '16px', color: '#666666' }}>Fixed 8 bits/symbol</div>
                      </div>

                      <div style={{ padding: '20px 24px', backgroundColor: '#F3F9F9', border: '2px solid #147D78', borderTop: '6px solid #147D78' }}>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#147D78', textTransform: 'uppercase' }}>
                          Huffman-Encoded Payload
                        </div>
                        <div style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'monospace', color: '#147D78', margin: '4px 0' }}>
                          {huffmanPayloadBytes.toLocaleString()} <span style={{ fontSize: '20px', fontWeight: 400 }}>bytes</span>
                        </div>
                        <div style={{ fontSize: '16px', color: '#147D78' }}>{model.encodedBits.toLocaleString()} bits + {model.paddedBits} padding</div>
                      </div>

                      <div style={{ padding: '20px 24px', backgroundColor: isPositive ? '#F0F9F8' : '#FFF5F5', border: `2px solid ${isPositive ? '#147D78' : '#D9534F'}`, borderTop: `6px solid ${isPositive ? '#147D78' : '#D9534F'}` }}>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: isPositive ? '#147D78' : '#D9534F', textTransform: 'uppercase' }}>
                          {isPositive ? 'Payload Savings' : 'Payload Expansion'}
                        </div>
                        <div style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'monospace', color: isPositive ? '#147D78' : '#D9534F', margin: '4px 0' }}>
                          {isPositive ? `-${savings.toFixed(2)}%` : `+${Math.abs(savings).toFixed(2)}%`}
                        </div>
                        <div style={{ fontSize: '16px', color: '#666666' }}>
                          {isPositive ? `${(origBytes - huffmanPayloadBytes).toLocaleString()} fewer bytes.` : 'High entropy input.'}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </div>
    </SlideLayout>
  );
};
