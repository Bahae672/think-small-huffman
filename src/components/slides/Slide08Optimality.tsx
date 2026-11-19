import React from 'react';
import { SlideLayout } from '../SlideLayout';

export const Slide08Optimality: React.FC = () => {
  return (
    <SlideLayout
      slideNumber={8}
      title="Why Does the Greedy Algorithm Work?"
      subtitle="Mathematical Proof Structure of Global Optimality"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: '10px 20px',
        }}
      >
        <div style={{ fontSize: '18px', color: '#555555', lineHeight: 1.5 }}>
          A greedy algorithm does not guarantee a globally optimal solution in arbitrary combinatorial spaces.
          For Huffman Coding, the global optimality of the greedy strategy is mathematically established through three rigorous lemmas:
        </div>

        {/* 3 Academic Argument Panels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '32px',
            margin: '20px 0',
          }}
        >
          {/* 01: Greedy-Choice Property */}
          <div
            style={{
              padding: '28px 24px',
              backgroundColor: '#FAFAFA',
              border: '1px solid #E2E2E2',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#147D78',
                letterSpacing: '0.05em',
                marginBottom: '12px',
              }}
            >
              01 — GREEDY-CHOICE PROPERTY
            </div>
            <div
              style={{
                fontSize: '19px',
                fontWeight: 600,
                color: '#202124',
                lineHeight: 1.4,
                marginBottom: '14px',
              }}
            >
              Sibling Leaves at Maximum Depth
            </div>
            <div
              style={{
                fontSize: '15.5px',
                color: '#555555',
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              Let <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>C</span> be an alphabet in which each character has a defined frequency.
              Let <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>x</span> and <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>y</span> be two characters with the lowest frequencies.
              Then there exists an optimal prefix-code tree for <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>C</span> in which <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>x</span> and <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>y</span> are sibling leaves of maximum depth.
            </div>
            <div
              style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid #EBEBEB',
                fontSize: '13px',
                color: '#777777',
              }}
            >
              Proved via exchange argument (swapping lowest-frequency nodes to the deepest leaves strictly decreases or maintains total cost).
            </div>
          </div>

          {/* 02: Reduction */}
          <div
            style={{
              padding: '28px 24px',
              backgroundColor: '#FAFAFA',
              border: '1px solid #E2E2E2',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#147D78',
                letterSpacing: '0.05em',
                marginBottom: '12px',
              }}
            >
              02 — REDUCTION
            </div>
            <div
              style={{
                fontSize: '19px',
                fontWeight: 600,
                color: '#202124',
                lineHeight: 1.4,
                marginBottom: '14px',
              }}
            >
              Problem Space Contraction
            </div>
            <div
              style={{
                fontSize: '15.5px',
                color: '#555555',
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              When symbols <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>x</span> and <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>y</span> are merged into a composite symbol <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>z</span> with frequency <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>z.freq = x.freq + y.freq</span>, the alphabet is reduced from <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>n</span> to <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>n &minus; 1</span> symbols:
              <br /><br />
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '17px' }}>C' = (C &minus; &#123;x, y&#125;) &cup; &#123;z&#125;</span>
            </div>
            <div
              style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid #EBEBEB',
                fontSize: '13px',
                color: '#777777',
              }}
            >
              The cost of tree <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>T</span> relates to <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>T'</span> by: <span style={{ fontFamily: 'monospace' }}>Cost(T) = Cost(T') + x.freq + y.freq</span>.
            </div>
          </div>

          {/* 03: Optimal Substructure */}
          <div
            style={{
              padding: '28px 24px',
              backgroundColor: '#FAFAFA',
              border: '1px solid #E2E2E2',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#147D78',
                letterSpacing: '0.05em',
                marginBottom: '12px',
              }}
            >
              03 — OPTIMAL SUBSTRUCTURE
            </div>
            <div
              style={{
                fontSize: '19px',
                fontWeight: 600,
                color: '#202124',
                lineHeight: 1.4,
                marginBottom: '14px',
              }}
            >
              Inductive Extension to Origin
            </div>
            <div
              style={{
                fontSize: '15.5px',
                color: '#555555',
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              An optimal solution to the reduced alphabet <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>C'</span> can be converted into an optimal solution for the original alphabet <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>C</span> simply by replacing the leaf node <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>z</span> with an internal node having <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>x</span> and <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>y</span> as children.
            </div>
            <div
              style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid #EBEBEB',
                fontSize: '13px',
                color: '#777777',
              }}
            >
              Proved by induction on <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>n</span>: each local greedy merge preserves global optimality.
            </div>
          </div>
        </div>

        {/* Bottom Bold Statement */}
        <div
          style={{
            borderLeft: '5px solid #147D78',
            padding: '16px 24px',
            backgroundColor: '#F3F9F8',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#147D78' }}>
            Result: An optimal prefix-free binary code.
          </div>
          <div style={{ fontSize: '15px', color: '#555555' }}>
            Theorem (Huffman, 1952): Algorithm 1 produces an optimal prefix code tree.
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
