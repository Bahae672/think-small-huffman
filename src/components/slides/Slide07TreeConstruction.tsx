import React, { useEffect, useRef } from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide07TreeConstructionProps {
  step?: number;
}

// ─── Geometric edge: line terminates at circle circumferences, never crossing node centers ───
const CleanEdge: React.FC<{
  x1: number; y1: number; r1: number;
  x2: number; y2: number; r2: number;
  bitLabel: '0' | '1';
  isActive: boolean;
  animKey: string;
}> = ({ x1, y1, r1, x2, y2, r2, bitLabel, isActive, animKey }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const d = Math.hypot(dx, dy);
  if (d === 0) return null;
  const ux = dx / d;
  const uy = dy / d;
  const sx = x1 + r1 * ux;
  const sy = y1 + r1 * uy;
  const ex = x2 - r2 * ux;
  const ey = y2 - r2 * uy;
  const mx = (sx + ex) / 2 + (bitLabel === '0' ? -16 : 16);
  const my = (sy + ey) / 2 - 6;

  return (
    <g key={animKey} style={{ animation: 'treeNodeIn 0.25s ease both' }}>
      <line
        x1={sx} y1={sy} x2={ex} y2={ey}
        stroke={isActive ? '#147D78' : '#B0B0B0'}
        strokeWidth={isActive ? 3 : 1.8}
      />
      <text
        x={mx} y={my}
        fill={isActive ? '#147D78' : '#888'}
        fontSize="20" fontWeight="800" textAnchor="middle" dominantBaseline="central"
      >
        {bitLabel}
      </text>
    </g>
  );
};

// ─── Animated node circle ───
const TreeNode: React.FC<{
  cx: number; cy: number; r: number;
  label: string; sublabel?: string;
  isActive: boolean; isRoot?: boolean; isGhost?: boolean;
  animKey: string;
}> = ({ cx, cy, r, label, sublabel, isActive, isRoot, isGhost, animKey }) => {
  const fill   = isRoot ? '#147D78' : isActive ? '#E6F4F3' : '#FAFAFA';
  const stroke = isRoot ? '#147D78' : isActive ? '#147D78' : isGhost ? '#CCCCCC' : '#202124';
  const sw     = isActive || isRoot ? 3 : isGhost ? 1.5 : 2;
  const textFill = isRoot ? '#FFFFFF' : isGhost ? '#AAAAAA' : '#202124';
  const subFill  = isRoot ? '#C8EFED' : isGhost ? '#CCCCCC' : '#666666';

  return (
    <g key={animKey} style={{ animation: 'treeNodeIn 0.25s ease both' }}>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={sw} />
      {sublabel ? (
        <>
          <text x={cx} y={cy - r * 0.22} textAnchor="middle" dominantBaseline="central"
            fontSize={r * 0.65} fontWeight="700" fill={textFill}>{label}</text>
          <text x={cx} y={cy + r * 0.35} textAnchor="middle" dominantBaseline="central"
            fontSize={r * 0.52} fontWeight="600" fill={subFill}>{sublabel}</text>
        </>
      ) : (
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
          fontSize={r * 0.7} fontWeight="700" fill={textFill}>{label}</text>
      )}
    </g>
  );
};

