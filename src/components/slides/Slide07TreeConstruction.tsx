import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide07TreeConstructionProps {
  step?: number;
}

// Geometric edge that draws UPWARD from child circumference (bottom) to parent circumference (top)
const CleanEdge: React.FC<{
  childX: number;
  childY: number;
  childR: number;
  parentX: number;
  parentY: number;
  parentR: number;
  bitLabel: '0' | '1';
  isActive: boolean;
}> = ({ childX, childY, childR, parentX, parentY, parentR, bitLabel, isActive }) => {
  // Vector from child (bottom) -> parent (top)
  const dx = parentX - childX;
  const dy = parentY - childY;
  const d = Math.hypot(dx, dy);
  if (d === 0) return null;
  const ux = dx / d;
  const uy = dy / d;

  // Start at child circumference, end at parent circumference
  const sx = childX + childR * ux;
  const sy = childY + childR * uy;
  const ex = parentX - parentR * ux;
  const ey = parentY - parentR * uy;

  const mx = (sx + ex) / 2 + (bitLabel === '0' ? -18 : 18);
  const my = (sy + ey) / 2 - 4;
  const len = Math.ceil(Math.hypot(ex - sx, ey - sy));

  return (
    <g>
      <line
        x1={sx}
        y1={sy}
        x2={ex}
        y2={ey}
        stroke={isActive ? '#147D78' : '#202124'}
        strokeWidth={isActive ? 3.5 : 2.2}
        strokeLinecap="round"
        strokeDasharray={len}
        style={
          {
            '--edge-len': `${len}`,
            transition: 'stroke 0.4s ease, stroke-width 0.4s ease',
            animation: 'drawEdgeUp 0.48s cubic-bezier(0.22, 1, 0.36, 1) both',
          } as React.CSSProperties
        }
      />
      <text
        x={mx}
        y={my}
        fill="#147D78"
        fontSize="19"
        fontWeight="800"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ animation: 'fadeIn 0.35s ease 0.26s both' }}
      >
        {bitLabel}
      </text>
    </g>
  );
};

