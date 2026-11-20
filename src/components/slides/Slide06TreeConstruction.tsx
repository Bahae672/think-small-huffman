import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide06TreeConstructionProps {
  step?: number;
}

export const Slide06TreeConstruction: React.FC<Slide06TreeConstructionProps> = ({ step = 0 }) => {
  // Clamp step between 0 and 6
  const currentStep = Math.min(6, Math.max(0, step));

  const mergeDescriptions = [
    { title: 'STEP 0 — Initial Frequency Queue', desc: 'Six independent symbol nodes: A(45), B(13), C(12), D(16), E(9), F(5). No tree connections exist yet.' },
    { title: 'STEP 1 — Combine Lowest Two', desc: 'Extract minimum frequencies F(5) and E(9) &rarr; Combine into parent node 14.' },
    { title: 'STEP 2 — Next Lowest Two', desc: 'Extract C(12) and B(13) &rarr; Combine into parent node 25.' },
    { title: 'STEP 3 — Merge Subtree & Leaf', desc: 'Extract node 14 and symbol D(16) &rarr; Combine into parent node 30.' },
    { title: 'STEP 4 — Merge Subtrees', desc: 'Extract subtrees 25 and 30 &rarr; Combine into parent node 55.' },
    { title: 'STEP 5 — Final Merge to Root', desc: 'Extract symbol A(45) and subtree 55 &rarr; Combine into root node 100.' },
    { title: 'FINAL RESULT — Optimal Prefix Codes', desc: 'Follow root-to-leaf paths (Left = 0, Right = 1) to derive prefix-free binary codes.' },
  ];

  const codeTable = [
    { sym: 'A', freq: 45, code: '0', len: 1, bits: 45 },
    { sym: 'B', freq: 13, code: '101', len: 3, bits: 39 },
    { sym: 'C', freq: 12, code: '100', len: 3, bits: 36 },
    { sym: 'D', freq: 16, code: '111', len: 3, bits: 48 },
    { sym: 'E', freq: 9, code: '1101', len: 4, bits: 36 },
    { sym: 'F', freq: 5, code: '1100', len: 4, bits: 20 },
  ];

  return (
    <SlideLayout
      slideNumber={6}
      title="Constructing the Huffman Tree"
      subtitle="Step-by-Step Priority Queue Merges (6-Symbol Alphabet)"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: currentStep >= 6 ? '1.25fr 0.75fr' : '1fr',
          gap: '40px',
          height: '100%',
        }}
      >
        {/* Left Column: Visual Tree Construction */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Step Banner */}
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: '#F8F9FA',
              borderLeft: '6px solid #147D78',
              fontSize: '24px',
              color: '#202124',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong style={{ color: '#147D78' }}>{mergeDescriptions[currentStep].title}</strong>: {mergeDescriptions[currentStep].desc}
            </div>
            <div style={{ fontSize: '20px', color: '#777777', fontWeight: 600, fontFamily: 'monospace' }}>
              Step {currentStep} of 6
            </div>
          </div>

          {/* SVG Tree Diagram */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              border: '2px solid #EBEBEB',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '16px',
            }}
          >
            <svg viewBox="0 0 900 560" style={{ width: '100%', height: '100%' }}>
              <defs>
                <style>{`
                  .tree-branch { stroke: #202124; stroke-width: 2.5; }
                  .tree-branch-active { stroke: #147D78; stroke-width: 4; }
                  .node-circle { fill: #FFFFFF; stroke: #202124; stroke-width: 2.5; }
                  .node-active { fill: #E6F4F3; stroke: #147D78; stroke-width: 3.5; }
                  .node-leaf { fill: #FAFAFA; stroke: #202124; stroke-width: 2.5; }
                  .node-text-sym { font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 700; text-anchor: middle; dominant-baseline: central; fill: #202124; }
                  .node-text-freq { font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 600; text-anchor: middle; dominant-baseline: central; fill: #555555; }
                  .edge-text { font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 800; fill: #147D78; text-anchor: middle; }
                `}</style>
              </defs>

              {/* Coordinates:
                  In STEP 0: All 6 nodes lined up horizontally at y=480:
                  A: 100, B: 240, C: 380, D: 520, E: 660, F: 800

                  In Tree coordinates (STEP 1..5):
                  Root 100: (450, 60)
                  A(45): (180, 160)
                  Node 55: (660, 160)
                  Node 25: (530, 270)
                  Node 30: (780, 270)
                  C(12): (460, 390)
                  B(13): (600, 390)
                  Node 14: (710, 390)
                  D(16): (840, 390)
                  F(5): (650, 500)
                  E(9): (770, 500)
              */}

              {currentStep === 0 ? (
                /* STEP 0: 6 independent disconnected nodes */
                <g>
                  {[
                    { sym: 'A', freq: 45, x: 120, y: 280 },
                    { sym: 'B', freq: 13, x: 270, y: 280 },
                    { sym: 'C', freq: 12, x: 420, y: 280 },
                    { sym: 'D', freq: 16, x: 570, y: 280 },
                    { sym: 'E', freq: 9, x: 720, y: 280 },
                    { sym: 'F', freq: 5, x: 840, y: 280 },
                  ].map((node) => (
                    <g key={node.sym}>
                      <circle cx={node.x} cy={node.y} r="38" className="node-leaf" />
                      <text x={node.x} y={node.y - 10} className="node-text-sym" style={{ fontSize: '24px' }}>
                        {node.sym}
                      </text>
                      <text x={node.x} y={node.y + 14} className="node-text-freq" style={{ fontSize: '20px' }}>
                        {node.freq}
                      </text>
                    </g>
                  ))}
                  <text x="450" y="160" textAnchor="middle" style={{ fontFamily: 'Inter', fontSize: '28px', fill: '#777777', fontWeight: 600 }}>
                    Priority Queue Q = &#123; F(5), E(9), C(12), B(13), D(16), A(45) &#125;
                  </text>
                  <text x="450" y="380" textAnchor="middle" style={{ fontFamily: 'Inter', fontSize: '24px', fill: '#147D78', fontStyle: 'italic' }}>
                    Press Space or Right Arrow to execute the first greedy merge: F(5) + E(9)
                  </text>
                </g>
              ) : (
                /* STEPS 1..6: Progressively reveal branches and nodes */
                <g>
                  {/* Leaf F(5) */}
                  <circle cx="650" cy="500" r="30" className={currentStep === 1 ? 'node-active' : 'node-leaf'} />
                  <text x="650" y="492" className="node-text-sym">F</text>
                  <text x="650" y="512" className="node-text-freq">5</text>

                  {/* Leaf E(9) */}
                  <circle cx="770" cy="500" r="30" className={currentStep === 1 ? 'node-active' : 'node-leaf'} />
                  <text x="770" y="492" className="node-text-sym">E</text>
                  <text x="770" y="512" className="node-text-freq">9</text>

                  {/* Leaf C(12) */}
                  <circle cx="460" cy="390" r="30" className={currentStep === 2 ? 'node-active' : 'node-leaf'} />
                  <text x="460" y="382" className="node-text-sym">C</text>
                  <text x="460" y="402" className="node-text-freq">12</text>

                  {/* Leaf B(13) */}
                  <circle cx="600" cy="390" r="30" className={currentStep === 2 ? 'node-active' : 'node-leaf'} />
                  <text x="600" y="382" className="node-text-sym">B</text>
                  <text x="600" y="402" className="node-text-freq">13</text>

                  {/* Leaf D(16) */}
                  <circle cx="840" cy="390" r="30" className={currentStep === 3 ? 'node-active' : 'node-leaf'} />
                  <text x="840" y="382" className="node-text-sym">D</text>
                  <text x="840" y="402" className="node-text-freq">16</text>

                  {/* Leaf A(45) */}
                  <circle cx="180" cy="160" r="36" className={currentStep === 5 ? 'node-active' : 'node-leaf'} />
                  <text x="180" y="150" className="node-text-sym" style={{ fontSize: '24px' }}>A</text>
                  <text x="180" y="172" className="node-text-freq" style={{ fontSize: '20px' }}>45</text>

                  {/* STEP 1: F(5) + E(9) -> 14 */}
                  {currentStep >= 1 && (
                    <g>
                      <line x1="710" y1="390" x2="650" y2="500" className={currentStep === 1 ? 'tree-branch-active' : 'tree-branch'} />
                      <text x="668" y="445" className="edge-text">0</text>
                      <line x1="710" y1="390" x2="770" y2="500" className={currentStep === 1 ? 'tree-branch-active' : 'tree-branch'} />
                      <text x="752" y="445" className="edge-text">1</text>
                      <circle cx="710" cy="390" r="30" className={currentStep === 1 ? 'node-active' : 'node-circle'} />
                      <text x="710" y="390" className="node-text-sym">14</text>
                    </g>
                  )}

                  {/* STEP 2: C(12) + B(13) -> 25 */}
                  {currentStep >= 2 && (
                    <g>
                      <line x1="530" y1="270" x2="460" y2="390" className={currentStep === 2 ? 'tree-branch-active' : 'tree-branch'} />
                      <text x="480" y="330" className="edge-text">0</text>
                      <line x1="530" y1="270" x2="600" y2="390" className={currentStep === 2 ? 'tree-branch-active' : 'tree-branch'} />
                      <text x="580" y="330" className="edge-text">1</text>
                      <circle cx="530" cy="270" r="32" className={currentStep === 2 ? 'node-active' : 'node-circle'} />
                      <text x="530" y="270" className="node-text-sym">25</text>
                    </g>
                  )}

                  {/* STEP 3: Node 14 + D(16) -> 30 */}
                  {currentStep >= 3 && (
                    <g>
                      <line x1="780" y1="270" x2="710" y2="390" className={currentStep === 3 ? 'tree-branch-active' : 'tree-branch'} />
                      <text x="732" y="330" className="edge-text">0</text>
                      <line x1="780" y1="270" x2="840" y2="390" className={currentStep === 3 ? 'tree-branch-active' : 'tree-branch'} />
                      <text x="825" y="330" className="edge-text">1</text>
                      <circle cx="780" cy="270" r="32" className={currentStep === 3 ? 'node-active' : 'node-circle'} />
                      <text x="780" y="270" className="node-text-sym">30</text>
                    </g>
                  )}

                  {/* STEP 4: Node 25 + Node 30 -> 55 */}
                  {currentStep >= 4 && (
                    <g>
                      <line x1="660" y1="160" x2="530" y2="270" className={currentStep === 4 ? 'tree-branch-active' : 'tree-branch'} />
                      <text x="580" y="210" className="edge-text">0</text>
                      <line x1="660" y1="160" x2="780" y2="270" className={currentStep === 4 ? 'tree-branch-active' : 'tree-branch'} />
                      <text x="735" y="210" className="edge-text">1</text>
                      <circle cx="660" cy="160" r="36" className={currentStep === 4 ? 'node-active' : 'node-circle'} />
                      <text x="660" y="160" className="node-text-sym" style={{ fontSize: '24px' }}>55</text>
                    </g>
                  )}

                  {/* STEP 5: A(45) + Node 55 -> 100 (Root) */}
                  {currentStep >= 5 && (
                    <g>
                      <line x1="450" y1="60" x2="180" y2="160" className={currentStep === 5 ? 'tree-branch-active' : 'tree-branch'} />
                      <text x="300" y="100" className="edge-text" style={{ fontSize: '26px' }}>0</text>
                      <line x1="450" y1="60" x2="660" y2="160" className={currentStep === 5 ? 'tree-branch-active' : 'tree-branch'} />
                      <text x="570" y="100" className="edge-text" style={{ fontSize: '26px' }}>1</text>
                      <circle cx="450" cy="60" r="40" className={currentStep === 5 ? 'node-active' : 'node-circle'} />
                      <text x="450" y="60" className="node-text-sym" style={{ fontSize: '26px', fontWeight: 800 }}>100</text>
                    </g>
                  )}
                </g>
              )}
            </svg>
          </div>

          <div style={{ fontSize: '22px', color: '#666666', fontStyle: 'italic', textAlign: 'center', marginTop: '12px' }}>
            Figure 1. Chronological Huffman tree construction from six independent frequency nodes.
          </div>
        </div>

        {/* Right Column: Code Table (Revealed at Step 6) */}
        {currentStep >= 6 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              animation: 'fadeIn 0.5s ease',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#202124',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '16px',
                }}
              >
                Resulting Prefix-Free Codes
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
                    <th style={{ padding: '12px 14px', fontWeight: 700 }}>Symbol</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700 }}>Freq</th>
                    <th style={{ padding: '12px 14px', fontWeight: 700, color: '#147D78' }}>Code</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700 }}>Bits</th>
                  </tr>
                </thead>
                <tbody>
                  {codeTable.map((item, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid #ECECEC',
                        backgroundColor: idx === 0 ? '#F9FCFC' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '12px 14px', fontWeight: 700 }}>{item.sym}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'monospace' }}>
                        {item.freq}
                      </td>
                      <td
                        style={{
                          padding: '12px 14px',
                          fontFamily: 'monospace',
                          fontWeight: 800,
                          color: '#147D78',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {item.code}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'monospace', color: '#666' }}>
                        {item.bits}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              style={{
                padding: '24px',
                backgroundColor: '#FAFAFA',
                border: '2px solid #E2E2E2',
                borderLeft: '6px solid #147D78',
                marginTop: '20px',
              }}
            >
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#202124', marginBottom: '8px' }}>
                Key Structural Insights:
              </div>
              <ul style={{ paddingLeft: '28px', fontSize: '20px', color: '#444444', lineHeight: 1.6 }}>
                <li><strong>Prefix-Free:</strong> No codeword forms the prefix of another.</li>
                <li><strong>Frequency Inversion:</strong> Frequent A receives a 1-bit code ('0'); rare F receives 4 bits ('1100').</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </SlideLayout>
  );
};
