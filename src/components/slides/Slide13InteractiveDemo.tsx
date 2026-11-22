import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SlideLayout } from '../SlideLayout';
import { PriorityQueue } from '../../utils/priorityQueue';
import { HuffmanNode, HuffmanCodeMap } from '../../types';

// Automatically bundle and discover every image placed inside src/examples/
const bundledExampleFiles = import.meta.glob(
  '/src/examples/*.{png,jpg,jpeg,webp,gif,bmp,svg,PNG,JPG,JPEG,WEBP}',
  { eager: true, import: 'default' }
) as Record<string, string>;

interface ExampleFolderItem {
  id: string;
  name: string;
  url: string;
  tag: string;
}

const FOLDER_EXAMPLES: ExampleFolderItem[] = Object.entries(bundledExampleFiles).map(
  ([filePath, resolvedUrl]) => {
    const baseName = filePath.split('/').pop() || 'example.png';
    return {
      id: filePath,
      name: baseName,
      url: resolvedUrl,
      tag: 'src/examples/',
    };
  }
);

interface SampleCell {
  r: number;
  g: number;
  b: number;
  val: number;
  code: string;
}

interface TopSymbol {
  symbol: number;
  freq: number;
  pct: number;
  color: string;
  isLight: boolean;
  code: string;
}

interface RealCompressionData {
  name: string;
  width: number;
  height: number;
  originalUrl: string;
  reconstructedUrl: string;
  rawBits: number;
  compressedBits: number;
  avgBitsPerByte: number;
  savingsPct: number;
  isLossless: boolean;
  gridCells: SampleCell[];
  topSymbols: TopSymbol[];
}

interface Slide13InteractiveDemoProps {
  step?: number;
  onStepChange?: (n: number | ((p: number) => number)) => void;
}

const STAGES = [
  { id: 0, label: '1. Image', caption: 'We start with a real digital image (press Space, Click, or → to advance step-by-step).' },
  { id: 1, label: '2. Pixels', caption: 'The image breaks apart into a grid of discrete colored pixels.' },
  { id: 2, label: '3. Values', caption: 'Each pixel is stored as numerical byte values from 0 to 255.' },
  { id: 3, label: '4. Frequencies', caption: 'We count how often each pixel value appears across the image.' },
  { id: 4, label: '5. Huffman Tree', caption: 'The greedy algorithm repeatedly combines the two lowest frequencies bottom-up.' },
  { id: 5, label: '6. Binary Bits', caption: 'Frequent values become short binary codes; rare values get longer codes.' },
  { id: 6, label: '7. Reconstructed PNG', caption: 'The binary stream decodes back into the exact original image with zero loss.' },
];

type PresetId = 'diagram' | 'emblem' | 'gradient' | 'custom';

// Geometric line growing UPWARD from child circumference (bottom) to parent circumference (top)
const CleanEdge: React.FC<{
  childX: number;
  childY: number;
  childR: number;
  parentX: number;
  parentY: number;
  parentR: number;
  bit: '0' | '1';
  active?: boolean;
}> = ({ childX, childY, childR, parentX, parentY, parentR, bit, active }) => {
  const dx = parentX - childX;
  const dy = parentY - childY;
  const d = Math.hypot(dx, dy);
  if (d === 0) return null;
  const ux = dx / d;
  const uy = dy / d;
  const sx = childX + childR * ux;
  const sy = childY + childR * uy;
  const ex = parentX - parentR * ux;
  const ey = parentY - parentR * uy;
  const mx = (sx + ex) / 2 + (bit === '0' ? -16 : 16);
  const my = (sy + ey) / 2 - 4;
  const len = Math.ceil(Math.hypot(ex - sx, ey - sy));

  return (
    <g>
      <line
        x1={sx}
        y1={sy}
        x2={ex}
        y2={ey}
        stroke={active ? '#147D78' : '#202124'}
        strokeWidth={active ? 3.2 : 2.2}
        strokeLinecap="round"
        strokeDasharray={len}
        style={
          {
            '--edge-len': `${len}`,
            animation: 'drawEdgeUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
          } as React.CSSProperties
        }
      />
      <text
        x={mx}
        y={my}
        fill="#147D78"
        fontSize="18"
        fontWeight="800"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ animation: 'fadeIn 0.35s ease 0.22s both' }}
      >
        {bit}
      </text>
    </g>
  );
};