export const Slide07TreeConstruction: React.FC<Slide07TreeConstructionProps> = ({ step = 0 }) => {
  // Step 0: Queue initialized in flat row
  // Step 1: Nodes align into their tree leaf positions (no lines yet!)
  // Step 2: Merge 1 lines grow upward from F(5) & E(9) -> Node 14 blooms at apex
  // Step 3: Merge 2 lines grow upward from C(12) & B(13) -> Node 25 blooms at apex
  // Step 4: Merge 3 lines grow upward from 14 & D(16) -> Node 30 blooms at apex
  // Step 5: Merge 4 lines grow upward from 25 & 30 -> Node 55 blooms at apex
  // Step 6: Merge 5 lines grow upward from A(45) & 55 -> Root 100 blooms + final codes
  const currentStep = Math.min(6, Math.max(0, step));

  const stepsMeta = [
    {
      title: 'STEP 0 — Priority Queue Initialization',
      merge: 'Min-Heap Q = [ F(5), E(9), C(12), B(13), D(16), A(45) ]',
    },
    {
      title: 'STEP 1 — Align Leaf Nodes by Frequency Depth',
      merge: 'Lowest frequencies F(5) and E(9) positioned at deepest level, ready for first greedy merge',
    },
    {
      title: 'STEP 2 — Merge 1: Combine F(5) + E(9) → Node 14',
      merge: 'Extract two smallest: 5 + 9 = 14   |   Q = [ C(12), B(13), 14, D(16), A(45) ]',
    },
    {
      title: 'STEP 3 — Merge 2: Combine C(12) + B(13) → Node 25',
      merge: 'Extract next two smallest: 12 + 13 = 25   |   Q = [ 14, D(16), 25, A(45) ]',
    },
    {
      title: 'STEP 4 — Merge 3: Combine Node 14 + D(16) → Node 30',
      merge: 'Extract 14 and D(16): 14 + 16 = 30   |   Q = [ 25, 30, A(45) ]',
    },
    {
      title: 'STEP 5 — Merge 4: Combine Node 25 + Node 30 → Node 55',
      merge: 'Extract subtrees 25 and 30: 25 + 30 = 55   |   Q = [ A(45), 55 ]',
    },
    {
      title: 'STEP 6 — Merge 5: Combine A(45) + Node 55 → Root 100',
      merge: '45 + 55 = 100   |   Optimal Prefix-Free Huffman Tree Complete!',
    },
  ];

  const meta = stepsMeta[currentStep];

  const pos = {
    F: currentStep === 0 ? { x: 180, y: 260, r: 34 } : { x: 700, y: 455, r: 24 },
    E: currentStep === 0 ? { x: 340, y: 260, r: 34 } : { x: 880, y: 455, r: 24 },
    C: currentStep === 0 ? { x: 500, y: 260, r: 34 } : { x: 430, y: 350, r: 26 },
    B: currentStep === 0 ? { x: 660, y: 260, r: 34 } : { x: 590, y: 350, r: 26 },
    D: currentStep === 0 ? { x: 820, y: 260, r: 34 } : { x: 990, y: 350, r: 26 },
    A: currentStep === 0 ? { x: 980, y: 260, r: 34 } : { x: 260, y: 155, r: 32 },
    n14: { x: 790, y: 350, r: 26 },
    n25: { x: 510, y: 245, r: 28 },
    n30: { x: 890, y: 245, r: 28 },
    n55: { x: 700, y: 155, r: 32 },
    root: { x: 480, y: 52, r: 36 },
  };

  const leaves = [
    { id: 'F', sym: 'F', freq: 5, code: '1100', activeSteps: [1, 2], mergedAt: 2, p: pos.F },
    { id: 'E', sym: 'E', freq: 9, code: '1101', activeSteps: [1, 2], mergedAt: 2, p: pos.E },
    { id: 'C', sym: 'C', freq: 12, code: '100', activeSteps: [3], mergedAt: 3, p: pos.C },
    { id: 'B', sym: 'B', freq: 13, code: '101', activeSteps: [3], mergedAt: 3, p: pos.B },
    { id: 'D', sym: 'D', freq: 16, code: '111', activeSteps: [4], mergedAt: 4, p: pos.D },
    { id: 'A', sym: 'A', freq: 45, code: '0', activeSteps: [6], mergedAt: 6, p: pos.A },
  ];

  return (
    <SlideLayout
      slideNumber={7}
      totalSlides={14}
      title="Constructing the Huffman Tree"
      subtitle="Step-by-Step Bottom-Up Greedy Merges"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        {/* Top Step Status Banner */}
        <div
          style={{
            padding: '14px 28px',
            backgroundColor: '#F8F9FA',
            borderLeft: '6px solid #147D78',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#202124' }}>{meta.title}</div>
            <div
              style={{
                fontSize: '19px',
                color: '#147D78',
                fontWeight: 700,
                marginTop: '4px',
                fontFamily: 'monospace',
              }}
            >
              {meta.merge}
            </div>
          </div>

          {/* Step Dots + Counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[0, 1, 2, 3, 4, 5, 6].map((s) => (
                <div
                  key={s}
                  style={{
                    width: s === currentStep ? '24px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    backgroundColor: s <= currentStep ? '#147D78' : '#DCDCDC',
                    transition: 'all 0.35s ease',
                  }}
                />
              ))}
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 800,
                backgroundColor: '#E6F4F3',
                color: '#147D78',
                padding: '6px 16px',
                fontFamily: 'monospace',
                borderRadius: '4px',
              }}
            >
              Step {currentStep} / 6
            </div>
          </div>
        </div>

        {/* Single Persistent SVG Viewport */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            border: '2px solid #E5E5E5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox="0 0 1200 520"
            style={{ width: '100%', height: '100%', maxHeight: '520px' }}
          >
            {/* Step 0 Prompt Text */}
            <g
              style={{
                opacity: currentStep === 0 ? 1 : 0,
                transition: 'opacity 0.35s ease',
                pointerEvents: 'none',
              }}
            >
              <text
                x="580"
                y="125"
                textAnchor="middle"
                fontSize="28"
                fontWeight="800"
                fill="#147D78"
              >
                Initial Priority Queue Q — 6 Independent Leaf Nodes Sorted by Frequency
              </text>
              <text
                x="580"
                y="390"
                textAnchor="middle"
                fontSize="21"
                fill="#777777"
                fontStyle="italic"
              >
                Press Space or Click to align nodes into their tree positions
              </text>
            </g>

            {/* ── 1. BOTTOM-UP EDGES (Grow upward from children to parent!) ── */}
            {currentStep >= 2 && (
              <g key="edges-merge1">
                <CleanEdge
                  childX={pos.F.x}
                  childY={pos.F.y}
                  childR={pos.F.r}
                  parentX={pos.n14.x}
                  parentY={pos.n14.y}
                  parentR={pos.n14.r}
                  bitLabel="0"
                  isActive={currentStep === 2}
                />
                <CleanEdge
                  childX={pos.E.x}
                  childY={pos.E.y}
                  childR={pos.E.r}
                  parentX={pos.n14.x}
                  parentY={pos.n14.y}
                  parentR={pos.n14.r}
                  bitLabel="1"
                  isActive={currentStep === 2}
                />
              </g>
            )}

            {currentStep >= 3 && (
              <g key="edges-merge2">
                <CleanEdge
                  childX={pos.C.x}
                  childY={pos.C.y}
                  childR={pos.C.r}
                  parentX={pos.n25.x}
                  parentY={pos.n25.y}
                  parentR={pos.n25.r}
                  bitLabel="0"
                  isActive={currentStep === 3}
                />
                <CleanEdge
                  childX={pos.B.x}
                  childY={pos.B.y}
                  childR={pos.B.r}
                  parentX={pos.n25.x}
                  parentY={pos.n25.y}
                  parentR={pos.n25.r}
                  bitLabel="1"
                  isActive={currentStep === 3}
                />
              </g>
            )}

            {currentStep >= 4 && (
              <g key="edges-merge3">
                <CleanEdge
                  childX={pos.n14.x}
                  childY={pos.n14.y}
                  childR={pos.n14.r}
                  parentX={pos.n30.x}
                  parentY={pos.n30.y}
                  parentR={pos.n30.r}
                  bitLabel="0"
                  isActive={currentStep === 4}
                />
                <CleanEdge
                  childX={pos.D.x}
                  childY={pos.D.y}
                  childR={pos.D.r}
                  parentX={pos.n30.x}
                  parentY={pos.n30.y}
                  parentR={pos.n30.r}
                  bitLabel="1"
                  isActive={currentStep === 4}
                />
              </g>
            )}

            {currentStep >= 5 && (
              <g key="edges-merge4">
                <CleanEdge
                  childX={pos.n25.x}
                  childY={pos.n25.y}
                  childR={pos.n25.r}
                  parentX={pos.n55.x}
                  parentY={pos.n55.y}
                  parentR={pos.n55.r}
                  bitLabel="0"
                  isActive={currentStep === 5}
                />
                <CleanEdge
                  childX={pos.n30.x}
                  childY={pos.n30.y}
                  childR={pos.n30.r}
                  parentX={pos.n55.x}
                  parentY={pos.n55.y}
                  parentR={pos.n55.r}
                  bitLabel="1"
                  isActive={currentStep === 5}
                />
              </g>
            )}

            {currentStep >= 6 && (
              <g key="edges-merge5">
                <CleanEdge
                  childX={pos.A.x}
                  childY={pos.A.y}
                  childR={pos.A.r}
                  parentX={pos.root.x}
                  parentY={pos.root.y}
                  parentR={pos.root.r}
                  bitLabel="0"
                  isActive={currentStep === 6}
                />
                <CleanEdge
                  childX={pos.n55.x}
                  childY={pos.n55.y}
                  childR={pos.n55.r}
                  parentX={pos.root.x}
                  parentY={pos.root.y}
                  parentR={pos.root.r}
                  bitLabel="1"
                  isActive={currentStep === 6}
                />
              </g>
            )}

            {/* ── 2. PERSISTENT LEAF NODES ── */}
            {leaves.map((leaf) => {
              const isActive = leaf.activeSteps.includes(currentStep);
              const isWaiting = currentStep >= 1 && currentStep < leaf.mergedAt && !isActive;
              return (
                <g
                  key={`leaf-${leaf.id}`}
                  style={{
                    transform: `translate(${leaf.p.x}px, ${leaf.p.y}px)`,
                    transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
                    opacity: isWaiting ? 0.5 : 1,
                  }}
                >
                  <circle
                    cx={0}
                    cy={0}
                    r={leaf.p.r}
                    fill={isActive ? '#E6F4F3' : '#FAFAFA'}
                    stroke={isActive ? '#147D78' : '#202124'}
                    strokeWidth={isActive ? 3.5 : 2.2}
                    strokeDasharray={isWaiting ? '4 3' : 'none'}
                    style={{ transition: 'all 0.4s ease' }}
                  />
                  <text
                    x={0}
                    y={-leaf.p.r * 0.22}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={leaf.p.r * 0.62}
                    fontWeight="800"
                    fill="#202124"
                    style={{ transition: 'font-size 0.4s ease' }}
                  >
                    {leaf.sym}
                  </text>
                  <text
                    x={0}
                    y={leaf.p.r * 0.36}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={leaf.p.r * 0.5}
                    fontWeight="700"
                    fill="#147D78"
                    style={{ transition: 'font-size 0.4s ease' }}
                  >
                    {leaf.freq}
                  </text>

                  {/* Final Huffman Codeword Pill revealed at Step 6 */}
                  {currentStep === 6 && (
                    <g style={{ animation: 'fadeIn 0.45s ease 0.32s both' }}>
                      <rect
                        x={-28}
                        y={leaf.p.r + 6}
                        width={56}
                        height={22}
                        rx={4}
                        fill="#147D78"
                      />
                      <text
                        x={0}
                        y={leaf.p.r + 17}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontFamily="monospace"
                        fontSize="14"
                        fontWeight="800"
                        fill="#FFFFFF"
                      >
                        {leaf.code}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* ── 3. INTERNAL COMPOSITE NODES (Bloom at the apex as the upward lines meet!) ── */}
            {currentStep >= 2 && (
              <g
                key="internal-14"
                transform={`translate(${pos.n14.x}, ${pos.n14.y})`}
              >
                <g style={{ animation: 'nodePopIn 0.42s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both' }}>
                  <circle
                    cx={0}
                    cy={0}
                    r={pos.n14.r}
                    fill={currentStep === 2 || currentStep === 4 ? '#E6F4F3' : '#FFFFFF'}
                    stroke={currentStep === 2 || currentStep === 4 ? '#147D78' : '#202124'}
                    strokeWidth={currentStep === 2 || currentStep === 4 ? 3.5 : 2.2}
                    style={{ transition: 'all 0.4s ease' }}
                  />
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="18"
                    fontWeight="800"
                    fill="#202124"
                  >
                    14
                  </text>
                </g>
              </g>
            )}

            {currentStep >= 3 && (
              <g
                key="internal-25"
                transform={`translate(${pos.n25.x}, ${pos.n25.y})`}
              >
                <g style={{ animation: 'nodePopIn 0.42s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both' }}>
                  <circle
                    cx={0}
                    cy={0}
                    r={pos.n25.r}
                    fill={currentStep === 3 || currentStep === 5 ? '#E6F4F3' : '#FFFFFF'}
                    stroke={currentStep === 3 || currentStep === 5 ? '#147D78' : '#202124'}
                    strokeWidth={currentStep === 3 || currentStep === 5 ? 3.5 : 2.2}
                    style={{ transition: 'all 0.4s ease' }}
                  />
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="19"
                    fontWeight="800"
                    fill="#202124"
                  >
                    25
                  </text>
                </g>
              </g>
            )}

            {currentStep >= 4 && (
              <g
                key="internal-30"
                transform={`translate(${pos.n30.x}, ${pos.n30.y})`}
              >
                <g style={{ animation: 'nodePopIn 0.42s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both' }}>
                  <circle
                    cx={0}
                    cy={0}
                    r={pos.n30.r}
                    fill={currentStep === 4 || currentStep === 5 ? '#E6F4F3' : '#FFFFFF'}
                    stroke={currentStep === 4 || currentStep === 5 ? '#147D78' : '#202124'}
                    strokeWidth={currentStep === 4 || currentStep === 5 ? 3.5 : 2.2}
                    style={{ transition: 'all 0.4s ease' }}
                  />
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="19"
                    fontWeight="800"
                    fill="#202124"
                  >
                    30
                  </text>
                </g>
              </g>
            )}

            {currentStep >= 5 && (
              <g
                key="internal-55"
                transform={`translate(${pos.n55.x}, ${pos.n55.y})`}
              >
                <g style={{ animation: 'nodePopIn 0.42s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both' }}>
                  <circle
                    cx={0}
                    cy={0}
                    r={pos.n55.r}
                    fill={currentStep === 5 || currentStep === 6 ? '#E6F4F3' : '#FFFFFF'}
                    stroke={currentStep === 5 || currentStep === 6 ? '#147D78' : '#202124'}
                    strokeWidth={currentStep === 5 || currentStep === 6 ? 3.5 : 2.2}
                    style={{ transition: 'all 0.4s ease' }}
                  />
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="21"
                    fontWeight="800"
                    fill="#202124"
                  >
                    55
                  </text>
                </g>
              </g>
            )}

            {currentStep >= 6 && (
              <g
                key="internal-root"
                transform={`translate(${pos.root.x}, ${pos.root.y})`}
              >
                <g style={{ animation: 'nodePopIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both' }}>
                  <circle
                    cx={0}
                    cy={0}
                    r={pos.root.r}
                    fill="#147D78"
                    stroke="#147D78"
                    strokeWidth={3}
                  />
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="23"
                    fontWeight="800"
                    fill="#FFFFFF"
                  >
                    100
                  </text>
                </g>
              </g>
            )}
          </svg>
        </div>

        {/* Bottom Caption */}
        <div
          style={{
            borderTop: '1px solid #EBEBEB',
            paddingTop: '10px',
            fontSize: '19px',
            color: '#666666',
            textAlign: 'center',
            fontStyle: currentStep === 6 ? 'normal' : 'italic',
          }}
        >
          {currentStep === 0 && 'Step 0: Six independent symbols initialized in the min-priority queue.'}
          {currentStep === 1 && 'Step 1: Leaf nodes aligned in position. Next click fuses F(5) + E(9) upward into Node 14.'}
          {currentStep >= 2 &&
            currentStep < 6 &&
            'Branches grow upward from the two smallest nodes and fuse at the new parent node.'}
          {currentStep === 6 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 8px',
                animation: 'fadeIn 0.4s ease both',
              }}
            >
              <span>
                <strong style={{ color: '#147D78' }}>Prefix-Free Property:</strong> Leaves only — no code is a prefix of another (e.g.,{' '}
                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#202124' }}>0100111 &rarr; A&middot;C&middot;D</span> without separators).
              </span>
              <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#147D78' }}>
                Avg Length L&#772; = 2.24 bits/sym (vs. 3.00 fixed &rarr; &minus;25.3%)
              </span>
            </div>
          )}
        </div>
      </div>
    </SlideLayout>
  );
};
