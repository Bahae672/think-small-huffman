import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide11ConclusionProps {
  step?: number;
}

export const Slide11Conclusion: React.FC<Slide11ConclusionProps> = ({ step = 0 }) => {
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
          padding: '10px 20px',
        }}
      >
        <div style={{ fontSize: '32px', color: '#333333', lineHeight: 1.45 }}>
          Our investigation establishes the theoretical correctness, asymptotic efficiency, and empirical effectiveness of Huffman Coding:
        </div>

        {/* 3 Pillar Statements */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '40px',
            margin: '24px 0',
          }}
        >
          {/* PROBLEM */}
          <div
            style={{
              padding: '36px 32px',
              backgroundColor: '#FAFAFA',
              border: '2px solid #E2E2E2',
              borderTop: '6px solid #777777',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#777777', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                01 — THE PROBLEM
              </div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#202124', margin: '14px 0 16px 0' }}>
                Efficient Image Storage
              </div>
              <div style={{ fontSize: '24px', color: '#444444', lineHeight: 1.55 }}>
                Minimizing digital transmission and disk footprint without sacrificing a single byte of exact image data.
              </div>
            </div>
            <div style={{ fontSize: '20px', color: '#777777', marginTop: '24px', borderTop: '1px solid #EEEEEE', paddingTop: '12px' }}>
              Lossless entropy constraint
            </div>
          </div>

          {/* APPROACH */}
          <div
            style={{
              padding: '36px 32px',
              backgroundColor: '#F7FCFC',
              border: '2px solid #147D78',
              borderTop: '6px solid #147D78',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#147D78', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                02 — THE APPROACH
              </div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#147D78', margin: '14px 0 16px 0' }}>
                Greedy Tree Construction
              </div>
              <div style={{ fontSize: '24px', color: '#202124', lineHeight: 1.55 }}>
                Repeatedly combining the two least frequent nodes via a binary min-priority queue in <strong style={{ fontFamily: 'monospace' }}>O(k log k)</strong> time.
              </div>
            </div>
            <div style={{ fontSize: '20px', color: '#147D78', marginTop: '24px', borderTop: '1px solid #D5EBEA', paddingTop: '12px', fontWeight: 600 }}>
              Algorithm 1 HUFFMAN(C)
            </div>
          </div>

          {/* RESULT */}
          <div
            style={{
              padding: '36px 32px',
              backgroundColor: '#FAFAFA',
              border: '2px solid #E2E2E2',
              borderTop: '6px solid #202124',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#202124', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                03 — THE RESULT
              </div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#202124', margin: '14px 0 16px 0' }}>
                Optimal Prefix Code
              </div>
              <div style={{ fontSize: '24px', color: '#444444', lineHeight: 1.55 }}>
                A mathematically proven, globally optimal binary code with zero decoding ambiguity and 100% raster fidelity.
              </div>
            </div>
            <div style={{ fontSize: '20px', color: '#777777', marginTop: '24px', borderTop: '1px solid #EEEEEE', paddingTop: '12px' }}>
              Bounded by Shannon Entropy H(X)
            </div>
          </div>
        </div>

        {/* Central Closing Banner */}
        <div
          style={{
            borderLeft: '8px solid #147D78',
            padding: '28px 40px',
            backgroundColor: '#F5FAF9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: step >= 1 ? 1 : 0.4,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div
            style={{
              fontSize: '38px',
              fontWeight: 800,
              color: '#202124',
              letterSpacing: '-0.01em',
            }}
          >
            "Locally optimal decisions. Globally optimal encoding."
          </div>

          <div
            style={{
              fontSize: '24px',
              fontWeight: 700,
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
