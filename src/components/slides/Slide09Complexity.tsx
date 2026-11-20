import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide09ComplexityProps {
  step?: number;
}

export const Slide09Complexity: React.FC<Slide09ComplexityProps> = ({ step = 0 }) => {
  // Generate points for SVG graph: k from 16 to 256
  // Range of k: 16 to 256
  // Max ops: 256^2 = 65,536
  // Graph viewBox: 0 0 720 500
  // Plot area: x: 90..680 (width 590), y: 40..420 (height 380)
  const xMin = 16;
  const xMax = 256;
  const yMax = 65536;

  const pointsK2: string[] = [];
  const pointsKLogK: string[] = [];

  for (let k = 16; k <= 256; k += 8) {
    const x = 90 + ((k - xMin) / (xMax - xMin)) * 580;

    // k^2 curve
    const yValK2 = k * k;
    const yK2 = 420 - (yValK2 / yMax) * 370;
    pointsK2.push(`${x.toFixed(1)},${yK2.toFixed(1)}`);

    // k log2 k curve
    const yValKLogK = k * Math.log2(k);
    const yKLogK = 420 - (yValKLogK / yMax) * 370;
    pointsKLogK.push(`${x.toFixed(1)},${yKLogK.toFixed(1)}`);
  }

  return (
    <SlideLayout
      slideNumber={9}
      title="Computational Complexity"
      subtitle="Asymptotic Analysis &amp; Data Structure Performance"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.35fr 0.65fr',
          gap: '50px',
          height: '100%',
        }}
      >
        {/* Left Column (35%): Complexity Analysis Table */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '24px', color: '#555555', marginBottom: '18px', lineHeight: 1.45 }}>
              Let <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>N</span> = input raster symbols, and <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>k</span> = distinct symbols (<span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>k &le; 256</span> for byte data).
            </div>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '24px',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '3px solid #202124', backgroundColor: '#FAFAFA' }}>
                  <th style={{ padding: '12px 14px', fontWeight: 700 }}>Operation</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700 }}>Complexity</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #ECECEC' }}>
                  <td style={{ padding: '12px 14px' }}>Frequency counting</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 600 }}>
                    O(N)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ECECEC' }}>
                  <td style={{ padding: '12px 14px' }}>Priority queue init</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 600 }}>
                    O(k)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ECECEC', backgroundColor: '#EBF7F6' }}>
                  <td style={{ padding: '12px 14px', color: '#147D78', fontWeight: 700 }}>
                    Tree construction
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 800, color: '#147D78', fontSize: '26px' }}>
                    O(k log k)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ECECEC' }}>
                  <td style={{ padding: '12px 14px' }}>Code generation</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 600 }}>
                    O(k)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* End-to-End Formulation Box */}
          <div
            style={{
              padding: '22px 24px',
              backgroundColor: '#FAFAFA',
              border: '2px solid #E2E2E2',
              borderLeft: '6px solid #147D78',
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#147D78', textTransform: 'uppercase', marginBottom: '8px' }}>
              End-to-End Bounds
            </div>
            <div style={{ fontSize: '24px', color: '#202124', lineHeight: 1.5 }}>
              Total Time: <strong style={{ fontFamily: 'monospace', color: '#147D78' }}>O(N + k log k)</strong>
              <br />
              Auxiliary Space: <strong style={{ fontFamily: 'monospace' }}>O(k)</strong> for the priority queue and tree nodes.
            </div>
          </div>
        </div>

        {/* Right Column (65%): Large, Highly Engaging Graph */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            border: '2px solid #E0E0E0',
            padding: '24px 30px',
          }}
        >
          {/* Graph Header & Large Legends */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, textTransform: 'uppercase', color: '#202124' }}>
              Theoretical Tree Construction Growth
            </div>
            <div style={{ display: 'flex', gap: '32px', fontSize: '22px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '28px', height: '5px', backgroundColor: '#147D78' }} />
                <strong style={{ color: '#147D78' }}>Priority Queue: O(k log k)</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '28px', height: '4px', backgroundColor: '#D9534F' }} />
                <strong style={{ color: '#D9534F' }}>Repeated Scan: O(k²)</strong>
              </span>
            </div>
          </div>

          {/* Large SVG Plot */}
          <div style={{ width: '100%', height: '440px', marginTop: '12px' }}>
            <svg viewBox="0 0 720 480" style={{ width: '100%', height: '100%' }}>
              <defs>
                <style>{`
                  .grid-line { stroke: #F0F0F0; stroke-width: 1.5; stroke-dasharray: 4,4; }
                  .axis-line { stroke: #202124; stroke-width: 2.5; }
                  .tick-text { font-family: 'Inter', sans-serif; font-size: 18px; fill: #666666; font-weight: 500; }
                  .axis-label { font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 700; fill: #202124; }
                `}</style>
              </defs>

              {/* Grid Lines Y */}
              {[0, 16384, 32768, 49152, 65536].map((val, idx) => {
                const y = 420 - (idx * 370) / 4;
                return (
                  <g key={idx}>
                    <line x1="90" y1={y} x2="680" y2={y} className="grid-line" />
                    <text x="80" y={y + 6} textAnchor="end" className="tick-text">
                      {val === 0 ? '0' : `${Math.round(val / 1024)}k`}
                    </text>
                  </g>
                );
              })}

              {/* Grid Lines X */}
              {[16, 64, 128, 192, 256].map((val) => {
                const x = 90 + ((val - 16) / 240) * 580;
                return (
                  <g key={val}>
                    <line x1={x} y1="50" x2={x} y2="420" className="grid-line" />
                    <text x={x} y="446" textAnchor="middle" className="tick-text">
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* X and Y Axes */}
              <line x1="90" y1="420" x2="680" y2="420" className="axis-line" />
              <line x1="90" y1="50" x2="90" y2="420" className="axis-line" />

              {/* Axis Labels */}
              <text x="385" y="475" textAnchor="middle" className="axis-label">
                Distinct Alphabet Symbols (k)
              </text>
              <text x="24" y="235" textAnchor="middle" transform="rotate(-90 24 235)" className="axis-label">
                Theoretical Operations
              </text>

              {/* Step 1: Min-Priority Queue Curve O(k log k) in Dark Teal */}
              {step >= 1 && (
                <g>
                  <polyline
                    fill="none"
                    stroke="#147D78"
                    strokeWidth="5"
                    points={pointsKLogK.join(' ')}
                  />
                  <circle cx="670" cy="408" r="7" fill="#147D78" />
                  <text x="660" y="390" fill="#147D78" fontSize="20" fontWeight="800" textAnchor="end">
                    k log₂(k) = 2,048 ops (k=256)
                  </text>
                </g>
              )}

              {/* Step 2: Repeated Scan Curve O(k^2) in Crimson + Callout */}
              {step >= 2 && (
                <g>
                  <polyline
                    fill="none"
                    stroke="#D9534F"
                    strokeWidth="4"
                    points={pointsK2.join(' ')}
                  />
                  <circle cx="670" cy="50" r="7" fill="#D9534F" />
                  <text x="650" y="70" fill="#D9534F" fontSize="22" fontWeight="800" textAnchor="end">
                    k² = 65,536 ops (k=256)
                  </text>

                  {/* Asymptotic Gain Bracket / Highlight */}
                  <rect x="420" y="160" width="240" height="90" fill="#FFFFFF" stroke="#147D78" strokeWidth="2" rx="4" />
                  <text x="540" y="195" textAnchor="middle" fill="#147D78" fontSize="20" fontWeight="800">
                    32&times; Fewer Operations
                  </text>
                  <text x="540" y="225" textAnchor="middle" fill="#555555" fontSize="16">
                    Heap vs. Repeated Scanning
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div style={{ fontSize: '20px', color: '#777777', fontStyle: 'italic', textAlign: 'center', marginTop: '8px' }}>
            Figure 2. Theoretical operation growth: Min-heap O(k log k) versus array scanning O(k²). Not empirical wall-clock measurements.
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
