import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide12ComplexityGraphProps {
  step?: number;
}

export const Slide12ComplexityGraph: React.FC<Slide12ComplexityGraphProps> = ({ step = 0 }) => {
  const currentStep = Math.min(1, Math.max(0, step));

  // Graph geometry inside 1360 x 490 viewBox
  const xMin = 16;
  const xMax = 256;
  const yMax = 65536;

  const toX = (k: number) => 120 + ((k - xMin) / (xMax - xMin)) * 1020;
  const toY = (ops: number) => 430 - (ops / yMax) * 375;

  const pointsK2: string[] = [];
  const pointsKLogK: string[] = [];

  for (let k = 16; k <= 256; k += 4) {
    const x = toX(k);
    const yK2 = toY(k * k);
    const yKLogK = toY(k * Math.log2(k));
    pointsK2.push(`${x.toFixed(1)},${yK2.toFixed(1)}`);
    pointsKLogK.push(`${x.toFixed(1)},${yKLogK.toFixed(1)}`);
  }

  const pK2_256 = { x: toX(256), y: toY(65536) };
  const pKLogK_256 = { x: toX(256), y: toY(256 * 8) };

  // Shaded area polygon between the two curves
  const gapPolygon = [
    ...pointsK2,
    ...pointsKLogK.slice().reverse(),
  ].join(' ');

  return (
    <SlideLayout
      slideNumber={12}
      totalSlides={14}
      title="Why Use a Priority Queue?"
      subtitle="Min-Heap O(k log k) vs. Naive Repeated Array Scan O(k²)"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Main Graph Card (~78% of slide) */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            border: '2px solid #202124',
            boxShadow: '8px 8px 0px rgba(0,0,0,0.06)',
            padding: '20px 32px 12px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Top Legend Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '12px',
              borderBottom: '1px solid #ECECEC',
            }}
          >
            <div style={{ fontSize: '21px', fontWeight: 800, color: '#202124' }}>
              Tree Construction Operations vs. Alphabet Size (<span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>k</span>)
            </div>
            <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '4px', backgroundColor: '#D9534F', borderRadius: '2px' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#D9534F' }}>
                  Unsorted Array Scan: O(k²)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '5px', backgroundColor: '#147D78', borderRadius: '2px' }} />
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#147D78' }}>
                  Min-Heap Priority Queue: O(k log k)
                </span>
              </div>
            </div>
          </div>

          {/* Animated SVG Graph */}
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 1360 490" style={{ width: '100%', height: '100%', maxHeight: '470px', overflow: 'visible' }}>
              {/* Horizontal Gridlines */}
              {[0, 16384, 32768, 49152, 65536].map((val) => {
                const y = toY(val);
                return (
                  <g key={val}>
                    <line
                      x1={120}
                      y1={y}
                      x2={1140}
                      y2={y}
                      stroke="#E8E8E8"
                      strokeWidth="1.5"
                      strokeDasharray="5 5"
                    />
                    <text
                      x={106}
                      y={y + 5}
                      fill="#666666"
                      fontSize="15"
                      fontWeight="600"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {val.toLocaleString()}
                    </text>
                  </g>
                );
              })}

              {/* Vertical Gridlines */}
              {[16, 64, 128, 192, 256].map((kVal) => {
                const x = toX(kVal);
                return (
                  <g key={kVal}>
                    <line
                      x1={x}
                      y1={45}
                      x2={x}
                      y2={430}
                      stroke="#E8E8E8"
                      strokeWidth="1.5"
                      strokeDasharray="5 5"
                    />
                    <text
                      x={x}
                      y={455}
                      fill="#202124"
                      fontSize="16"
                      fontWeight="700"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      k = {kVal}
                    </text>
                  </g>
                );
              })}

              {/* Shaded Savings Area (Revealed at Step 1) */}
              <polygon
                points={gapPolygon}
                fill="rgba(20, 125, 120, 0.08)"
                style={{
                  opacity: currentStep >= 1 ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              />

              {/* Axes */}
              <line x1={120} y1={430} x2={1160} y2={430} stroke="#202124" strokeWidth="2.5" />
              <line x1={120} y1={430} x2={120} y2={35} stroke="#202124" strokeWidth="2.5" />

              {/* Axis Titles */}
              <text x={630} y={484} fill="#202124" fontSize="18" fontWeight="700" textAnchor="middle">
                Unique Byte Symbols in Image (k &le; 256) &rarr;
              </text>
              <text
                x={-235}
                y={28}
                fill="#202124"
                fontSize="18"
                fontWeight="700"
                textAnchor="middle"
                transform="rotate(-90)"
              >
                Total Comparisons &rarr;
              </text>

              {/* Animated O(k^2) Curve */}
              <polyline
                fill="none"
                stroke="#D9534F"
                strokeWidth="4"
                strokeLinecap="round"
                points={pointsK2.join(' ')}
                strokeDasharray="1600"
                strokeDashoffset="0"
                style={{
                  animation: 'drawCurve 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
                }}
              />

              {/* Animated O(k log k) Curve */}
              <polyline
                fill="none"
                stroke="#147D78"
                strokeWidth="5"
                strokeLinecap="round"
                points={pointsKLogK.join(' ')}
                strokeDasharray="1600"
                strokeDashoffset="0"
                style={{
                  animation: 'drawCurve 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both',
                }}
              />

              {/* Endpoint Badge: O(k^2) */}
              <g style={{ animation: 'fadeIn 0.5s ease 0.85s both' }}>
                <circle cx={pK2_256.x} cy={pK2_256.y} r="8" fill="#D9534F" />
                <rect
                  x={pK2_256.x - 210}
                  y={pK2_256.y - 10}
                  width="192"
                  height="42"
                  fill="#FFFFFF"
                  stroke="#D9534F"
                  strokeWidth="2.5"
                  rx="4"
                />
                <text
                  x={pK2_256.x - 114}
                  y={pK2_256.y + 16}
                  fill="#D9534F"
                  fontSize="16"
                  fontWeight="800"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  65,536 ops
                </text>
              </g>

              {/* Endpoint Badge: O(k log k) */}
              <g style={{ animation: 'fadeIn 0.5s ease 0.95s both' }}>
                <circle cx={pKLogK_256.x} cy={pKLogK_256.y} r="8" fill="#147D78" />
                <rect
                  x={pKLogK_256.x - 210}
                  y={pKLogK_256.y - 52}
                  width="192"
                  height="42"
                  fill="#FFFFFF"
                  stroke="#147D78"
                  strokeWidth="2.5"
                  rx="4"
                />
                <text
                  x={pKLogK_256.x - 114}
                  y={pKLogK_256.y - 26}
                  fill="#147D78"
                  fontSize="16"
                  fontWeight="800"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  2,048 ops
                </text>
              </g>

              {/* Step 1 Callout: 32x Faster Gap Bracket on the Right */}
              <g
                style={{
                  opacity: currentStep >= 1 ? 1 : 0,
                  transform: currentStep >= 1 ? 'translateX(0)' : 'translateX(-12px)',
                  transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <line
                  x1={pK2_256.x + 24}
                  y1={pK2_256.y}
                  x2={pK2_256.x + 24}
                  y2={pKLogK_256.y}
                  stroke="#147D78"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />
                <line
                  x1={pK2_256.x + 14}
                  y1={pK2_256.y}
                  x2={pK2_256.x + 34}
                  y2={pK2_256.y}
                  stroke="#147D78"
                  strokeWidth="3"
                />
                <line
                  x1={pK2_256.x + 14}
                  y1={pKLogK_256.y}
                  x2={pK2_256.x + 34}
                  y2={pKLogK_256.y}
                  stroke="#147D78"
                  strokeWidth="3"
                />

                <rect
                  x={pK2_256.x + 44}
                  y={(pK2_256.y + pKLogK_256.y) / 2 - 44}
                  width="156"
                  height="88"
                  fill="#147D78"
                  rx="6"
                />
                <text
                  x={pK2_256.x + 122}
                  y={(pK2_256.y + pKLogK_256.y) / 2 - 8}
                  fill="#FFFFFF"
                  fontSize="30"
                  fontWeight="800"
                  textAnchor="middle"
                >
                  32&times;
                </text>
                <text
                  x={pK2_256.x + 122}
                  y={(pK2_256.y + pKLogK_256.y) / 2 + 22}
                  fill="#E0F2F1"
                  fontSize="15"
                  fontWeight="800"
                  letterSpacing="0.08em"
                  textAnchor="middle"
                >
                  FEWER OPS
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Bottom Statement */}
        <div
          style={{
            borderLeft: '6px solid #147D78',
            backgroundColor: '#F4FAF9',
            padding: '18px 28px',
            fontSize: '26px',
            color: '#202124',
            fontWeight: 700,
          }}
        >
          A priority queue reduces Huffman tree construction from O(k²) to O(k log k).
        </div>
      </div>
    </SlideLayout>
  );
};
