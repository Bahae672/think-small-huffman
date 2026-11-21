import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide12ComplexityGraphProps {
  step?: number;
}

export const Slide12ComplexityGraph: React.FC<Slide12ComplexityGraphProps> = ({ step = 0 }) => {
  // Current step 0: Base comparison, step 1: Highlighted 32x speedup at k=256
  const currentStep = Math.min(1, Math.max(0, step));

  // Graph geometry for large SVG (~1400 x 540)
  // X: k from 16 to 256. SVG x from 120 to 1280 (width 1160)
  // Y: ops from 0 to 65536. SVG y from 480 to 50 (height 430)
  const xMin = 16;
  const xMax = 256;
  const yMax = 65536;

  const toX = (k: number) => 120 + ((k - xMin) / (xMax - xMin)) * 1140;
  const toY = (ops: number) => 480 - (ops / yMax) * 420;

  const pointsK2: string[] = [];
  const pointsKLogK: string[] = [];

  for (let k = 16; k <= 256; k += 4) {
    const x = toX(k);
    const yK2 = toY(k * k);
    const yKLogK = toY(k * Math.log2(k));
    pointsK2.push(`${x.toFixed(1)},${yK2.toFixed(1)}`);
    pointsKLogK.push(`${x.toFixed(1)},${yKLogK.toFixed(1)}`);
  }

  // Key evaluation points
  const pK2_256 = { x: toX(256), y: toY(65536) };
  const pKLogK_256 = { x: toX(256), y: toY(256 * 8) };

  return (
    <SlideLayout
      slideNumber={12}
      totalSlides={14}
      title="Why Use a Priority Queue?"
      subtitle="Comparative Growth Rate: Min-Heap O(k log k) vs. Repeated Array Scan O(k²)"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        {/* Large Graph Section (~75% of slide) */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#FAFAFA',
            border: '2px solid #202124',
            boxShadow: '6px 6px 0px rgba(0,0,0,0.06)',
            padding: '20px 32px 10px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Legend Banner */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#333' }}>
              Operations vs. Alphabet Size (<span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>k</span>)
            </div>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '4px', backgroundColor: '#D9534F' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#D9534F' }}>
                  Naive Array Scan: O(k²)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '5px', backgroundColor: '#147D78' }} />
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#147D78' }}>
                  Min-Heap Priority Queue: O(k log k)
                </span>
              </div>
            </div>
          </div>

          {/* Scaled SVG Graph */}
          <div style={{ width: '100%', height: '520px', position: 'relative' }}>
            <svg viewBox="0 0 1440 520" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Gridlines Horizontal */}
              {[0, 16384, 32768, 49152, 65536].map((val) => {
                const y = toY(val);
                return (
                  <g key={val}>
                    <line x1={120} y1={y} x2={1260} y2={y} stroke="#E2E2E2" strokeWidth="1" strokeDasharray="4 4" />
                    <text x={108} y={y + 5} fill="#777777" fontSize="15" textAnchor="end" fontFamily="monospace">
                      {val.toLocaleString()}
                    </text>
                  </g>
                );
              })}

              {/* Gridlines Vertical */}
              {[32, 64, 96, 128, 160, 192, 224, 256].map((kVal) => {
                const x = toX(kVal);
                return (
                  <g key={kVal}>
                    <line x1={x} y1={50} x2={x} y2={480} stroke="#E2E2E2" strokeWidth="1" strokeDasharray="4 4" />
                    <text x={x} y={504} fill="#777777" fontSize="16" textAnchor="middle" fontFamily="monospace">
                      {kVal}
                    </text>
                  </g>
                );
              })}

              {/* Axes */}
              <line x1={120} y1={480} x2={1280} y2={480} stroke="#202124" strokeWidth="2.5" />
              <line x1={120} y1={480} x2={120} y2={40} stroke="#202124" strokeWidth="2.5" />

              {/* Axis Labels */}
              <text x={700} y={535} fill="#202124" fontSize="18" fontWeight="700" textAnchor="middle">
                Alphabet Size k (Distinct Byte Symbols in Image) &rarr;
              </text>
              <text
                x={-260}
                y={36}
                fill="#202124"
                fontSize="18"
                fontWeight="700"
                textAnchor="middle"
                transform="rotate(-90)"
              >
                &larr; Operation Steps (Comparisons &amp; Pointer Swaps)
              </text>

              {/* O(k^2) Curve */}
              <polyline
                fill="none"
                stroke="#D9534F"
                strokeWidth="3.5"
                points={pointsK2.join(' ')}
              />

              {/* O(k log k) Curve */}
              <polyline
                fill="none"
                stroke="#147D78"
                strokeWidth="5"
                points={pointsKLogK.join(' ')}
              />

              {/* End Point Dot: O(k^2) */}
              <circle cx={pK2_256.x} cy={pK2_256.y} r="7" fill="#D9534F" />
              <g transform={`translate(${pK2_256.x - 220}, ${pK2_256.y - 10})`}>
                <rect x="0" y="0" width="200" height="42" fill="#FFFFFF" stroke="#D9534F" strokeWidth="2" rx="4" />
                <text x="100" y="26" fill="#D9534F" fontSize="16" fontWeight="800" textAnchor="middle">
                  k² = 65,536 ops
                </text>
              </g>

              {/* End Point Dot: O(k log k) */}
              <circle cx={pKLogK_256.x} cy={pKLogK_256.y} r="8" fill="#147D78" />
              <g transform={`translate(${pKLogK_256.x - 240}, ${pKLogK_256.y - 48})`}>
                <rect x="0" y="0" width="220" height="44" fill="#FFFFFF" stroke="#147D78" strokeWidth="2.5" rx="4" />
                <text x="110" y="28" fill="#147D78" fontSize="16" fontWeight="800" textAnchor="middle">
                  k log₂ k = 2,048 ops
                </text>
              </g>

              {/* Comparison Callout Bracket */}
              {currentStep >= 1 && (
                <g style={{ animation: 'fadeIn 0.5s ease both' }}>
                  <line
                    x1={pK2_256.x + 20}
                    y1={pK2_256.y}
                    x2={pK2_256.x + 20}
                    y2={pKLogK_256.y}
                    stroke="#147D78"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                  />
                  <line x1={pK2_256.x + 12} y1={pK2_256.y} x2={pK2_256.x + 28} y2={pK2_256.y} stroke="#147D78" strokeWidth="2.5" />
                  <line x1={pK2_256.x + 12} y1={pKLogK_256.y} x2={pK2_256.x + 28} y2={pKLogK_256.y} stroke="#147D78" strokeWidth="2.5" />
                  <rect
                    x={pK2_256.x + 36}
                    y={(pK2_256.y + pKLogK_256.y) / 2 - 32}
                    width="110"
                    height="64"
                    fill="#147D78"
                    rx="6"
                  />
                  <text
                    x={pK2_256.x + 91}
                    y={(pK2_256.y + pKLogK_256.y) / 2 - 8}
                    fill="#FFFFFF"
                    fontSize="18"
                    fontWeight="800"
                    textAnchor="middle"
                  >
                    32&times;
                  </text>
                  <text
                    x={pK2_256.x + 91}
                    y={(pK2_256.y + pKLogK_256.y) / 2 + 16}
                    fill="#E0F2F1"
                    fontSize="13"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    FASTER
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Required Bottom Statement */}
        <div
          style={{
            borderLeft: '6px solid #147D78',
            backgroundColor: '#F4FAF9',
            padding: '20px 28px',
            fontSize: '28px',
            color: '#202124',
            fontWeight: 700,
            marginTop: '20px',
          }}
        >
          A priority queue reduces Huffman tree construction from O(k²) to O(k log k).
        </div>
      </div>
    </SlideLayout>
  );
};