// ─── Keyframes injected once ───
const CSS = `
  @keyframes treeNodeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

export const Slide07TreeConstruction: React.FC<Slide07TreeConstructionProps> = ({ step = 0 }) => {
  const currentStep = Math.min(5, Math.max(0, step));
  const styleInjected = useRef(false);

  useEffect(() => {
    if (!styleInjected.current && typeof document !== 'undefined') {
      const el = document.getElementById('tree-anim-css');
      if (!el) {
        const s = document.createElement('style');
        s.id = 'tree-anim-css';
        s.textContent = CSS;
        document.head.appendChild(s);
      }
      styleInjected.current = true;
    }
  }, []);

  // ── Layout constants ──────────────────────────────────────────────
  // SVG viewBox: 1200 × 560  (wide to match slide aspect ratio)
  // Tree is laid out symmetrically:
  //   Row 0 (root 100):         x=600,  y=60
  //   Row 1 (A, 55):            x=240,  y=175  |  x=760,  y=175
  //   Row 2 (25, 30):           x=560,  y=295  |  x=960,  y=295
  //   Row 3 (C,B  F,E,D):       x=440,y=415  x=680,y=415  | x=820,y=415  x=1000,y=415  x=1100,y=415
  //   D is a leaf child of 30, E and F are children of 14
  //
  // Revised cleaner tree:
  //   Root 100  →  left child A(45),  right child 55
  //   55        →  left child 25,     right child 30
  //   25        →  left child C(12),  right child B(13)
  //   30        →  left child 14,     right child D(16)
  //   14        →  left child F(5),   right child E(9)

  const R = {
    root: 42,
    l1: 36,    // A, 55
    l2: 30,    // 25, 30
    l3: 26,    // C, B, 14, D
    l4: 22,    // F, E
  };

  // Node positions
  const N = {
    root: { x: 600,  y: 65 },
    A:    { x: 240,  y: 185 },
    n55:  { x: 760,  y: 185 },
    n25:  { x: 560,  y: 310 },
    n30:  { x: 960,  y: 310 },
    C:    { x: 420,  y: 435 },
    B:    { x: 700,  y: 435 },
    n14:  { x: 820,  y: 435 },
    D:    { x: 1100, y: 435 },
    F:    { x: 700,  y: 540 },
    E:    { x: 940,  y: 540 },
  };

  const stepsMeta = [
    {
      title: 'STEP 0 — Initial State',
      merge: 'Q = { F:5, E:9, C:12, B:13, D:16, A:45 }',
    },
    {
      title: 'STEP 1 — Merge F(5) + E(9) → 14',
      merge: '5 + 9 = 14   |   Q = { C:12, B:13, 14, D:16, A:45 }',
    },
    {
      title: 'STEP 2 — Merge C(12) + B(13) → 25',
      merge: '12 + 13 = 25   |   Q = { 14, D:16, 25, A:45 }',
    },
    {
      title: 'STEP 3 — Merge 14 + D(16) → 30',
      merge: '14 + 16 = 30   |   Q = { 25, 30, A:45 }',
    },
    {
      title: 'STEP 4 — Merge 25 + 30 → 55',
      merge: '25 + 30 = 55   |   Q = { A:45, 55 }',
    },
    {
      title: 'STEP 5 — Merge A(45) + 55 → 100 (Root)',
      merge: '45 + 55 = 100   |   Tree complete — optimal prefix-free code!',
    },
  ];

  const meta = stepsMeta[currentStep];

  // Which step "created" each node/edge (used to key animations)
  const createdAt = {
    F: 0, E: 0, C: 0, B: 0, D: 0, A: 0,   // leaves always present
    n14: 1, edgeF: 1, edgeE: 1,
    n25: 2, edgeC: 2, edgeB: 2,
    n30: 3, edge14: 3, edgeD: 3,
    n55: 4, edge25: 4, edge30: 4,
    root: 5, edgeA: 5, edge55: 5,
  };

  // Animate key: embed step so React unmounts+remounts on step change, triggering animation
  const ak = (name: keyof typeof createdAt) => `${name}-step${currentStep}`;

  // ── Step 0: flat disconnected queue ──────────────────────────────
  if (currentStep === 0) {
    const leaves = [
      { sym: 'F', freq: 5,  x: 110 },
      { sym: 'E', freq: 9,  x: 290 },
      { sym: 'C', freq: 12, x: 470 },
      { sym: 'B', freq: 13, x: 650 },
      { sym: 'D', freq: 16, x: 830 },
      { sym: 'A', freq: 45, x: 1010 },
    ];
    return (
      <SlideLayout
        slideNumber={7} totalSlides={14}
        title="Constructing the Huffman Tree"
        subtitle="Chronological Greedy Merges from Min-Priority Queue"
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
          {/* Step banner */}
          <div style={{
            padding: '14px 28px', backgroundColor: '#F8F9FA',
            borderLeft: '6px solid #147D78',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#202124' }}>{meta.title}</div>
              <div style={{ fontSize: '20px', color: '#147D78', fontWeight: 600, marginTop: '4px', fontFamily: 'monospace' }}>{meta.merge}</div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, backgroundColor: '#E6F4F3', color: '#147D78', padding: '6px 16px', fontFamily: 'monospace', borderRadius: '3px' }}>
              Step 0 / 5
            </div>
          </div>

          {/* SVG */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 1200 420" style={{ width: '100%', height: '100%', maxHeight: '460px' }}>
              <text x="600" y="80" textAnchor="middle" fontSize="30" fontWeight="700" fill="#147D78">
                Priority Queue Q — 6 independent leaf nodes sorted by frequency
              </text>
              {leaves.map((leaf) => (
                <g key={leaf.sym} style={{ animation: 'treeNodeIn 0.25s ease both' }}>
                  <circle cx={leaf.x} cy={240} r={52} fill="#FAFAFA" stroke="#202124" strokeWidth="2.5" />
                  <text x={leaf.x} y={228} textAnchor="middle" dominantBaseline="central" fontSize="26" fontWeight="700" fill="#202124">{leaf.sym}</text>
                  <text x={leaf.x} y={258} textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="600" fill="#147D78">{leaf.freq}</text>
                </g>
              ))}
              <text x="600" y="360" textAnchor="middle" fontSize="22" fill="#888" fontStyle="italic">
                Press Space or → to execute the first greedy merge: F(5) + E(9) → 14
              </text>
            </svg>
          </div>

          {/* Bottom caption */}
          <div style={{ borderTop: '1px solid #EBEBEB', paddingTop: '10px', fontSize: '19px', color: '#666', textAlign: 'center', fontStyle: 'italic' }}>
            Each merge fuses the two lowest remaining frequencies into a composite parent node.
          </div>
        </div>
      </SlideLayout>
    );
  }

  // ── Steps 1-5: progressively built tree ──────────────────────────
  return (
    <SlideLayout
      slideNumber={7} totalSlides={14}
      title="Constructing the Huffman Tree"
      subtitle="Chronological Greedy Merges from Min-Priority Queue"
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
        {/* Step banner */}
        <div style={{
          padding: '14px 28px', backgroundColor: '#F8F9FA',
          borderLeft: '6px solid #147D78',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#202124' }}>{meta.title}</div>
            <div style={{ fontSize: '20px', color: '#147D78', fontWeight: 600, marginTop: '4px', fontFamily: 'monospace' }}>{meta.merge}</div>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, backgroundColor: '#E6F4F3', color: '#147D78', padding: '6px 16px', fontFamily: 'monospace', borderRadius: '3px' }}>
            Step {currentStep} / 5
          </div>
        </div>

        {/* SVG tree */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 1200 600" style={{ width: '100%', height: '100%', maxHeight: '540px', overflow: 'visible' }}>

            {/* ── Edges (behind nodes) ── */}

            {/* Step 1 edges: 14 → F, E */}
            {currentStep >= 1 && (
              <>
                <CleanEdge x1={N.n14.x} y1={N.n14.y} r1={R.l3} x2={N.F.x} y2={N.F.y} r2={R.l4} bitLabel="0" isActive={currentStep === 1} animKey={ak('edgeF')} />
                <CleanEdge x1={N.n14.x} y1={N.n14.y} r1={R.l3} x2={N.E.x} y2={N.E.y} r2={R.l4} bitLabel="1" isActive={currentStep === 1} animKey={ak('edgeE')} />
              </>
            )}

            {/* Step 2 edges: 25 → C, B */}
            {currentStep >= 2 && (
              <>
                <CleanEdge x1={N.n25.x} y1={N.n25.y} r1={R.l2} x2={N.C.x} y2={N.C.y} r2={R.l3} bitLabel="0" isActive={currentStep === 2} animKey={ak('edgeC')} />
                <CleanEdge x1={N.n25.x} y1={N.n25.y} r1={R.l2} x2={N.B.x} y2={N.B.y} r2={R.l3} bitLabel="1" isActive={currentStep === 2} animKey={ak('edgeB')} />
              </>
            )}

            {/* Step 3 edges: 30 → 14, D */}
            {currentStep >= 3 && (
              <>
                <CleanEdge x1={N.n30.x} y1={N.n30.y} r1={R.l2} x2={N.n14.x} y2={N.n14.y} r2={R.l3} bitLabel="0" isActive={currentStep === 3} animKey={ak('edge14')} />
                <CleanEdge x1={N.n30.x} y1={N.n30.y} r1={R.l2} x2={N.D.x} y2={N.D.y} r2={R.l3} bitLabel="1" isActive={currentStep === 3} animKey={ak('edgeD')} />
              </>
            )}

            {/* Step 4 edges: 55 → 25, 30 */}
            {currentStep >= 4 && (
              <>
                <CleanEdge x1={N.n55.x} y1={N.n55.y} r1={R.l1} x2={N.n25.x} y2={N.n25.y} r2={R.l2} bitLabel="0" isActive={currentStep === 4} animKey={ak('edge25')} />
                <CleanEdge x1={N.n55.x} y1={N.n55.y} r1={R.l1} x2={N.n30.x} y2={N.n30.y} r2={R.l2} bitLabel="1" isActive={currentStep === 4} animKey={ak('edge30')} />
              </>
            )}

            {/* Step 5 edges: root → A, 55 */}
            {currentStep >= 5 && (
              <>
                <CleanEdge x1={N.root.x} y1={N.root.y} r1={R.root} x2={N.A.x} y2={N.A.y} r2={R.l1} bitLabel="0" isActive={currentStep === 5} animKey={ak('edgeA')} />
                <CleanEdge x1={N.root.x} y1={N.root.y} r1={R.root} x2={N.n55.x} y2={N.n55.y} r2={R.l1} bitLabel="1" isActive={currentStep === 5} animKey={ak('edge55')} />
              </>
            )}

            {/* ── Nodes (on top of edges) ── */}

            {/* Leaves F and E — always visible from step 1 */}
            <TreeNode cx={N.F.x} cy={N.F.y} r={R.l4} label="F" sublabel="5"
              isActive={currentStep === 1} animKey={`F-step1`} />
            <TreeNode cx={N.E.x} cy={N.E.y} r={R.l4} label="E" sublabel="9"
              isActive={currentStep === 1} animKey={`E-step1`} />

            {/* Node 14 — appears at step 1 */}
            {currentStep >= 1 && (
              <TreeNode cx={N.n14.x} cy={N.n14.y} r={R.l3} label="14"
                isActive={currentStep === 1 || currentStep === 3} animKey={ak('n14')} />
            )}

            {/* Leaves C and B, Node 25 — appear at step 2 */}
            {currentStep >= 2 && (
              <>
                <TreeNode cx={N.C.x} cy={N.C.y} r={R.l3} label="C" sublabel="12"
                  isActive={currentStep === 2} animKey={ak('C')} />
                <TreeNode cx={N.B.x} cy={N.B.y} r={R.l3} label="B" sublabel="13"
                  isActive={currentStep === 2} animKey={ak('B')} />
                <TreeNode cx={N.n25.x} cy={N.n25.y} r={R.l2} label="25"
                  isActive={currentStep === 2 || currentStep === 4} animKey={ak('n25')} />
              </>
            )}

            {/* Leaf D and Node 30 — appear at step 3 */}
            {currentStep >= 3 && (
              <>
                <TreeNode cx={N.D.x} cy={N.D.y} r={R.l3} label="D" sublabel="16"
                  isActive={currentStep === 3} animKey={ak('D')} />
                <TreeNode cx={N.n30.x} cy={N.n30.y} r={R.l2} label="30"
                  isActive={currentStep === 3 || currentStep === 4} animKey={ak('n30')} />
              </>
            )}

            {/* Node 55 — appears at step 4 */}
            {currentStep >= 4 && (
              <TreeNode cx={N.n55.x} cy={N.n55.y} r={R.l1} label="55"
                isActive={currentStep === 4 || currentStep === 5} animKey={ak('n55')} />
            )}

            {/* Leaf A and Root 100 — appear at step 5 */}
            {currentStep >= 5 && (
              <>
                <TreeNode cx={N.A.x} cy={N.A.y} r={R.l1} label="A" sublabel="45"
                  isActive={currentStep === 5} animKey={ak('A')} />
                <TreeNode cx={N.root.x} cy={N.root.y} r={R.root} label="100"
                  isActive={true} isRoot={true} animKey={ak('root')} />
              </>
            )}

            {/* Ghost A (steps 1-4) */}
            {currentStep < 5 && (
              <TreeNode cx={N.A.x} cy={N.A.y} r={R.l1} label="A" sublabel="45"
                isActive={false} isGhost={true} animKey={`A-ghost-${currentStep}`} />
            )}

          </svg>
        </div>

        {/* Bottom caption */}
        <div style={{
          borderTop: '1px solid #EBEBEB', paddingTop: '10px',
          fontSize: '19px', color: '#666', textAlign: 'center', fontStyle: 'italic',
        }}>
          Each merge fuses the two lowest remaining frequencies into a composite parent node. The active (teal) nodes indicate the current merge.
        </div>
      </div>
    </SlideLayout>
  );
};
