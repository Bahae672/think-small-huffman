import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide09OptimalityProps {
  step?: number;
}

export const Slide09Optimality: React.FC<Slide09OptimalityProps> = ({ step = 0 }) => {
  return (
    <SlideLayout
      slideNumber={9}
      totalSlides={14}
      title="Why Does the Greedy Algorithm Work?"
      subtitle="Mathematical Proof Structure of Global Optimality (CLRS Theorems 16.3 &amp; 16.4)"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: '10px 10px',
        }}
      >
        <div style={{ fontSize: '30px', color: '#333333', lineHeight: 1.45 }}>
          In combinatorial optimization, greedy heuristics often get trapped in local minima. For Huffman Coding, global optimality is guaranteed by three structural lemmas:
        </div>

        {/* 3 Large Academic Argument Panels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '36px',
            margin: '24px 0',
          }}
        >
          {/* 01: Greedy-Choice Property */}
          <div
            style={{
              padding: '36px 30px',
              backgroundColor: '#FAFAFA',
              border: '2px solid #E2E2E2',
              borderTop: '6px solid #147D78',
              display: 'flex',
              flexDirection: 'column',
              opacity: step >= 0 ? 1 : 0.35,
              transition: 'opacity 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#147D78',
                letterSpacing: '0.06em',
                marginBottom: '16px',
              }}
            >
              01 — GREEDY CHOICE
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#202124',
                lineHeight: 1.35,
                marginBottom: '16px',
              }}
            >
              Deepest Sibling Leaves
            </div>
            <div
              style={{
                fontSize: '24px',
                color: '#444444',
                lineHeight: 1.55,
                flex: 1,
              }}
            >
              There always exists an optimal prefix code tree in which the two characters with the lowest frequencies appear as sibling leaves of maximum depth.
            </div>
            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid #E0E0E0',
                fontSize: '20px',
                color: '#777777',
                fontStyle: 'italic',
              }}
            >
              Proved via exchange argument: swapping lowest frequencies to maximum depth cannot increase tree cost.
            </div>
          </div>

          {/* 02: Reduction */}
          <div
            style={{
              padding: '36px 30px',
              backgroundColor: '#FAFAFA',
              border: '2px solid #E2E2E2',
              borderTop: '6px solid #202124',
              display: 'flex',
              flexDirection: 'column',
              opacity: step >= 1 ? 1 : 0.85,
              transform: step >= 1 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#202124',
                letterSpacing: '0.06em',
                marginBottom: '16px',
              }}
            >
              02 — REDUCTION
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#202124',
                lineHeight: 1.35,
                marginBottom: '16px',
              }}
            >
              Problem Space Contraction
            </div>
            <div
              style={{
                fontSize: '24px',
                color: '#444444',
                lineHeight: 1.55,
                flex: 1,
              }}
            >
              Combining two symbols <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>x</span> and <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>y</span> into a single node <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>z</span> creates a smaller instance of the exact same optimization problem on <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>n − 1</span> symbols.
            </div>
            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid #E0E0E0',
                fontSize: '20px',
                color: '#777777',
                fontFamily: 'monospace',
              }}
            >
              Cost(T) = Cost(T&apos;) + x.freq + y.freq
            </div>
          </div>

          {/* 03: Optimal Substructure */}
          <div
            style={{
              padding: '36px 30px',
              backgroundColor: '#FAFAFA',
              border: '2px solid #E2E2E2',
              borderTop: '6px solid #147D78',
              display: 'flex',
              flexDirection: 'column',
              opacity: step >= 2 ? 1 : 0.85,
              transform: step >= 2 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#147D78',
                letterSpacing: '0.06em',
                marginBottom: '16px',
              }}
            >
              03 — OPTIMAL SUBSTRUCTURE
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#202124',
                lineHeight: 1.35,
                marginBottom: '16px',
              }}
            >
              Inductive Extension
            </div>
            <div
              style={{
                fontSize: '24px',
                color: '#444444',
                lineHeight: 1.55,
                flex: 1,
              }}
            >
              An optimal solution to the reduced alphabet <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>C&apos;</span> converts into an optimal solution for the original alphabet <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>C</span> by replacing <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>z</span> with children <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>x</span> and <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>y</span>.
            </div>
            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid #E0E0E0',
                fontSize: '20px',
                color: '#777777',
                fontStyle: 'italic',
              }}
            >
              Induction on n establishes that the greedy choice remains globally optimal.
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            borderLeft: '8px solid #147D78',
            padding: '24px 36px',
            backgroundColor: '#F3F9F9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '36px', fontWeight: 700, color: '#147D78' }}>
            Result: An optimal prefix-free binary code.
          </div>
          <div style={{ fontSize: '24px', color: '#555555' }}>
            Theorem (Huffman, 1952)
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
