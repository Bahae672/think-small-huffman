import React, { useState } from 'react';
import { SlideLayout } from '../SlideLayout';

export const Slide06TreeConstruction: React.FC = () => {
  const [mergeStep, setMergeStep] = useState<number>(5); // 0 = initial leaves, 1..5 merges

  const mergeDescriptions = [
    { title: 'Initial Priority Queue', desc: 'Six distinct leaf symbols keyed by frequency: A(45), B(13), C(12), D(16), E(9), F(5).' },
    { title: 'Merge 1: F(5) + E(9) = 14', desc: 'Lowest frequencies F(5) and E(9) are extracted and combined into internal node (14).' },
    { title: 'Merge 2: C(12) + B(13) = 25', desc: 'Next lowest are C(12) and B(13), forming composite node (25).' },
    { title: 'Merge 3: Node(14) + D(16) = 30', desc: 'Lowest remaining in Q are internal node (14) and symbol D(16), combining to form node (30).' },
    { title: 'Merge 4: Node(25) + Node(30) = 55', desc: 'Subtrees (25) and (30) fuse into composite internal node (55).' },
    { title: 'Merge 5 (Final): A(45) + Node(55) = 100', desc: 'Symbol A(45) and subtree (55) merge into root node (100). Tree complete.' },
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
          gridTemplateColumns: '1.4fr 0.8fr',
          gap: '40px',
          height: '100%',
        }}
      >
        {/* Left Column: Visual Tree Construction with Interactive Stepper */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Stepper Controls */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              backgroundColor: '#FAFAFA',
              border: '1px solid #E5E5E5',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#202124' }}>
                Merge Progression:
              </span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#147D78',
                  padding: '2px 8px',
                  backgroundColor: '#E6F4F3',
                }}
              >
                Step {mergeStep} of 5
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMergeStep((s) => Math.max(0, s - 1));
                }}
                disabled={mergeStep === 0}
                style={{
                  padding: '5px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: mergeStep === 0 ? 'not-allowed' : 'pointer',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CCCCCC',
                  color: mergeStep === 0 ? '#BBBBBB' : '#202124',
                }}
              >
                ← Previous Merge
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMergeStep((s) => Math.min(5, s + 1));
                }}
                disabled={mergeStep === 5}
                style={{
                  padding: '5px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: mergeStep === 5 ? 'not-allowed' : 'pointer',
                  backgroundColor: mergeStep === 5 ? '#FFFFFF' : '#147D78',
                  border: '1px solid #147D78',
                  color: mergeStep === 5 ? '#BBBBBB' : '#FFFFFF',
                }}
              >
                Next Merge →
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMergeStep(5);
                }}
                style={{
                  padding: '5px 12px',
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CCCCCC',
                  cursor: 'pointer',
                }}
              >
                Show Complete Tree
              </button>
            </div>
          </div>

          {/* Merge Step Banner */}
          <div
            style={{
              padding: '10px 16px',
              backgroundColor: '#F8F9FA',
              borderLeft: '4px solid #147D78',
              fontSize: '15px',
              margin: '8px 0',
            }}
          >
            <strong>{mergeDescriptions[mergeStep].title}</strong>: {mergeDescriptions[mergeStep].desc}
          </div>

          {/* SVG Tree Diagram */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              border: '1px solid #EBEBEB',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg viewBox="0 0 850 530" style={{ width: '100%', height: '100%' }}>
              <defs>
                <style>{`
                  .tree-branch { stroke: #202124; stroke-width: 1.5; }
                  .tree-branch-active { stroke: #147D78; stroke-width: 2.5; }
                  .node-circle { fill: #FFFFFF; stroke: #202124; stroke-width: 1.5; }
                  .node-active { fill: #E6F4F3; stroke: #147D78; stroke-width: 2; }
                  .node-leaf { fill: #FAFAFA; stroke: #202124; stroke-width: 1.5; }
                  .node-text { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; text-anchor: middle; dominant-baseline: central; fill: #202124; }
                  .edge-text { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; fill: #147D78; }
                `}</style>
              </defs>

              {/* Tree Coordinates:
                  Root 100: (425, 45)
                  Left: A(45): (180, 140)
                  Right: 55: (620, 140)
                  Under 55:
                    Left: 25: (500, 240)
                    Right: 30: (740, 240)
                  Under 25:
                    Left: C(12): (430, 350)
                    Right: B(13): (570, 350)
                  Under 30:
                    Left: 14: (670, 350)
                    Right: D(16): (800, 350)
                  Under 14:
                    Left: F(5): (610, 460)
                    Right: E(9): (730, 460)
              */}

              {/* Merge 1: F(5) + E(9) -> 14 */}
              {mergeStep >= 1 && (
                <g>
                  {/* Branch from 14 to F */}
                  <line x1="670" y1="350" x2="610" y2="460" className={mergeStep === 1 ? 'tree-branch-active' : 'tree-branch'} />
                  <text x="630" y="400" className="edge-text">0</text>
                  {/* Branch from 14 to E */}
                  <line x1="670" y1="350" x2="730" y2="460" className={mergeStep === 1 ? 'tree-branch-active' : 'tree-branch'} />
                  <text x="710" y="400" className="edge-text">1</text>
                  {/* Node 14 */}
                  <circle cx="670" cy="350" r="22" className={mergeStep === 1 ? 'node-active' : 'node-circle'} />
                  <text x="670" y="350" className="node-text">14</text>
                </g>
              )}

              {/* Leaf F(5) */}
              <circle cx="610" cy="460" r="22" className={mergeStep === 1 ? 'node-active' : 'node-leaf'} />
              <text x="610" y="453" className="node-text" style={{ fontSize: '13px' }}>F</text>
              <text x="610" y="469" className="node-text" style={{ fontSize: '12px', fill: '#666' }}>5</text>

              {/* Leaf E(9) */}
              <circle cx="730" cy="460" r="22" className={mergeStep === 1 ? 'node-active' : 'node-leaf'} />
              <text x="730" y="453" className="node-text" style={{ fontSize: '13px' }}>E</text>
              <text x="730" y="469" className="node-text" style={{ fontSize: '12px', fill: '#666' }}>9</text>

              {/* Leaf C(12) */}
              <circle cx="430" cy="350" r="22" className={mergeStep === 2 ? 'node-active' : 'node-leaf'} />
              <text x="430" y="343" className="node-text" style={{ fontSize: '13px' }}>C</text>
              <text x="430" y="359" className="node-text" style={{ fontSize: '12px', fill: '#666' }}>12</text>

              {/* Leaf B(13) */}
              <circle cx="570" cy="350" r="22" className={mergeStep === 2 ? 'node-active' : 'node-leaf'} />
              <text x="570" y="343" className="node-text" style={{ fontSize: '13px' }}>B</text>
              <text x="570" y="359" className="node-text" style={{ fontSize: '12px', fill: '#666' }}>13</text>

              {/* Leaf D(16) */}
              <circle cx="800" cy="350" r="22" className={mergeStep === 3 ? 'node-active' : 'node-leaf'} />
              <text x="800" y="343" className="node-text" style={{ fontSize: '13px' }}>D</text>
              <text x="800" y="359" className="node-text" style={{ fontSize: '12px', fill: '#666' }}>16</text>

              {/* Leaf A(45) */}
              <circle cx="180" cy="140" r="25" className={mergeStep === 5 ? 'node-active' : 'node-leaf'} />
              <text x="180" y="132" className="node-text" style={{ fontSize: '15px' }}>A</text>
              <text x="180" y="150" className="node-text" style={{ fontSize: '13px', fill: '#666' }}>45</text>

              {/* Merge 2: C(12) + B(13) -> 25 */}
              {mergeStep >= 2 && (
                <g>
                  <line x1="500" y1="240" x2="430" y2="350" className={mergeStep === 2 ? 'tree-branch-active' : 'tree-branch'} />
                  <text x="455" y="290" className="edge-text">0</text>
                  <line x1="500" y1="240" x2="570" y2="350" className={mergeStep === 2 ? 'tree-branch-active' : 'tree-branch'} />
                  <text x="545" y="290" className="edge-text">1</text>
                  <circle cx="500" cy="240" r="24" className={mergeStep === 2 ? 'node-active' : 'node-circle'} />
                  <text x="500" y="240" className="node-text">25</text>
                </g>
              )}

              {/* Merge 3: Node(14) + D(16) -> 30 */}
              {mergeStep >= 3 && (
                <g>
                  <line x1="740" y1="240" x2="670" y2="350" className={mergeStep === 3 ? 'tree-branch-active' : 'tree-branch'} />
                  <text x="695" y="290" className="edge-text">0</text>
                  <line x1="740" y1="240" x2="800" y2="350" className={mergeStep === 3 ? 'tree-branch-active' : 'tree-branch'} />
                  <text x="780" y="290" className="edge-text">1</text>
                  <circle cx="740" cy="240" r="24" className={mergeStep === 3 ? 'node-active' : 'node-circle'} />
                  <text x="740" y="240" className="node-text">30</text>
                </g>
              )}

              {/* Merge 4: Node(25) + Node(30) -> 55 */}
              {mergeStep >= 4 && (
                <g>
                  <line x1="620" y1="140" x2="500" y2="240" className={mergeStep === 4 ? 'tree-branch-active' : 'tree-branch'} />
                  <text x="550" y="185" className="edge-text">0</text>
                  <line x1="620" y1="140" x2="740" y2="240" className={mergeStep === 4 ? 'tree-branch-active' : 'tree-branch'} />
                  <text x="690" y="185" className="edge-text">1</text>
                  <circle cx="620" cy="140" r="26" className={mergeStep === 4 ? 'node-active' : 'node-circle'} />
                  <text x="620" y="140" className="node-text">55</text>
                </g>
              )}

              {/* Merge 5: A(45) + Node(55) -> 100 */}
              {mergeStep >= 5 && (
                <g>
                  <line x1="425" y1="45" x2="180" y2="140" className={mergeStep === 5 ? 'tree-branch-active' : 'tree-branch'} />
                  <text x="290" y="85" className="edge-text" style={{ fontSize: '16px' }}>0</text>
                  <line x1="425" y1="45" x2="620" y2="140" className={mergeStep === 5 ? 'tree-branch-active' : 'tree-branch'} />
                  <text x="535" y="85" className="edge-text" style={{ fontSize: '16px' }}>1</text>
                  <circle cx="425" cy="45" r="28" className={mergeStep === 5 ? 'node-active' : 'node-circle'} />
                  <text x="425" y="45" className="node-text" style={{ fontSize: '16px', fontWeight: 700 }}>100</text>
                </g>
              )}
            </svg>
          </div>

          <div style={{ fontSize: '13px', color: '#666666', fontStyle: 'italic', textAlign: 'center', marginTop: '6px' }}>
            Figure 1. Huffman tree constructed from six symbols. Left branches encode '0'; right branches encode '1'.
          </div>
        </div>

        {/* Right Column: Resulting Prefix-Free Code Table */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#202124',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '12px',
              }}
            >
              Resulting Variable-Length Codes
            </div>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '16px',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '2px solid #202124', backgroundColor: '#FAFAFA' }}>
                  <th style={{ padding: '8px 12px', fontWeight: 600 }}>Symbol</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600 }}>Freq</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600, color: '#147D78' }}>Code</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600 }}>Bits</th>
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
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{item.sym}</td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace' }}>
                      {item.freq}
                    </td>
                    <td
                      style={{
                        padding: '8px 12px',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: '#147D78',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {item.code}
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace', color: '#666' }}>
                      {item.bits}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Observations Box */}
          <div
            style={{
              padding: '16px',
              backgroundColor: '#FAFAFA',
              border: '1px solid #E2E2E2',
              marginTop: '16px',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#202124', marginBottom: '6px' }}>
              Structural Properties:
            </div>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#555555', lineHeight: 1.6 }}>
              <li><strong>Prefix-Free:</strong> No codeword forms the prefix of another.</li>
              <li><strong>Frequency Inversion:</strong> Frequent symbol A receives a 1-bit code (0); infrequent symbol F receives a 4-bit code (1100).</li>
              <li><strong>Zero Redundancy:</strong> The tree is a full binary tree with exactly 2n − 1 nodes.</li>
            </ul>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