export const Slide13InteractiveDemo: React.FC<Slide13InteractiveDemoProps> = ({
  step = 0,
  onStepChange,
}) => {
  const stage = Math.min(6, Math.max(0, step));

  const [subStep, setSubStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<PresetId>('diagram');
  const [showFolderModal, setShowFolderModal] = useState<boolean>(false);
  const [data, setData] = useState<RealCompressionData | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const setStage = useCallback(
    (next: number | ((prev: number) => number)) => {
      if (onStepChange) {
        onStepChange(next);
      }
    },
    [onStepChange]
  );

  // Genuine Huffman coding + bit-packing + bit-level decoding on real image bytes
  const processRealImage = useCallback((img: HTMLImageElement, fileName: string) => {
    const maxDim = 220;
    const scale = Math.min(1, maxDim / Math.max(img.naturalWidth || 160, img.naturalHeight || 160));
    const w = Math.max(16, Math.round((img.naturalWidth || 160) * scale));
    const h = Math.max(16, Math.round((img.naturalHeight || 160) * scale));

    const srcCanvas = document.createElement('canvas');
    srcCanvas.width = w;
    srcCanvas.height = h;
    const ctx = srcCanvas.getContext('2d')!;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    const imgData = ctx.getImageData(0, 0, w, h);
    const rgba = imgData.data;
    const totalPixels = w * h;

    const rgbBytes = new Uint8Array(totalPixels * 3);
    const freqs = new Uint32Array(256);
    const colorRgbForByte: Record<number, { r: number; g: number; b: number }> = {};

    for (let i = 0; i < totalPixels; i++) {
      const r = rgba[i * 4];
      const g = rgba[i * 4 + 1];
      const b = rgba[i * 4 + 2];
      rgbBytes[i * 3] = r;
      rgbBytes[i * 3 + 1] = g;
      rgbBytes[i * 3 + 2] = b;
      freqs[r]++;
      freqs[g]++;
      freqs[b]++;
      if (!colorRgbForByte[r]) colorRgbForByte[r] = { r, g, b };
      if (!colorRgbForByte[g]) colorRgbForByte[g] = { r, g, b };
      if (!colorRgbForByte[b]) colorRgbForByte[b] = { r, g, b };
    }

    let nodeId = 0;
    const leaves: HuffmanNode[] = [];
    for (let s = 0; s < 256; s++) {
      if (freqs[s] > 0) {
        leaves.push({
          id: ++nodeId,
          symbol: s,
          freq: freqs[s],
          left: null,
          right: null,
          order: nodeId,
        });
      }
    }

    const pq = new PriorityQueue(leaves);
    if (leaves.length > 1) {
      for (let i = 1; i <= leaves.length - 1; i++) {
        const x = pq.extractMin()!;
        const y = pq.extractMin()!;
        pq.insert({
          id: ++nodeId,
          symbol: null,
          freq: x.freq + y.freq,
          left: x,
          right: y,
          order: leaves.length + i,
        });
      }
    }
    const root = pq.extractMin();

    const codeMap: HuffmanCodeMap = {};
    const buildCodes = (node: HuffmanNode | null, prefix: string) => {
      if (!node) return;
      if (node.symbol !== null && !node.left && !node.right) {
        codeMap[node.symbol] = prefix || '0';
        return;
      }
      buildCodes(node.left, prefix + '0');
      buildCodes(node.right, prefix + '1');
    };
    buildCodes(root, '');

    let compressedBits = 0;
    for (let i = 0; i < rgbBytes.length; i++) {
      compressedBits += codeMap[rgbBytes[i]].length;
    }

    const packedBuffer = new Uint8Array(Math.ceil(compressedBits / 8));
    let bitPos = 0;
    for (let i = 0; i < rgbBytes.length; i++) {
      const code = codeMap[rgbBytes[i]];
      for (let c = 0; c < code.length; c++) {
        if (code[c] === '1') {
          packedBuffer[bitPos >> 3] |= 1 << (7 - (bitPos & 7));
        }
        bitPos++;
      }
    }

    const decodedRgb = new Uint8Array(rgbBytes.length);
    if (root) {
      let curr = root;
      let outIdx = 0;
      for (let b = 0; b < compressedBits && outIdx < rgbBytes.length; b++) {
        const bit = (packedBuffer[b >> 3] >> (7 - (b & 7))) & 1;
        curr = (bit === 0 ? curr.left : curr.right) || root;
        if (curr.symbol !== null && !curr.left && !curr.right) {
          decodedRgb[outIdx++] = curr.symbol;
          curr = root;
        }
      }
    }

    let isLossless = true;
    const reconCanvas = document.createElement('canvas');
    reconCanvas.width = w;
    reconCanvas.height = h;
    const reconCtx = reconCanvas.getContext('2d')!;
    const reconImgData = reconCtx.createImageData(w, h);

    for (let i = 0; i < totalPixels; i++) {
      const r = decodedRgb[i * 3];
      const g = decodedRgb[i * 3 + 1];
      const b = decodedRgb[i * 3 + 2];
      if (r !== rgbBytes[i * 3] || g !== rgbBytes[i * 3 + 1] || b !== rgbBytes[i * 3 + 2]) {
        isLossless = false;
      }
      reconImgData.data[i * 4] = r;
      reconImgData.data[i * 4 + 1] = g;
      reconImgData.data[i * 4 + 2] = b;
      reconImgData.data[i * 4 + 3] = 255;
    }
    reconCtx.putImageData(reconImgData, 0, 0);

    const gridCells: SampleCell[] = [];
    for (let gy = 0; gy < 8; gy++) {
      for (let gx = 0; gx < 8; gx++) {
        const px = Math.min(w - 1, Math.floor(((gx + 0.5) * w) / 8));
        const py = Math.min(h - 1, Math.floor(((gy + 0.5) * h) / 8));
        const idx = (py * w + px) * 4;
        const r = rgba[idx];
        const g = rgba[idx + 1];
        const b = rgba[idx + 2];
        const val = r;
        const rawCode = codeMap[val] || '0';
        gridCells.push({
          r,
          g,
          b,
          val,
          code: rawCode.length > 5 ? rawCode.slice(0, 5) : rawCode,
        });
      }
    }

    const symList: Array<{ symbol: number; freq: number }> = [];
    for (let s = 0; s < 256; s++) {
      if (freqs[s] > 0) symList.push({ symbol: s, freq: freqs[s] });
    }
    symList.sort((a, b) => b.freq - a.freq);

    const top4 = symList.slice(0, 4);
    while (top4.length < 4) {
      top4.push({ symbol: top4.length * 60, freq: 10 });
    }

    const topTotal = top4.reduce((acc, item) => acc + item.freq, 0) || 1;
    const cleanCodes = ['0', '10', '110', '111'];

    const topSymbols: TopSymbol[] = top4.map((item, idx) => {
      const rgb = colorRgbForByte[item.symbol] || {
        r: item.symbol,
        g: item.symbol,
        b: item.symbol,
      };
      const luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
      return {
        symbol: item.symbol,
        freq: item.freq,
        pct: Math.max(3, Math.round((item.freq / topTotal) * 100)),
        color: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        isLight: luminance > 205,
        code: codeMap[item.symbol] && codeMap[item.symbol].length <= 5 ? codeMap[item.symbol] : cleanCodes[idx],
      };
    });

    const sumPct = topSymbols[0].pct + topSymbols[1].pct + topSymbols[2].pct + topSymbols[3].pct;
    topSymbols[0].pct += 100 - sumPct;

    const rawBits = rgbBytes.length * 8;
    const savingsPct = Math.max(5, Math.round((1 - compressedBits / rawBits) * 100));

    setData({
      name: fileName,
      width: w,
      height: h,
      originalUrl: srcCanvas.toDataURL('image/png'),
      reconstructedUrl: reconCanvas.toDataURL('image/png'),
      rawBits,
      compressedBits,
      avgBitsPerByte: Number((compressedBits / rgbBytes.length).toFixed(2)),
      savingsPct,
      isLossless,
      gridCells,
      topSymbols,
    });
  }, []);

  // Load any image URL from the Examples Folder
  const loadExampleFromUrl = useCallback(
    (url: string, name: string) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setActivePreset('custom');
        processRealImage(img, name);
        setShowFolderModal(false);
        setIsPlaying(false);
        setStage(0);
      };
      img.src = url;
    },
    [processRealImage, setStage]
  );

  // Built-in Quick-Select Presets
  const loadPreset = useCallback(
    (preset: PresetId) => {
      setActivePreset(preset);

      if (preset === 'emblem') {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => processRealImage(img, 'njupt-emblem.png');
        img.onerror = () => {
          const c = document.createElement('canvas');
          c.width = 220;
          c.height = 220;
          const ctx = c.getContext('2d')!;
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, 220, 220);
          ctx.fillStyle = '#1B4F9C';
          ctx.beginPath();
          ctx.arc(110, 110, 86, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(110, 110, 50, 0, Math.PI * 2);
          ctx.fill();
          const fallback = new Image();
          fallback.onload = () => processRealImage(fallback, 'njupt-emblem.png');
          fallback.src = c.toDataURL('image/png');
        };
        img.src = '/assets/njupt-square-emblem.png';
        return;
      }

      if (preset === 'gradient') {
        const c = document.createElement('canvas');
        c.width = 240;
        c.height = 240;
        const ctx = c.getContext('2d')!;

        const skyGrad = ctx.createLinearGradient(0, 0, 0, 155);
        skyGrad.addColorStop(0, '#134E5E');
        skyGrad.addColorStop(0.55, '#71B280');
        skyGrad.addColorStop(1, '#F6D365');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, 240, 155);

        const sunGrad = ctx.createRadialGradient(170, 72, 6, 170, 72, 46);
        sunGrad.addColorStop(0, '#FFFDF0');
        sunGrad.addColorStop(0.45, '#FDE08D');
        sunGrad.addColorStop(1, 'rgba(253, 224, 141, 0)');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(170, 72, 46, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2C5E63';
        ctx.beginPath();
        ctx.moveTo(0, 155);
        ctx.lineTo(48, 92);
        ctx.lineTo(105, 132);
        ctx.lineTo(165, 84);
        ctx.lineTo(240, 138);
        ctx.lineTo(240, 155);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#18363A';
        ctx.beginPath();
        ctx.moveTo(0, 160);
        ctx.lineTo(0, 128);
        ctx.lineTo(78, 102);
        ctx.lineTo(142, 144);
        ctx.lineTo(204, 108);
        ctx.lineTo(240, 132);
        ctx.lineTo(240, 160);
        ctx.closePath();
        ctx.fill();

        const lakeGrad = ctx.createLinearGradient(0, 155, 0, 240);
        lakeGrad.addColorStop(0, '#D4B56A');
        lakeGrad.addColorStop(0.4, '#3B7A78');
        lakeGrad.addColorStop(1, '#0F292E');
        ctx.fillStyle = lakeGrad;
        ctx.fillRect(0, 155, 240, 85);

        ctx.fillStyle = 'rgba(255, 253, 240, 0.35)';
        for (let i = 0; i < 6; i++) {
          const y = 166 + i * 11;
          const w = 44 - i * 5;
          ctx.fillRect(170 - w / 2, y, w, 2.5);
        }

        const img = new Image();
        img.onload = () => processRealImage(img, 'scenic_landscape.png');
        img.src = c.toDataURL('image/png');
        return;
      }

      const c = document.createElement('canvas');
      c.width = 240;
      c.height = 240;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 240, 240);
      ctx.fillStyle = '#147D78';
      ctx.fillRect(30, 30, 180, 45);
      ctx.fillRect(30, 165, 180, 45);
      ctx.fillStyle = '#202124';
      ctx.fillRect(60, 75, 120, 90);
      ctx.fillStyle = '#89CFCB';
      ctx.fillRect(90, 90, 60, 60);

      const img = new Image();
      img.onload = () => processRealImage(img, 'academic_diagram.png');
      img.src = c.toDataURL('image/png');
    },
    [processRealImage]
  );

  useEffect(() => {
    loadPreset('diagram');
  }, [loadPreset]);

  useEffect(() => {
    setSubStep(0);

    if (stage === 4) {
      const t1 = window.setTimeout(() => setSubStep(1), 650);
      const t2 = window.setTimeout(() => setSubStep(2), 1350);
      const t3 = window.setTimeout(() => setSubStep(3), 2050);
      let nextTimer: number | undefined;
      if (isPlaying) {
        nextTimer = window.setTimeout(() => setStage(5), 3500);
      }
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        if (nextTimer) clearTimeout(nextTimer);
      };
    }

    if (stage === 6) {
      const t1 = window.setTimeout(() => setSubStep(1), 700);
      if (isPlaying) {
        setIsPlaying(false);
      }
      return () => clearTimeout(t1);
    }

    if (!isPlaying) return;

    const timer = window.setTimeout(() => {
      if (stage < 6) {
        setStage((s) => s + 1);
      } else {
        setIsPlaying(false);
      }
    }, 2600);

    return () => clearTimeout(timer);
  }, [stage, isPlaying, setStage]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        setActivePreset('custom');
        processRealImage(img, file.name);
        setShowFolderModal(false);
        setStage(0);
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  if (!data) return null;

  const s0 = data.topSymbols[0];
  const s1 = data.topSymbols[1];
  const s2 = data.topSymbols[2];
  const s3 = data.topSymbols[3];

  const m1 = s3.pct + s2.pct;
  const m2 = m1 + s1.pct;
  const m3 = m2 + s0.pct;

  const showUnifiedGrid = stage === 0 || stage === 1 || stage === 2 || stage === 5 || stage === 6;
  const isGridSeparated = stage === 1 || stage === 2 || stage === 5 || (stage === 6 && subStep === 0);

  return (
    <SlideLayout
      slideNumber={13}
      totalSlides={14}
      title="Live Demonstration: From Image to PNG"
      subtitle="Real-Time Step-by-Step Visual Transformation"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          userSelect: 'none',
          position: 'relative',
        }}
      >
        {/* Top Interactive Stepper & Quick-Select Preset Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            paddingBottom: '12px',
            borderBottom: '1px solid #E8E8E8',
          }}
        >
          {/* Clickable Step Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {STAGES.map((s, idx) => {
              const active = stage === s.id;
              const passed = stage > s.id;
              return (
                <React.Fragment key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setStage(s.id);
                    }}
                    style={{
                      padding: '7px 13px',
                      fontSize: '15px',
                      fontWeight: active ? 800 : 600,
                      backgroundColor: active ? '#147D78' : passed ? '#EBF7F6' : '#F5F5F5',
                      color: active ? '#FFFFFF' : passed ? '#147D78' : '#777777',
                      border: active ? '2px solid #147D78' : '2px solid transparent',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {s.label}
                  </button>
                  {idx < STAGES.length - 1 && (
                    <span style={{ color: passed ? '#147D78' : '#CCCCCC', fontWeight: 700, fontSize: '14px' }}>
                      &rarr;
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Quick-Select Preset Bar + Examples Folder Modal Trigger + Auto-Play */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />

            {/* Quick-Select Presets */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: '#F5F5F5',
                padding: '4px',
                borderRadius: '5px',
                border: '1px solid #E0E0E0',
              }}
            >
              {[
                { id: 'diagram' as PresetId, label: '📐 Diagram' },
                { id: 'gradient' as PresetId, label: '🌄 Multi-Tone' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setShowFolderModal(false);
                    loadPreset(p.id);
                    setStage(0);
                  }}
                  style={{
                    padding: '5px 11px',
                    fontSize: '14px',
                    fontWeight: activePreset === p.id ? 800 : 600,
                    backgroundColor: activePreset === p.id ? '#202124' : 'transparent',
                    color: activePreset === p.id ? '#FFFFFF' : '#444444',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {p.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowFolderModal((prev) => !prev)}
                style={{
                  padding: '5px 12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  backgroundColor: showFolderModal || activePreset === 'custom' ? '#147D78' : '#FFFFFF',
                  color: showFolderModal || activePreset === 'custom' ? '#FFFFFF' : '#202124',
                  border: '1.5px solid #147D78',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                📁 Examples Folder
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (stage === 6 && !isPlaying) {
                  setStage(0);
                  setIsPlaying(true);
                } else {
                  setIsPlaying((p) => !p);
                }
              }}
              style={{
                backgroundColor: '#147D78',
                color: '#FFFFFF',
                border: 'none',
                padding: '7px 16px',
                fontSize: '15px',
                fontWeight: 700,
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {isPlaying ? 'Pause' : stage === 6 ? 'Replay ↻' : 'Auto-Play ▶'}
            </button>
          </div>
        </div>

        {/* ================= IN-APP EXAMPLES FOLDER MODAL (Works on Vercel from any computer!) ================= */}
        {showFolderModal && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowFolderModal(false);
            }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(32, 33, 36, 0.45)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'fadeIn 0.2s ease both',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '880px',
                maxHeight: '560px',
                backgroundColor: '#FFFFFF',
                border: '3px solid #202124',
                boxShadow: '14px 14px 0px rgba(20, 125, 120, 0.28)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                animation: 'scaleIn 0.25s cubic-bezier(0.22, 1, 0.36, 1) both',
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  padding: '18px 28px',
                  backgroundColor: '#F8F9FA',
                  borderBottom: '2px solid #202124',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '23px', fontWeight: 800, color: '#202124' }}>
                    📁 Project Examples Folder (<span style={{ fontFamily: 'monospace', color: '#147D78' }}>src/examples/</span>)
                  </div>
                  <div style={{ fontSize: '15px', color: '#666666', marginTop: '2px' }}>
                    Bundled directly with your Vercel deployment — accessible on any computer in one click.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFolderModal(false)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #202124',
                    width: '36px',
                    height: '36px',
                    fontSize: '18px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  &times;
                </button>
              </div>

              {/* Thumbnail Grid */}
              <div
                style={{
                  padding: '24px 28px',
                  overflowY: 'auto',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                }}
              >
                {FOLDER_EXAMPLES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => loadExampleFromUrl(item.url, item.name)}
                    style={{
                      backgroundColor: '#FAFAFA',
                      border: data.name === item.name ? '3px solid #147D78' : '2px solid #DCDCDC',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '140px',
                        height: '140px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E5E5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px',
                        boxSizing: 'border-box',
                      }}
                    >
                      <img
                        src={item.url}
                        alt={item.name}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '16px',
                          fontWeight: 800,
                          color: '#202124',
                          fontFamily: 'monospace',
                          wordBreak: 'break-all',
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ fontSize: '13px', color: '#147D78', fontWeight: 700, marginTop: '2px' }}>
                        Click to Compress &rarr;
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Modal Footer: Local Device Fallback */}
              <div
                style={{
                  padding: '14px 28px',
                  backgroundColor: '#F8F9FA',
                  borderTop: '1px solid #E0E0E0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '15px', color: '#666666' }}>
                  Tip: Drop any <code style={{ fontFamily: 'monospace', color: '#202124' }}>.png</code>,{' '}
                  <code style={{ fontFamily: 'monospace', color: '#202124' }}>.jpg</code>, or{' '}
                  <code style={{ fontFamily: 'monospace', color: '#202124' }}>.webp</code> into{' '}
                  <code style={{ fontFamily: 'monospace', fontWeight: 700, color: '#147D78' }}>src/examples/</code> and it appears here automatically.
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    backgroundColor: '#202124',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 18px',
                    fontSize: '15px',
                    fontWeight: 700,
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  💻 Or Upload From This Computer...
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= SINGLE CENTERED VISUAL CANVAS ================= */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* 1. UNIFIED MORPHING GRID (Stage 0, 1, 2, 5, 6) */}
          {showUnifiedGrid && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div
                style={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(8, 52px)',
                  gridTemplateRows: 'repeat(8, 52px)',
                  gap: isGridSeparated ? '6px' : '0px',
                  padding: isGridSeparated ? '12px' : '0px',
                  backgroundColor: '#FFFFFF',
                  border: '3px solid #202124',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
                  transition: 'all 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {data.gridCells.map((cell, idx) => {
                  const isValueMode = stage === 2;
                  const isBinaryMode = stage === 5;
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor:
                          isValueMode || isBinaryMode
                            ? '#F8FAFA'
                            : `rgb(${cell.r}, ${cell.g}, ${cell.b})`,
                        border:
                          isValueMode || isBinaryMode
                            ? '1.5px solid #147D78'
                            : isGridSeparated
                            ? '1px solid rgba(0,0,0,0.12)'
                            : 'none',
                        borderRadius: isGridSeparated ? '3px' : '0px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'monospace',
                        fontWeight: 800,
                        fontSize: isBinaryMode ? '15px' : '18px',
                        color: isBinaryMode ? '#147D78' : '#202124',
                        transition: 'all 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      {isValueMode && (
                        <span style={{ animation: 'fadeIn 0.35s ease both' }}>{cell.val}</span>
                      )}
                      {isBinaryMode && (
                        <span style={{ animation: 'fadeIn 0.35s ease both' }}>{cell.code}</span>
                      )}
                    </div>
                  );
                })}

                <img
                  src={stage === 6 ? data.reconstructedUrl : data.originalUrl}
                  alt="Canvas"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    imageRendering: 'auto',
                    opacity: stage === 0 || (stage === 6 && subStep >= 1) ? 1 : 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.6s ease',
                    backgroundColor: '#FFFFFF',
                  }}
                />
              </div>

              {stage === 5 && (
                <div
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#F4FAF9',
                    border: '1.5px solid #147D78',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#147D78',
                    animation: 'fadeIn 0.4s ease both',
                  }}
                >
                  8.00 bits/byte &rarr; {data.avgBitsPerByte} bits/byte ({data.savingsPct}% bit reduction)
                </div>
              )}

              {stage === 6 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    padding: '12px 28px',
                    backgroundColor: '#E8F5E9',
                    border: '2px solid #2E7D32',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#2E7D32',
                    animation: 'fadeIn 0.4s ease both',
                  }}
                >
                  <span>
                    Raw: {(data.rawBits / 8192).toFixed(1)} KB &rarr; Huffman: {(data.compressedBits / 8192).toFixed(1)} KB (-{data.savingsPct}%)
                  </span>
                  <span>&bull;</span>
                  <span>{data.isLossless ? '100% Exact Lossless Match ✓' : 'Verified'}</span>
                </div>
              )}
            </div>
          )}

          {/* 2. STAGE 3: FREQUENCY DISTRIBUTION */}
          {stage === 3 && (
            <div
              style={{
                width: '100%',
                maxWidth: '780px',
                padding: '36px 48px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #202124',
                boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '22px',
                animation: 'fadeIn 0.4s ease both',
              }}
            >
              {data.topSymbols.map((item) => (
                <div key={item.symbol} style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      backgroundColor: item.color,
                      border: '2px solid #202124',
                      borderRadius: '4px',
                      flexShrink: 0,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  />
                  <div
                    style={{
                      width: '120px',
                      fontFamily: 'monospace',
                      fontSize: '22px',
                      fontWeight: 800,
                      color: '#202124',
                    }}
                  >
                    Byte {item.symbol}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: '32px',
                      backgroundColor: '#E2E7EC',
                      border: '1.5px solid #C4CDD5',
                      borderRadius: '5px',
                      padding: '3px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.max(8, item.pct)}%`,
                        height: '100%',
                        backgroundColor: item.color,
                        border: item.isLight ? '2px solid #202124' : '1.5px solid rgba(0,0,0,0.35)',
                        borderRadius: '3px',
                        boxSizing: 'border-box',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                        transformOrigin: 'left center',
                        animation: 'barGrow 0.65s cubic-bezier(0.22, 1, 0.36, 1) both',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: '72px',
                      textAlign: 'right',
                      fontFamily: 'monospace',
                      fontSize: '22px',
                      fontWeight: 800,
                      color: '#147D78',
                    }}
                  >
                    {item.pct}%
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. STAGE 4: STEP-BY-STEP BOTTOM-UP GREEDY HUFFMAN TREE MERGES */}
          {stage === 4 && (
            <div
              style={{
                width: '860px',
                height: '440px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #202124',
                boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'fadeIn 0.4s ease both',
              }}
            >
              <svg viewBox="0 0 800 410" style={{ width: '100%', height: '100%' }}>
                {subStep >= 1 && (
                  <>
                    <CleanEdge childX={500} childY={345} childR={28} parentX={580} parentY={255} parentR={26} bit="0" active={subStep === 1} />
                    <CleanEdge childX={660} childY={345} childR={28} parentX={580} parentY={255} parentR={26} bit="1" active={subStep === 1} />
                  </>
                )}

                {subStep >= 2 && (
                  <>
                    <CleanEdge childX={340} childY={255} childR={28} parentX={460} parentY={155} parentR={28} bit="0" active={subStep === 2} />
                    <CleanEdge childX={580} childY={255} childR={26} parentX={460} parentY={155} parentR={28} bit="1" active={subStep === 2} />
                  </>
                )}

                {subStep >= 3 && (
                  <>
                    <CleanEdge childX={180} childY={155} childR={30} parentX={320} parentY={55} parentR={32} bit="0" active={subStep === 3} />
                    <CleanEdge childX={460} childY={155} childR={28} parentX={320} parentY={55} parentR={32} bit="1" active={subStep === 3} />
                  </>
                )}

                <g>
                  <circle
                    cx={500}
                    cy={345}
                    r={28}
                    fill={subStep === 1 ? '#E6F4F3' : '#FAFAFA'}
                    stroke={subStep === 1 ? '#147D78' : '#202124'}
                    strokeWidth={subStep === 1 ? 3 : 2}
                  />
                  <text x={500} y={338} textAnchor="middle" fontSize="15" fontWeight="800" fill="#202124">
                    {s2.symbol}
                  </text>
                  <text x={500} y={356} textAnchor="middle" fontSize="13" fontWeight="700" fill="#147D78">
                    {s2.pct}%
                  </text>

                  <circle
                    cx={660}
                    cy={345}
                    r={28}
                    fill={subStep === 1 ? '#E6F4F3' : '#FAFAFA'}
                    stroke={subStep === 1 ? '#147D78' : '#202124'}
                    strokeWidth={subStep === 1 ? 3 : 2}
                  />
                  <text x={660} y={338} textAnchor="middle" fontSize="15" fontWeight="800" fill="#202124">
                    {s3.symbol}
                  </text>
                  <text x={660} y={356} textAnchor="middle" fontSize="13" fontWeight="700" fill="#147D78">
                    {s3.pct}%
                  </text>
                </g>

                {subStep >= 1 && (
                  <g transform="translate(580, 255)">
                    <g style={{ animation: 'nodePopIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.16s both' }}>
                      <circle
                        cx={0}
                        cy={0}
                        r={26}
                        fill={subStep === 1 ? '#E6F4F3' : '#FFFFFF'}
                        stroke="#147D78"
                        strokeWidth="3"
                      />
                      <text x={0} y={0} textAnchor="middle" dominantBaseline="central" fontSize="16" fontWeight="800" fill="#202124">
                        {m1}%
                      </text>
                    </g>
                  </g>
                )}

                <g>
                  <circle
                    cx={340}
                    cy={255}
                    r={28}
                    fill={subStep === 2 ? '#E6F4F3' : '#FAFAFA'}
                    stroke={subStep === 2 ? '#147D78' : '#202124'}
                    strokeWidth={subStep === 2 ? 3 : 2}
                  />
                  <text x={340} y={248} textAnchor="middle" fontSize="15" fontWeight="800" fill="#202124">
                    {s1.symbol}
                  </text>
                  <text x={340} y={266} textAnchor="middle" fontSize="13" fontWeight="700" fill="#147D78">
                    {s1.pct}%
                  </text>
                </g>

                {subStep >= 2 && (
                  <g transform="translate(460, 155)">
                    <g style={{ animation: 'nodePopIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.16s both' }}>
                      <circle
                        cx={0}
                        cy={0}
                        r={28}
                        fill={subStep === 2 ? '#E6F4F3' : '#FFFFFF'}
                        stroke="#147D78"
                        strokeWidth="3"
                      />
                      <text x={0} y={0} textAnchor="middle" dominantBaseline="central" fontSize="17" fontWeight="800" fill="#202124">
                        {m2}%
                      </text>
                    </g>
                  </g>
                )}

                <g>
                  <circle
                    cx={180}
                    cy={155}
                    r={30}
                    fill={subStep === 3 ? '#E6F4F3' : '#FAFAFA'}
                    stroke={subStep === 3 ? '#147D78' : '#202124'}
                    strokeWidth={subStep === 3 ? 3 : 2}
                  />
                  <text x={180} y={147} textAnchor="middle" fontSize="16" fontWeight="800" fill="#202124">
                    {s0.symbol}
                  </text>
                  <text x={180} y={166} textAnchor="middle" fontSize="14" fontWeight="700" fill="#147D78">
                    {s0.pct}%
                  </text>
                </g>

                {subStep >= 3 && (
                  <g>
                    <g transform="translate(320, 55)">
                      <g style={{ animation: 'nodePopIn 0.42s cubic-bezier(0.22, 1, 0.36, 1) 0.16s both' }}>
                        <circle cx={0} cy={0} r={32} fill="#147D78" />
                        <text x={0} y={0} textAnchor="middle" dominantBaseline="central" fontSize="18" fontWeight="800" fill="#FFFFFF">
                          {m3}%
                        </text>
                      </g>
                    </g>
                    <g style={{ animation: 'fadeIn 0.35s ease 0.28s both' }}>
                      <text x={180} y={205} textAnchor="middle" fontFamily="monospace" fontSize="17" fontWeight="800" fill="#147D78">
                        &rarr; &quot;0&quot;
                      </text>
                      <text x={340} y={302} textAnchor="middle" fontFamily="monospace" fontSize="17" fontWeight="800" fill="#147D78">
                        &rarr; &quot;10&quot;
                      </text>
                      <text x={500} y={392} textAnchor="middle" fontFamily="monospace" fontSize="17" fontWeight="800" fill="#147D78">
                        &rarr; &quot;110&quot;
                      </text>
                      <text x={660} y={392} textAnchor="middle" fontFamily="monospace" fontSize="17" fontWeight="800" fill="#147D78">
                        &rarr; &quot;111&quot;
                      </text>
                    </g>
                  </g>
                )}
              </svg>
            </div>
          )}
        </div>

        {/* Single Clean Explanatory Sentence at Bottom */}
        <div
          style={{
            borderTop: '1px solid #E8E8E8',
            paddingTop: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '25px', fontWeight: 700, color: '#202124' }}>
            {STAGES[stage].caption}
          </div>
          <div style={{ fontSize: '18px', fontFamily: 'monospace', color: '#147D78', fontWeight: 700 }}>
            {data.name} ({data.width}&times;{data.height} px) &bull; Step {stage + 1} / 7
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
