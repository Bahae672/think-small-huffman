import React from 'react';
import { SlideLayout } from '../SlideLayout';

export const Slide09Complexity: React.FC = () => {
  // Generate points for SVG graph: k from 16 to 256
  // Range of k: 16 to 256
  // Range of ops:
  // k * log2(k): 256 * 8 = 2048
  // k^2: 256^2 = 65536
  // To show both clearly on an academic scale, we use a normalized 2D plot with labeled tick marks.
  // Graph viewBox: 0 0 540 360
  // Plot area: x: 70..500 (width 430), y: 30..300 (height 270)
  const xMin = 16;
  const xMax = 256;
  const yMax = 65536;

  const pointsK2: string[] = [];
  const pointsKLogK: string[] = [];

  for (let k = 16; k <= 256; k += 8) {
    const x = 70 + ((k - xMin) / (xMax - xMin)) * 430;

    // k^2 curve
    const yValK2 = k * k;
    const yK2 = 300 - (yValK2 / yMax) * 270;
    pointsK2.push(`${x.toFixed(1)},${yK2.toFixed(1)}`);

    // k log2 k curve
    const yValKLogK = k * Math.log2(k);
    const yKLogK = 300 - (yValKLogK / yMax) * 270;
    pointsKLogK.push(`${x.toFixed(1)},${yKLogK.toFixed(1)}`);
  }

  return (
    <SlideLayout
      slideNumber={9}
      title="Computational Complexity"
      subtitle="Asymptotic Analysis &amp; Data Structure Comparison"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: '52px',
          height: '100%',
        }}
      >
        {/* Left Column: Asymptotic Bounds Table & Derivation */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '15px', color: '#555555', marginBottom: '14px', lineHeight: 1.5 }}>
              Let <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>N</span> denote the total input raster symbols (bytes), and let <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>k</span> denote the number of distinct symbols in the alphabet (<span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>k</span> &le; 256 for byte data).
            </div>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '17px',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '2px solid #202124', backgroundColor: '#FAFAFA' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 600 }}>Algorithmic Stage</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>Time Complexity</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #ECECEC' }}>
                  <td style={{ padding: '10px 14px' }}>Frequency counting</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 600 }}>
                    O(N)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ECECEC' }}>
                  <td style={{ padding: '10px 14px' }}>Priority queue initialization (Build-Heap)</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 600 }}>
                    O(k)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ECECEC', backgroundColor: '#F0F9F8' }}>
                  <td style={{ padding: '10px 14px', color: '#147D78', fontWeight: 600 }}>
                    Tree construction (Min-Heap, k &minus; 1 merges)
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: '#147D78', fontSize: '19px' }}>
                    O(k log k)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ECECEC' }}>
                  <td style={{ padding: '10px 14px' }}>Code generation (Tree traversal)</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 600 }}>
                    O(k)
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={{ fontSize: '13.5px', color: '#666666', marginTop: '12px', lineHeight: 1.5 }}>
              The priority queue performs <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>k</span> &minus; 1 iterations. Each iteration performs two <span style={{ fontVariant: 'small-caps' }}>Extract-Min</span> and one <span style={{ fontVariant: 'small-caps' }}>Insert</span> operations, each costing <span style={{ fontFamily: 'monospace' }}>O(log k)</span> time in a binary min-heap.
            </div>
          </div>

          {/* End-to-End Formulation Box */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#FAFAFA',
              border: '1px solid #E2E2E2',
              borderLeft: '4px solid #147D78',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#202124', textTransform: 'uppercase', marginBottom: '6px' }}>
              End-to-End Computational Complexity
            </div>
            <div style={{ fontSize: '16px', color: '#333333', lineHeight: 1.5 }}>
              &bull; <strong>Tree Construction:</strong> <span style={{ fontFamily: 'monospace', color: '#147D78', fontWeight: 600 }}>O(N + k log k)</span> treating per-symbol code emission as <span style={{ fontFamily: 'monospace' }}>O(1)</span> table lookup.
              <br />
              &bull; <strong>Bit-Output Model:</strong> Accounting for bit emission length explicitly yields <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>O(N + k log k + B)</span>, where <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>B</span> is the total number of encoded bits.
              <br />
              &bull; <strong>Auxiliary Space:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>O(k)</span> for the <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>2k &minus; 1</span> tree nodes and heap, excluding encoded output.
            </div>
          </div>
        </div>

        {/* Right Column: 2D Line Graph comparing O(k log k) vs O(k^2) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', color: '#202124' }}>
                Algorithmic Growth Comparison
              </div>
              <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '18px', height: '3px', backgroundColor: '#147D78' }} />
                  <strong>Min-Heap: k log₂(k)</strong>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '18px', height: '2px', backgroundColor: '#D9534F' }} />
                  <span>Unsorted Array: k²</span>
                </span>
              </div>
            </div>

            {/* SVG Plot */}
            <div style={{ width: '100%', height: '380px', marginTop: '10px' }}>
              <svg viewBox="0 0 540 330" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <style>{`
                    .grid-line { stroke: #ECECEC; stroke-width: 1; stroke-dasharray: 2,3; }
                    .axis-line { stroke: #555555; stroke-width: 1.2; }
                    .tick-text { font-family: 'Inter', sans-serif; font-size: 11px; fill: #777777; }
                    .axis-label { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; fill: #202124; }
                  `}</style>
                </defs>

                {/* Grid Lines Y */}
                {[0, 16384, 32768, 49152, 65536].map((val, idx) => {
                  const y = 290 - (idx * 260) / 4;
                  return (
                    <g key={idx}>
                      <line x1="70" y1={y} x2="510" y2={y} className="grid-line" />
                      <text x="62" y={y + 4} textAnchor="end" className="tick-text">
                        {val === 0 ? '0' : val >= 1000 ? `${val / 1024}k` : val}
                      </text>
                    </g>
                  );
                })}

                {/* Grid Lines X */}
                {[16, 64, 128, 192, 256].map((val) => {
                  const x = 70 + ((val - 16) / 240) * 440;
                  return (
                    <g key={val}>
                      <line x1={x} y1="30" x2={x} y2="290" className="grid-line" />
                      <text x={x} y="306" textAnchor="middle" className="tick-text">
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* X and Y Axes */}
                <line x1="70" y1="290" x2="510" y2="290" className="axis-line" />
                <line x1="70" y1="30" x2="70" y2="290" className="axis-line" />

                {/* Axis Labels */}
                <text x="290" y="324" textAnchor="middle" className="axis-label">
                  Distinct Alphabet Symbols (k)
                </text>
                <text x="18" y="160" textAnchor="middle" transform="rotate(-90 18 160)" className="axis-label">
                  Theoretical Operations
                </text>

                {/* Curve: k^2 (Unsorted Array) */}
                <polyline
                  fill="none"
                  stroke="#D9534F"
                  strokeWidth="2.2"
                  points={pointsK2.join(' ')}
                />

                {/* Curve: k log2 k (Min-Priority Queue) */}
                <polyline
                  fill="none"
                  stroke="#147D78"
                  strokeWidth="3.2"
                  points={pointsKLogK.join(' ')}
                />

                {/* Annotation Labels near curves */}
                <text x="440" y="55" fill="#D9534F" fontSize="12" fontWeight="600" textAnchor="end">
                  k² = 65,536 ops (k=256)
                </text>
                <text x="490" y="270" fill="#147D78" fontSize="12" fontWeight="700" textAnchor="end">
                  k log₂(k) = 2,048 ops (k=256)
                </text>
              </svg>
            </div>

            <div style={{ fontSize: '12px', color: '#777777', fontStyle: 'italic', textAlign: 'center', marginTop: '6px' }}>
              Figure 2. Theoretical growth of alternative tree-construction implementations.
              <br />
              <span style={{ fontSize: '11px', color: '#999999' }}>
                Note: This graph represents theoretical algorithmic operations, not experimentally measured execution wall-clock time.
              </span>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
