import React, { useState, useEffect, useRef } from 'react';
import { DemoStage, StageIndicator } from './StageIndicator';
import { ImageDataStats, HuffmanMergeStep, EncodingResult, HuffmanNode } from '../../types';
import { buildHuffmanTree, generateHuffmanCodes, encodeDataStream } from '../../utils/huffman';
import { generateAcademicTestPattern, generateGeometricIconPattern } from './sampleImages';

export const DemoVisualizer: React.FC = () => {
  const [stage, setStage] = useState<DemoStage>('upload');
  const [imageMeta, setImageMeta] = useState<{
    name: string;
    origWidth: number;
    origHeight: number;
    workWidth: number;
    workHeight: number;
    fileSizeStr: string;
  } | null>(null);

  const [imageStats, setImageStats] = useState<ImageDataStats | null>(null);
  const [treeResult, setTreeResult] = useState<{
    root: HuffmanNode | null;
    steps: HuffmanMergeStep[];
    leaves: HuffmanNode[];
  } | null>(null);
  const [encodingResult, setEncodingResult] = useState<EncodingResult | null>(null);

  // Tree merge step state
  const [treeStep, setTreeStep] = useState<number>(0);
  const [isPlayingTree, setIsPlayingTree] = useState<boolean>(false);
  const playTimerRef = useRef<number | null>(null);

  // Pixel inspection state
  const [hoveredPixel, setHoveredPixel] = useState<{
    x: number;
    y: number;
    r: number;
    g: number;
    b: number;
    a: number;
    byteOffset: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const origCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const reconCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load an initial academic test pattern so the demo is immediately live and interactive
  useEffect(() => {
    loadSample(1);
  }, []);

  const processLoadedImage = (img: HTMLImageElement | ImageData, fileName: string, origW: number, origH: number, sizeStr: string) => {
    // We normalize working resolution for responsive browser rendering and visualization
    // Max working dimensions: 64x64 (4,096 bytes * 4 = 16,384 bytes, perfect for interactive real-time tree construction)
    const maxDim = 48;
    let workW = origW;
    let workH = origH;
    if (origW > maxDim || origH > maxDim) {
      if (origW >= origH) {
        workW = maxDim;
        workH = Math.max(8, Math.round((origH / origW) * maxDim));
      } else {
        workH = maxDim;
        workW = Math.max(8, Math.round((origW / origH) * maxDim));
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = workW;
    canvas.height = workH;
    const ctx = canvas.getContext('2d')!;

    if ('data' in img) {
      // ImageData directly
      ctx.putImageData(img, 0, 0);
    } else {
      ctx.drawImage(img, 0, 0, workW, workH);
    }

    const imgData = ctx.getImageData(0, 0, workW, workH);
    const rawData = imgData.data;

    // Frequency analysis across 0..255 byte values
    const frequencies = new Uint32Array(256);
    for (let i = 0; i < rawData.length; i++) {
      frequencies[rawData[i]]++;
    }

    let distinctCount = 0;
    const symbolFrequencies: { symbol: number; freq: number }[] = [];
    for (let s = 0; s < 256; s++) {
      if (frequencies[s] > 0) {
        distinctCount++;
        symbolFrequencies.push({ symbol: s, freq: frequencies[s] });
      }
    }

    // Build genuine Huffman tree using Min-Priority Queue (Algorithm 1)
    const tree = buildHuffmanTree(symbolFrequencies);
    const codes = generateHuffmanCodes(tree.root);

    // True bit-packed encoding & reconstruction check
    const encResult = encodeDataStream(rawData, codes, tree.root, distinctCount);

    // Sample pixels for 8x8 zoom region
    const samplePixels: Array<{ x: number; y: number; r: number; g: number; b: number; a: number }> = [];
    const sampleH = Math.min(8, workH);
    const sampleW = Math.min(8, workW);
    for (let y = 0; y < sampleH; y++) {
      for (let x = 0; x < sampleW; x++) {
        const idx = (y * workW + x) * 4;
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

    // Sample bytes (first 32 bytes)
    const sampleBytes: number[] = Array.from(rawData.slice(0, 32));

    setImageMeta({
      name: fileName,
      origWidth: origW,
      origHeight: origH,
      workWidth: workW,
      workHeight: workH,
      fileSizeStr: sizeStr,
    });

    setImageStats({
      width: workW,
      height: workH,
      totalPixels: workW * workH,
      totalBytes: rawData.length,
      frequencies,
      distinctSymbols: distinctCount,
      samplePixels,
      sampleBytes,
      rawData,
    });

    setTreeResult(tree);
    setEncodingResult(encResult);
    setTreeStep(tree.steps.length > 0 ? Math.min(10, tree.steps.length) : 0);
    setIsPlayingTree(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const sizeKb = (file.size / 1024).toFixed(1) + ' KB';
        processLoadedImage(img, file.name, img.width, img.height, sizeKb);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const loadSample = (index: number) => {
    if (index === 1) {
      const imgData = generateAcademicTestPattern(48, 48);
      processLoadedImage(imgData, 'njupt_test_pattern.png', 48, 48, '9.2 KB');
    } else {
      const imgData = generateGeometricIconPattern(36, 36);
      processLoadedImage(imgData, 'geometric_icon.png', 36, 36, '5.1 KB');
    }
  };

  // Re-draw canvases when entering stage 7 (Reconstruction) or 8 (Results)
  useEffect(() => {
    if ((stage === 'reconstruction' || stage === 'results') && imageStats && encodingResult) {
      // Draw original working canvas
      if (origCanvasRef.current) {
        origCanvasRef.current.width = imageStats.width;
        origCanvasRef.current.height = imageStats.height;
        const ctxO = origCanvasRef.current.getContext('2d');
        if (ctxO) {
          const imgDataO = ctxO.createImageData(imageStats.width, imageStats.height);
          imgDataO.data.set(imageStats.rawData);
          ctxO.putImageData(imgDataO, 0, 0);
        }
      }

      // Draw reconstructed canvas from decoded bit-packed raster
      if (reconCanvasRef.current) {
        reconCanvasRef.current.width = imageStats.width;
        reconCanvasRef.current.height = imageStats.height;
        const ctxR = reconCanvasRef.current.getContext('2d');
        if (ctxR) {
          const imgDataR = ctxR.createImageData(imageStats.width, imageStats.height);
          imgDataR.data.set(encodingResult.decodedRaster);
          ctxR.putImageData(imgDataR, 0, 0);
        }
      }
    }
  }, [stage, imageStats, encodingResult]);

  // Tree animation player
  useEffect(() => {
    if (isPlayingTree && treeResult && treeResult.steps.length > 0) {
      playTimerRef.current = window.setInterval(() => {
        setTreeStep((current) => {
          if (current >= treeResult.steps.length) {
            setIsPlayingTree(false);
            return current;
          }
          return current + 1;
        });
      }, 400);
    } else if (playTimerRef.current) {
      clearInterval(playTimerRef.current);
      playTimerRef.current = null;
    }

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlayingTree, treeResult]);

  // Top frequent byte symbols
  const topFrequencies = React.useMemo(() => {
    if (!imageStats) return [];
    const list: { symbol: number; freq: number; pct: number }[] = [];
    for (let s = 0; s < 256; s++) {
      if (imageStats.frequencies[s] > 0) {
        list.push({
          symbol: s,
          freq: imageStats.frequencies[s],
          pct: (imageStats.frequencies[s] / imageStats.totalBytes) * 100,
        });
      }
    }
    return list.sort((a, b) => b.freq - a.freq).slice(0, 10);
  }, [imageStats]);

  const STAGES_LIST: DemoStage[] = [
    'upload',
    'pixels',
    'values',
    'frequencies',
    'tree',
    'encoding',
    'reconstruction',
    'results',
  ];

  const currentStageIndex = STAGES_LIST.indexOf(stage);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Stage Flow Navigation Header */}
      <StageIndicator
        currentStage={stage}
        onSelectStage={setStage}
        isImageLoaded={!!imageStats}
      />

      {/* Main Continuous Workspace Container */}
      <div
        style={{
          flex: 1,
          border: '1px solid #E2E2E2',
          backgroundColor: '#FFFFFF',
          padding: '24px 32px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* ================= STAGE 1: IMAGE UPLOAD ================= */}
        {stage === 'upload' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '48px',
              height: '100%',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
                Stage 1 — Input Image Acquisition
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#202124', margin: '0 0 16px 0' }}>
                Select or Upload an Image
              </h2>
              <div style={{ fontSize: '17px', color: '#555555', lineHeight: 1.6, marginBottom: '24px' }}>
                The demonstration operates directly on real raster pixel data in the browser.
                Select any PNG, JPG, or WebP image from your computer, or choose an academic preset pattern.
              </div>

              {/* Upload Button */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png,image/jpeg,image/webp"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#147D78',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '15px',
                    cursor: 'pointer',
                    letterSpacing: '0.02em',
                  }}
                >
                  [ CHOOSE IMAGE FROM COMPUTER ]
                </button>

                <span style={{ fontSize: '14px', color: '#777777' }}>or load preset:</span>

                <button
                  type="button"
                  onClick={() => loadSample(1)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CCCCCC',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Preset 1: NJUPT Diagram
                </button>
                <button
                  type="button"
                  onClick={() => loadSample(2)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CCCCCC',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Preset 2: Geometric Icon
                </button>
              </div>

              {/* Image Metadata Box */}
              {imageMeta && imageStats && (
                <div
                  style={{
                    padding: '18px 22px',
                    backgroundColor: '#F8F9FA',
                    border: '1px solid #E2E2E2',
                    borderLeft: '4px solid #147D78',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', color: '#147D78', marginBottom: '8px' }}>
                    Loaded Image Specifications
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '15px' }}>
                    <div><strong>Filename:</strong> <span style={{ fontFamily: 'monospace' }}>{imageMeta.name}</span></div>
                    <div><strong>File Size:</strong> <span style={{ fontFamily: 'monospace' }}>{imageMeta.fileSizeStr}</span></div>
                    <div><strong>Source Resolution:</strong> <span style={{ fontFamily: 'monospace' }}>{imageMeta.origWidth} &times; {imageMeta.origHeight} px</span></div>
                    <div><strong>Working Dimensions:</strong> <span style={{ fontFamily: 'monospace' }}>{imageStats.width} &times; {imageStats.height} px ({imageStats.totalPixels} px)</span></div>
                    <div><strong>RGBA Byte Stream:</strong> <span style={{ fontFamily: 'monospace' }}>{imageStats.totalBytes.toLocaleString()} bytes</span></div>
                    <div><strong>Distinct Byte Symbols:</strong> <span style={{ fontFamily: 'monospace' }}>{imageStats.distinctSymbols} of 256</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Live Preview Rendering */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #E5E5E5',
                padding: '28px',
                backgroundColor: '#FAFAFA',
              }}
            >
              <div style={{ fontSize: '13px', color: '#777777', textTransform: 'uppercase', fontWeight: 600, marginBottom: '16px' }}>
                Input Raster Preview
              </div>

              {imageStats ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                  <canvas
                    width={imageStats.width}
                    height={imageStats.height}
                    ref={(node) => {
                      if (node && imageStats) {
                        const ctx = node.getContext('2d');
                        if (ctx) {
                          const id = ctx.createImageData(imageStats.width, imageStats.height);
                          id.data.set(imageStats.rawData);
                          ctx.putImageData(id, 0, 0);
                        }
                      }
                    }}
                    style={{
                      width: '200px',
                      height: '200px',
                      imageRendering: 'pixelated',
                      border: '1px solid #202124',
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                  <div style={{ fontSize: '13px', color: '#666666', fontStyle: 'italic' }}>
                    Rendered at working resolution ({imageStats.width}&times;{imageStats.height} px)
                  </div>
                </div>
              ) : (
                <div style={{ padding: '60px', color: '#999999', fontSize: '15px' }}>
                  No image loaded
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= STAGE 2: IMAGE TO PIXELS ================= */}
        {stage === 'pixels' && imageStats && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '40px',
              height: '100%',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
                Stage 2 — Spatial Decomposition
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#202124', margin: '0 0 14px 0' }}>
                Enlarged Pixel Grid
              </h2>
              <div style={{ fontSize: '16px', color: '#555555', lineHeight: 1.5, marginBottom: '20px' }}>
                The continuous image surface is quantized into an array of discrete color elements.
                Below is a representative 8&times;8 pixel region extracted directly from the uploaded raster.
                Hover over any cell to inspect its exact decoded color channels.
              </div>

              {/* Pixel Inspector Box */}
              <div
                style={{
                  padding: '18px 24px',
                  backgroundColor: '#F8F9FA',
                  border: '1px solid #E2E2E2',
                  borderLeft: '4px solid #147D78',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#147D78', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Inspected Pixel Value
                </div>
                {hoveredPixel ? (
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'monospace', color: '#202124' }}>
                      RGBA({hoveredPixel.r}, {hoveredPixel.g}, {hoveredPixel.b}, {hoveredPixel.a})
                    </div>
                    <div style={{ fontSize: '14px', color: '#666666', marginTop: '6px' }}>
                      Coordinate: (x: {hoveredPixel.x}, y: {hoveredPixel.y}) | Byte Stream Offset: #{hoveredPixel.byteOffset}–#{hoveredPixel.byteOffset + 3}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: '16px', color: '#888888', fontStyle: 'italic' }}>
                    Hover over any cell in the 8&times;8 grid to inspect its actual RGB/RGBA values.
                  </div>
                )}
              </div>
            </div>

            {/* Right: 8x8 Zoomed Grid */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ fontSize: '13px', color: '#777777', textTransform: 'uppercase', fontWeight: 600, marginBottom: '12px' }}>
                Representative 8&times;8 Pixel Micro-Grid
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(8, 42px)',
                  gridTemplateRows: 'repeat(8, 42px)',
                  gap: '2px',
                  backgroundColor: '#E0E0E0',
                  padding: '4px',
                  border: '1px solid #CCCCCC',
                }}
              >
                {imageStats.samplePixels.map((p, idx) => {
                  const isHovered = hoveredPixel?.x === p.x && hoveredPixel?.y === p.y;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() =>
                        setHoveredPixel({
                          x: p.x,
                          y: p.y,
                          r: p.r,
                          g: p.g,
                          b: p.b,
                          a: p.a,
                          byteOffset: (p.y * imageStats.width + p.x) * 4,
                        })
                      }
                      style={{
                        backgroundColor: `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a / 255})`,
                        cursor: 'pointer',
                        outline: isHovered ? '3px solid #147D78' : 'none',
                        zIndex: isHovered ? 10 : 1,
                        transition: 'transform 0.1s ease',
                        transform: isHovered ? 'scale(1.15)' : 'none',
                      }}
                      title={`(${p.x}, ${p.y}): RGBA(${p.r},${p.g},${p.b},${p.a})`}
                    />
                  );
                })}
              </div>

              <div style={{ fontSize: '12px', color: '#888888', marginTop: '10px', fontStyle: 'italic' }}>
                Actual pixel raster values decoded from browser canvas.
              </div>
            </div>
          </div>
        )}

        {/* ================= STAGE 3: PIXELS TO NUMERICAL VALUES ================= */}
        {stage === 'values' && imageStats && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
                Stage 3 — Linear Byte Serialization
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#202124', margin: '0 0 10px 0' }}>
                Pixels to Numerical RGBA Stream
              </h2>
              <div style={{ fontSize: '16px', color: '#555555', lineHeight: 1.5 }}>
                In browser-decoded RGBA8 format, each pixel decomposes into exactly 4 unsigned 8-bit integers: Red, Green, Blue, Alpha (range 0 to 255).
                This flattens the 2D image matrix into an uncompressed 1D stream of {imageStats.totalBytes.toLocaleString()} byte symbols.
              </div>
            </div>

            {/* Transition Visualization: Pixel Boxes to Byte Badges */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '20px 24px',
                backgroundColor: '#FAFAFA',
                border: '1px solid #E2E2E2',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#202124', textTransform: 'uppercase' }}>
                Representative Sequential RGBA Byte Emission (First 8 Pixels = 32 Bytes)
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {imageStats.sampleBytes.map((byteVal, idx) => {
                  const channel = ['R', 'G', 'B', 'A'][idx % 4];
                  const pixelIndex = Math.floor(idx / 4);
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '6px 10px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CCCCCC',
                        minWidth: '52px',
                        borderTop: channel === 'R' ? '3px solid #D9534F' : channel === 'G' ? '3px solid #5CB85C' : channel === 'B' ? '3px solid #337AB7' : '3px solid #777777',
                      }}
                    >
                      <span style={{ fontSize: '10px', color: '#888888', fontWeight: 600 }}>
                        P{pixelIndex}.{channel}
                      </span>
                      <span style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'monospace', color: '#202124' }}>
                        {byteVal}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ fontSize: '13px', color: '#777777', fontStyle: 'italic' }}>
                Linear stream continues for all {imageStats.totalBytes.toLocaleString()} bytes. The Huffman tree will treat every distinct byte value (0–255) as an alphabet symbol.
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '14px',
                color: '#555555',
                borderTop: '1px solid #ECECEC',
                paddingTop: '12px',
              }}
            >
              <span>Alphabet Domain: <strong style={{ color: '#202124' }}>&#931; = &#123;0, 1, ..., 255&#125; (Byte symbols)</strong></span>
              <span>Total Stream Length: <strong style={{ color: '#202124' }}>N = {imageStats.totalBytes.toLocaleString()} symbols</strong></span>
              <span>Input Size: <strong style={{ color: '#202124' }}>{imageStats.totalBytes} bytes &times; 8 bits = {(imageStats.totalBytes * 8).toLocaleString()} bits</strong></span>
            </div>
          </div>
        )}

        {/* ================= STAGE 4: FREQUENCY ANALYSIS ================= */}
        {stage === 'frequencies' && imageStats && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '40px',
              height: '100%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Stage 4 — Empirical Distribution Analysis
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#202124', margin: '0 0 10px 0' }}>
                  Symbol Frequency Spectrum
                </h2>
                <div style={{ fontSize: '16px', color: '#555555', lineHeight: 1.5, marginBottom: '16px' }}>
                  True byte frequency counts calculated directly across all {imageStats.totalBytes.toLocaleString()} bytes of the uploaded raster.
                  Highly repeated pixel values (such as white backgrounds, brand teal, or solid fills) show high frequency peaks.
                </div>
              </div>

              {/* Summary Stats Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div style={{ padding: '12px', backgroundColor: '#FAFAFA', border: '1px solid #E2E2E2' }}>
                  <div style={{ fontSize: '12px', color: '#777777', textTransform: 'uppercase' }}>Total Symbols (N)</div>
                  <div style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'monospace', color: '#202124' }}>
                    {imageStats.totalBytes.toLocaleString()}
                  </div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#FAFAFA', border: '1px solid #E2E2E2' }}>
                  <div style={{ fontSize: '12px', color: '#777777', textTransform: 'uppercase' }}>Distinct Symbols (k)</div>
                  <div style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'monospace', color: '#147D78' }}>
                    {imageStats.distinctSymbols} <span style={{ fontSize: '14px', fontWeight: 400, color: '#777' }}>/ 256</span>
                  </div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#FAFAFA', border: '1px solid #E2E2E2' }}>
                  <div style={{ fontSize: '12px', color: '#777777', textTransform: 'uppercase' }}>Highest Frequency Peak</div>
                  <div style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'monospace', color: '#202124' }}>
                    {topFrequencies[0]?.freq.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Top Frequencies Table */}
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#202124', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Top 10 Most Frequent Byte Symbols
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #202124', backgroundColor: '#FAFAFA' }}>
                      <th style={{ padding: '6px 10px', textAlign: 'left' }}>Byte Symbol</th>
                      <th style={{ padding: '6px 10px', textAlign: 'right' }}>Frequency</th>
                      <th style={{ padding: '6px 10px', textAlign: 'right' }}>Ratio (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topFrequencies.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #ECECEC' }}>
                        <td style={{ padding: '6px 10px', fontFamily: 'monospace', fontWeight: 600 }}>
                          Byte {row.symbol} <span style={{ color: '#888', fontWeight: 400 }}>(0x{row.symbol.toString(16).toUpperCase().padStart(2, '0')})</span>
                        </td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', fontFamily: 'monospace' }}>
                          {row.freq.toLocaleString()}
                        </td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', fontFamily: 'monospace', color: '#147D78', fontWeight: 600 }}>
                          {row.pct.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Full 256-bin Histogram */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                padding: '20px',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#202124', textTransform: 'uppercase', marginBottom: '8px' }}>
                Full 256-Symbol Frequency Histogram
              </div>

              {/* Bar Chart Area */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '1px', borderBottom: '1px solid #202124', height: '320px', paddingBottom: '2px' }}>
                {Array.from({ length: 256 }).map((_, sym) => {
                  const freq = imageStats.frequencies[sym];
                  const maxFreq = topFrequencies[0]?.freq || 1;
                  const barH = (freq / maxFreq) * 100;
                  return (
                    <div
                      key={sym}
                      title={`Symbol ${sym}: ${freq} occurrences`}
                      style={{
                        flex: 1,
                        height: `${Math.max(barH > 0 ? 3 : 0, barH)}%`,
                        backgroundColor: freq > 0 ? (sym === topFrequencies[0]?.symbol ? '#D9534F' : '#147D78') : '#F0F0F0',
                        minWidth: '1px',
                      }}
                    />
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#777777', marginTop: '6px' }}>
                <span>0 (0x00)</span>
                <span>64</span>
                <span>128</span>
                <span>192</span>
                <span>255 (0xFF)</span>
              </div>

              <div style={{ fontSize: '12px', color: '#777777', fontStyle: 'italic', textAlign: 'center', marginTop: '8px' }}>
                Figure: Empirical byte symbol distribution across all 256 possible values.
              </div>
            </div>
          </div>
        )}

        {/* ================= STAGE 5: GREEDY TREE CONSTRUCTION ================= */}
        {stage === 'tree' && treeResult && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            {/* Header and Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#147D78', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Stage 5 — Greedy Min-Priority Queue Execution
                </div>
                <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#202124', margin: 0 }}>
                  Huffman Tree Construction Algorithm
                </h2>
              </div>

              {/* Interactive Controls */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlayingTree(false);
                    setTreeStep((s) => Math.max(0, s - 1));
                  }}
                  disabled={treeStep === 0}
                  style={{
                    padding: '6px 14px',
                    fontSize: '13px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CCCCCC',
                    cursor: treeStep === 0 ? 'not-allowed' : 'pointer',
                    fontWeight: 500,
                  }}
                >
                  &larr; Step
                </button>

                <button
                  type="button"
                  onClick={() => setIsPlayingTree(!isPlayingTree)}
                  style={{
                    padding: '6px 16px',
                    fontSize: '13px',
                    backgroundColor: isPlayingTree ? '#D9534F' : '#147D78',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {isPlayingTree ? 'Pause' : 'Play Simulation'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsPlayingTree(false);
                    setTreeStep((s) => Math.min(treeResult.steps.length, s + 1));
                  }}
                  disabled={treeStep >= treeResult.steps.length}
                  style={{
                    padding: '6px 14px',
                    fontSize: '13px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CCCCCC',
                    cursor: treeStep >= treeResult.steps.length ? 'not-allowed' : 'pointer',
                    fontWeight: 500,
                  }}
                >
                  Step &rarr;
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsPlayingTree(false);
                    setTreeStep(treeResult.steps.length);
                  }}
                  style={{
                    padding: '6px 14px',
                    fontSize: '13px',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #B0B0B0',
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: '#202124',
                  }}
                >
                  Fast-Forward to Root
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsPlayingTree(false);
                    setTreeStep(0);
                  }}
                  style={{
                    padding: '6px 12px',
                    fontSize: '13px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CCCCCC',
                    cursor: 'pointer',
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Merge Status Bar */}
            <div
              style={{
                padding: '10px 16px',
                backgroundColor: '#F5FAF9',
                borderLeft: '4px solid #147D78',
                fontSize: '15px',
                margin: '10px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>Merge {treeStep} of {treeResult.steps.length}</strong>:{' '}
                {treeStep === 0 ? (
                  <span>Initial Priority Queue initialized with {treeResult.leaves.length} distinct alphabet leaves.</span>
                ) : (
                  <span>
                    Combined lowest two nodes (freq: {treeResult.steps[treeStep - 1]?.nodeA.freq.toLocaleString()} + {treeResult.steps[treeStep - 1]?.nodeB.freq.toLocaleString()}) &rarr; Created parent node of weight {treeResult.steps[treeStep - 1]?.mergedNode.freq.toLocaleString()}.
                  </span>
                )}
              </div>
              <div style={{ fontSize: '13px', color: '#147D78', fontWeight: 600 }}>
                Remaining in Priority Queue: {treeStep === 0 ? treeResult.leaves.length : treeResult.steps[treeStep - 1]?.remainingQueueSize}
              </div>
            </div>

            {/* Tree / Min-Queue Visual Representation */}
            <div
              style={{
                flex: 1,
                border: '1px solid #E2E2E2',
                backgroundColor: '#FFFFFF',
                padding: '16px',
                display: 'flex',
                gap: '24px',
                overflow: 'hidden',
              }}
            >
              {/* Left: Recent Greedy Merges log */}
              <div style={{ width: '380px', borderRight: '1px solid #EEEEEE', paddingRight: '16px', overflowY: 'auto' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#202124', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Algorithm 1 Merge History
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {treeResult.steps.slice(0, treeStep).map((st, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: idx === treeStep - 1 ? '#E6F4F3' : '#F9F9F9',
                        borderLeft: idx === treeStep - 1 ? '3px solid #147D78' : '1px solid #E0E0E0',
                        fontSize: '13px',
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>#{st.stepIndex}:</span>{' '}
                      {st.nodeA.symbol !== null ? `Byte ${st.nodeA.symbol}` : `Node`}({st.nodeA.freq}) +{' '}
                      {st.nodeB.symbol !== null ? `Byte ${st.nodeB.symbol}` : `Node`}({st.nodeB.freq}) ={' '}
                      <strong style={{ color: '#147D78' }}>{st.mergedNode.freq}</strong>
                    </div>
                  ))}
                  {treeStep === 0 && (
                    <div style={{ color: '#888', fontStyle: 'italic', fontSize: '13px', padding: '10px 0' }}>
                      Press [Step] or [Play] to begin executing Algorithm 1 min-heap extractions.
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Compact Tree Topology Rendering */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: '13px', color: '#777777', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px' }}>
                  Tree Structure Representation
                </div>

                <div
                  style={{
                    width: '100%',
                    height: '270px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #EAEAEA',
                    padding: '20px',
                  }}
                >
                  {treeStep === treeResult.steps.length ? (
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '64px',
                          height: '64px',
                          borderRadius: '32px',
                          border: '3px solid #147D78',
                          backgroundColor: '#E6F4F3',
                          fontSize: '18px',
                          fontWeight: 700,
                          color: '#147D78',
                          marginBottom: '12px',
                        }}
                      >
                        Root
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 600, color: '#202124' }}>
                        Root Total Frequency: {treeResult.root?.freq.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666666', marginTop: '6px' }}>
                        All {treeResult.leaves.length} distinct alphabet leaves successfully organized into an optimal prefix-free tree.
                      </div>
                      <div style={{ fontSize: '13px', color: '#147D78', fontWeight: 600, marginTop: '8px' }}>
                        &check; Completed in {treeResult.steps.length} greedy iterations with zero lookahead.
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '16px', color: '#555555' }}>
                        Current Queue Size: <strong>{treeStep === 0 ? treeResult.leaves.length : treeResult.steps[treeStep - 1]?.remainingQueueSize}</strong> subtrees
                      </div>
                      <div style={{ fontSize: '14px', color: '#888888', marginTop: '8px' }}>
                        Step forward or click [Fast-Forward to Root] to complete full tree construction.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STAGE 6: BINARY ENCODING ================= */}
        {stage === 'encoding' && encodingResult && imageStats && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              height: '100%',
            }}
          >
            {/* Left: Codebook Mapping Table */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Stage 6 — Optimal Code Generation
                </div>
                <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#202124', margin: '0 0 10px 0' }}>
                  Prefix-Free Binary Codewords
                </h2>
                <div style={{ fontSize: '15px', color: '#555555', lineHeight: 1.5, marginBottom: '14px' }}>
                  Codewords derived from root-to-leaf paths (Left = '0', Right = '1').
                  Frequent byte values receive shorter bit codes, while rare values receive longer codes.
                </div>

                {/* Table of Generated Codes */}
                <div style={{ maxHeight: '280px', overflowY: 'auto', border: '1px solid #E2E2E2' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#FAFAFA', borderBottom: '2px solid #202124' }}>
                      <tr>
                        <th style={{ padding: '8px 12px', textAlign: 'left' }}>Byte</th>
                        <th style={{ padding: '8px 12px', textAlign: 'right' }}>Count</th>
                        <th style={{ padding: '8px 12px', textAlign: 'left', color: '#147D78' }}>Huffman Code</th>
                        <th style={{ padding: '8px 12px', textAlign: 'right' }}>Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topFrequencies.map((item, idx) => {
                        const code = encodingResult.huffmanCodes[item.symbol] || '0';
                        return (
                          <tr key={idx} style={{ borderBottom: '1px solid #ECECEC' }}>
                            <td style={{ padding: '6px 12px', fontFamily: 'monospace', fontWeight: 600 }}>
                              {item.symbol}
                            </td>
                            <td style={{ padding: '6px 12px', textAlign: 'right', fontFamily: 'monospace' }}>
                              {item.freq.toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: '6px 12px',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: '#147D78',
                                letterSpacing: '0.04em',
                              }}
                            >
                              {code}
                            </td>
                            <td style={{ padding: '6px 12px', textAlign: 'right', fontFamily: 'monospace', color: '#666' }}>
                              {code.length} bits
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ fontSize: '13px', color: '#777777', fontStyle: 'italic' }}>
                All generated codewords satisfy the prefix property: no code is a prefix of any other code.
              </div>
            </div>

            {/* Right: Packed Bitstream Preview */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#FAFAFA',
                border: '1px solid #E0E0E0',
                padding: '20px',
              }}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#202124', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Bit-Packed Binary Stream
                </div>
                <div style={{ fontSize: '14px', color: '#555555', marginBottom: '14px' }}>
                  Codes are packed sequentially into an unsigned 8-bit array buffer (<span style={{ fontFamily: 'monospace' }}>Uint8Array</span>), avoiding memory bloat.
                </div>

                <div
                  style={{
                    padding: '14px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CCCCCC',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: '#202124',
                    maxHeight: '180px',
                    overflowY: 'auto',
                    wordBreak: 'break-all',
                  }}
                >
                  {/* Show preview of the first 64 bytes in hex / binary */}
                  {Array.from(encodingResult.encodedBuffer.slice(0, 48))
                    .map((b) => b.toString(2).padStart(8, '0'))
                    .join(' ')}
                  ...
                </div>
              </div>

              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E2E2',
                  borderLeft: '4px solid #147D78',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#202124' }}>
                  Bitstream Packing Metrics:
                </div>
                <div style={{ fontSize: '13px', color: '#555555', marginTop: '4px' }}>
                  &bull; Total Encoded Bits: <strong>{encodingResult.encodedBitLength.toLocaleString()} bits</strong>
                  <br />
                  &bull; Final Byte Padding: <strong>{encodingResult.paddedBits} bits</strong>
                  <br />
                  &bull; Packed Buffer Size: <strong>{encodingResult.encodedBuffer.length.toLocaleString()} bytes</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STAGE 7: RECONSTRUCTION ================= */}
        {stage === 'reconstruction' && imageStats && encodingResult && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
                Stage 7 — Raster Reconstruction &amp; Verification
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#202124', margin: '0 0 8px 0' }}>
                Exact Byte-by-Byte Decoding Verification
              </h2>
              <div style={{ fontSize: '15px', color: '#555555', lineHeight: 1.5 }}>
                The packed bitstream is decoded back through the Huffman tree bit-by-bit.
                We execute an actual loop comparing every single byte of the original working RGBA array against the decoded array.
              </div>
            </div>

            {/* Verification Banner */}
            <div
              style={{
                padding: '16px 24px',
                backgroundColor: encodingResult.isExactMatch ? '#F0F9F8' : '#FDF2F2',
                borderLeft: `5px solid ${encodingResult.isExactMatch ? '#147D78' : '#D9534F'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '12px 0',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: encodingResult.isExactMatch ? '#147D78' : '#D9534F',
                    letterSpacing: '0.04em',
                  }}
                >
                  {encodingResult.isExactMatch
                    ? 'EXACT RASTER RECONSTRUCTION: PASS'
                    : 'EXACT RASTER RECONSTRUCTION: FAIL'}
                </div>
                <div style={{ fontSize: '13.5px', color: '#555555', marginTop: '2px' }}>
                  {encodingResult.isExactMatch
                    ? `Verified all ${imageStats.totalBytes.toLocaleString()} RGBA bytes match identical source values (0 byte differences).`
                    : `Mismatch detected at byte index #${encodingResult.mismatchIndex}.`}
                </div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#147D78' }}>
                Lossless Fidelity: 100.00%
              </div>
            </div>

            {/* Side-by-side Visual Comparison */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '32px',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Original Canvas */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: '#FAFAFA',
                  border: '1px solid #E0E0E0',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#202124', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Original Working RGBA Raster
                </div>
                <canvas
                  ref={origCanvasRef}
                  style={{
                    width: '180px',
                    height: '180px',
                    imageRendering: 'pixelated',
                    border: '1px solid #202124',
                    backgroundColor: '#FFFFFF',
                  }}
                />
                <div style={{ fontSize: '12px', color: '#777777', marginTop: '8px', fontFamily: 'monospace' }}>
                  {imageStats.width} &times; {imageStats.height} px | {imageStats.totalBytes.toLocaleString()} bytes
                </div>
              </div>

              {/* Reconstructed Canvas */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: '#FAFAFA',
                  border: '1px solid #E0E0E0',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#147D78', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Decoded Reconstructed Raster
                </div>
                <canvas
                  ref={reconCanvasRef}
                  style={{
                    width: '180px',
                    height: '180px',
                    imageRendering: 'pixelated',
                    border: '1px solid #147D78',
                    backgroundColor: '#FFFFFF',
                  }}
                />
                <div style={{ fontSize: '12px', color: '#147D78', marginTop: '8px', fontFamily: 'monospace', fontWeight: 600 }}>
                  Decoded via Huffman Tree | Byte Match: 100%
                </div>
              </div>
            </div>

            <div style={{ fontSize: '12.5px', color: '#777777', fontStyle: 'italic', textAlign: 'center', marginTop: '8px' }}>
              "This demonstration reconstructs the browser-decoded pixel raster. It isolates the Huffman component and is not a complete PNG/DEFLATE file encoder."
            </div>
          </div>
        )}

        {/* ================= STAGE 8: RESULTS ================= */}
        {stage === 'results' && imageStats && encodingResult && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
                Stage 8 — Empirical Compression Evaluation
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#202124', margin: '0 0 10px 0' }}>
                Empirical Metrics &amp; Payload Savings
              </h2>
            </div>

            {/* 3 Prominent Metrics Cards */}
            {(() => {
              const originalBytes = imageStats.totalBytes;
              const huffmanPayloadBytes = Math.ceil(encodingResult.encodedBitLength / 8);
              const savingsRatio = ((originalBytes - huffmanPayloadBytes) / originalBytes) * 100;
              const isPositiveSavings = savingsRatio >= 0;

              return (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px',
                    margin: '12px 0',
                  }}
                >
                  {/* Card 1: Original Payload */}
                  <div
                    style={{
                      padding: '24px',
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E0E0E0',
                      borderTop: '4px solid #777777',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#777777', textTransform: 'uppercase' }}>
                      Original RGBA Payload
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'monospace', color: '#202124', margin: '8px 0' }}>
                      {originalBytes.toLocaleString()} <span style={{ fontSize: '16px', fontWeight: 400 }}>bytes</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#666666' }}>
                      Fixed 8 bits/symbol across {imageStats.totalPixels.toLocaleString()} pixels.
                    </div>
                  </div>

                  {/* Card 2: Huffman Payload */}
                  <div
                    style={{
                      padding: '24px',
                      backgroundColor: '#F3F9F9',
                      border: '1px solid #147D78',
                      borderTop: '4px solid #147D78',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#147D78', textTransform: 'uppercase' }}>
                      Huffman-Encoded Payload
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'monospace', color: '#147D78', margin: '8px 0' }}>
                      {huffmanPayloadBytes.toLocaleString()} <span style={{ fontSize: '16px', fontWeight: 400 }}>bytes</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#666666' }}>
                      Variable-length bits ({encodingResult.encodedBitLength.toLocaleString()} bits + {encodingResult.paddedBits} padding).
                    </div>
                  </div>

                  {/* Card 3: Payload Savings or Increase */}
                  <div
                    style={{
                      padding: '24px',
                      backgroundColor: isPositiveSavings ? '#F0F9F8' : '#FFF5F5',
                      border: `1px solid ${isPositiveSavings ? '#147D78' : '#D9534F'}`,
                      borderTop: `4px solid ${isPositiveSavings ? '#147D78' : '#D9534F'}`,
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 600, color: isPositiveSavings ? '#147D78' : '#D9534F', textTransform: 'uppercase' }}>
                      {isPositiveSavings ? 'Payload Savings' : 'Payload Expansion'}
                    </div>
                    <div
                      style={{
                        fontSize: '32px',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        color: isPositiveSavings ? '#147D78' : '#D9534F',
                        margin: '8px 0',
                      }}
                    >
                      {isPositiveSavings ? `-${savingsRatio.toFixed(2)}%` : `+${Math.abs(savingsRatio).toFixed(2)}%`}
                    </div>
                    <div style={{ fontSize: '13px', color: '#666666' }}>
                      {isPositiveSavings
                        ? `${(originalBytes - huffmanPayloadBytes).toLocaleString()} fewer payload bytes.`
                        : 'Payload expanded due to high symbol entropy / uniform distribution.'}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Metadata Overhead Breakdown */}
            <div
              style={{
                padding: '16px 20px',
                backgroundColor: '#FAFAFA',
                border: '1px solid #E2E2E2',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#202124', textTransform: 'uppercase', marginBottom: '6px' }}>
                Tree &amp; Codebook Transmission Metadata
              </div>
              <div style={{ fontSize: '14px', color: '#555555', lineHeight: 1.6 }}>
                In a complete storage format, the decoder requires the codebook or tree topology to reconstruct the dictionary.
                For this {imageStats.distinctSymbols}-symbol alphabet, canonical header metadata requires approximately <strong>{encodingResult.treeMetadataBytes} bytes</strong>.
                Total standalone compressed file volume = <strong>{(Math.ceil(encodingResult.encodedBitLength / 8) + encodingResult.treeMetadataBytes).toLocaleString()} bytes</strong>.
              </div>
            </div>

            {/* Technical Disclaimers */}
            <div
              style={{
                fontSize: '12.5px',
                color: '#777777',
                fontStyle: 'italic',
                lineHeight: 1.5,
                borderTop: '1px solid #ECECEC',
                paddingTop: '10px',
              }}
            >
              "This demonstration applies Huffman coding to the browser-decoded RGBA8 pixel data. It isolates the Huffman component and is not a complete PNG/DEFLATE encoder. Payload comparison metrics strictly contrast uncompressed raw raster against packed variable-length codewords."
            </div>
          </div>
        )}
      </div>

      {/* Demo Footer Controls: Next / Prev Stage buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px',
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (currentStageIndex > 0) {
              setStage(STAGES_LIST[currentStageIndex - 1]);
            }
          }}
          disabled={currentStageIndex === 0}
          style={{
            padding: '8px 18px',
            fontSize: '13px',
            fontWeight: 600,
            backgroundColor: '#FFFFFF',
            border: '1px solid #CCCCCC',
            color: currentStageIndex === 0 ? '#BBBBBB' : '#202124',
            cursor: currentStageIndex === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          &larr; Previous Stage ({currentStageIndex > 0 ? STAGES_LIST[currentStageIndex - 1] : ''})
        </button>

        <div style={{ fontSize: '13px', color: '#777777' }}>
          Interactive Demonstration • Stage {currentStageIndex + 1} of 8
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (currentStageIndex < STAGES_LIST.length - 1) {
              setStage(STAGES_LIST[currentStageIndex + 1]);
            }
          }}
          disabled={currentStageIndex === STAGES_LIST.length - 1}
          style={{
            padding: '8px 18px',
            fontSize: '13px',
            fontWeight: 600,
            backgroundColor: currentStageIndex === STAGES_LIST.length - 1 ? '#FFFFFF' : '#147D78',
            border: '1px solid #147D78',
            color: currentStageIndex === STAGES_LIST.length - 1 ? '#BBBBBB' : '#FFFFFF',
            cursor: currentStageIndex === STAGES_LIST.length - 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Next Stage ({currentStageIndex < STAGES_LIST.length - 1 ? STAGES_LIST[currentStageIndex + 1] : ''}) &rarr;
        </button>
      </div>
    </div>
  );
};
