import React from 'react';
import { SlideLayout } from '../SlideLayout';

export const Slide11Conclusion: React.FC = () => {
  return (
    <SlideLayout
      slideNumber={11}
      title="Conclusion"
      subtitle="Summary of Algorithmic Contributions"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: '20px 40px',
        }}
      >
        <div style={{ fontSize: '18px', color: '#555555', lineHeight: 1.5 }}>
          Our investigation demonstrates the theoretical foundations, implementation mechanisms, and practical application of Huffman Coding to image raster data:
        </div>

        {/* 3 Pillar Statements */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '36px',
            margin: '24px 0',
          }}
        >
          {/* PROBLEM */}
          <div
            style={{
              padding: '32px 28px',
              backgroundColor: '#FAFAFA',
              border: '1px solid #E2E2E2',
              borderTop: '4px solid #777777',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#777777', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                01 — THE PROBLEM
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#202124', margin: '12px 0 16px 0' }}>
                Efficient Image Storage
              </div>
              <div style={{ fontSize: '16px', color: '#555555', lineHeight: 1.6 }}>
                Representing massive digital raster streams using minimal bit budgets without discarding a single byte of exact image information.
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#888888', marginTop: '20px', borderTop: '1px solid #EEEEEE', paddingTop: '10px' }}>
              Entropy minimization without loss
            </div>
          </div>

          {/* APPROACH */}
          <div
            style={{
              padding: '32px 28px',
              backgroundColor: '#F7FCFC',
              border: '1px solid #147D78',
              borderTop: '4px solid #147D78',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#147D78', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                02 — THE APPROACH
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#147D78', margin: '12px 0 16px 0' }}>
                Greedy Tree Construction
              </div>
              <div style={{ fontSize: '16px', color: '#333333', lineHeight: 1.6 }}>
                Repeatedly extracting and combining the two least frequent nodes via a binary min-priority queue in <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>O(k log k)</span> time.
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#147D78', marginTop: '20px', borderTop: '1px solid #D5EBEA', paddingTop: '10px', fontWeight: 500 }}>
              Algorithm 1 HUFFMAN(C)
            </div>
          </div>

          {/* RESULT */}
          <div
            style={{
              padding: '32px 28px',
              backgroundColor: '#FAFAFA',
              border: '1px solid #E2E2E2',
              borderTop: '4px solid #202124',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#202124', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                03 — THE RESULT
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#202124', margin: '12px 0 16px 0' }}>
                Optimal Prefix-Free Code
              </div>
              <div style={{ fontSize: '16px', color: '#555555', lineHeight: 1.6 }}>
                A mathematically proven, globally optimal binary code with zero ambiguity, guaranteed instantaneous decodability, and 100% raster fidelity.
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#888888', marginTop: '20px', borderTop: '1px solid #EEEEEE', paddingTop: '10px' }}>
              Minimum expected codeword length
            </div>
          </div>
        </div>

        {/* Central Closing Axiom */}
        <div
          style={{
            borderLeft: '5px solid #147D78',
            padding: '20px 32px',
            backgroundColor: '#F5FAF9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#202124',
              letterSpacing: '-0.01em',
            }}
          >
            "Locally optimal decisions. Globally optimal encoding."
          </div>

          <div
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#147D78',
              letterSpacing: '0.02em',
            }}
          >
            Thank you for your attention.
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
