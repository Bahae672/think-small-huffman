import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide06PseudocodeProps {
  step?: number;
}

export const Slide06Pseudocode: React.FC<Slide06PseudocodeProps> = ({ step = 0 }) => {
  return (
    <SlideLayout
      slideNumber={6}
      totalSlides={14}
      title="Algorithm 1 — Huffman(C)"
      subtitle="Formal Academic Specification (Cormen et al., CLRS)"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        {/* Academic Algorithm Frame */}
        <div
          style={{
            width: '100%',
            maxWidth: '1320px',
            fontFamily: "'Crimson Pro', 'Latin Modern Math', 'Lora', 'Times New Roman', serif",
            color: '#000000',
            backgroundColor: '#FFFFFF',
            animation: 'fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
          }}
        >
          {/* Top Thin Black Horizontal Line */}
          <div style={{ height: '2px', backgroundColor: '#000000', width: '100%' }} />

          {/* Algorithm Heading */}
          <div
            style={{
              padding: '14px 0 12px 0',
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              fontSize: '32px',
            }}
          >
            <div>
              <span style={{ fontWeight: 700, marginRight: '12px' }}>Algorithm 1</span>
              <span
                style={{
                  fontVariant: 'small-caps',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              >
                Huffman
              </span>
              <span style={{ fontStyle: 'italic', marginLeft: '4px' }}>(C)</span>
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                fontWeight: 700,
                color: '#147D78',
                backgroundColor: '#E6F4F3',
                padding: '4px 12px',
                borderRadius: '4px',
              }}
            >
              Step {step} / 2
            </span>
          </div>

          {/* Thick Black Horizontal Line Directly Underneath Heading */}
          <div style={{ height: '4px', backgroundColor: '#000000', width: '100%' }} />

          {/* Pseudocode Lines Body */}
          <div
            style={{
              padding: '22px 20px',
              fontSize: '28px',
              lineHeight: 1.95,
              letterSpacing: '0.01em',
            }}
          >
            {/* Line 1 */}
            <div style={{ display: 'flex', padding: '2px 10px' }}>
              <span style={{ width: '60px', textAlign: 'right', marginRight: '32px', userSelect: 'none', color: '#555555' }}>
                1:
              </span>
              <span>
                <span style={{ fontStyle: 'italic' }}>n</span> := |<span style={{ fontStyle: 'italic' }}>C</span>|;
              </span>
            </div>

            {/* Line 2 */}
            <div style={{ display: 'flex', padding: '2px 10px' }}>
              <span style={{ width: '60px', textAlign: 'right', marginRight: '32px', userSelect: 'none', color: '#555555' }}>
                2:
              </span>
              <span>
                <span style={{ fontStyle: 'italic' }}>Q</span> := <span style={{ fontStyle: 'italic' }}>C</span>;
              </span>
            </div>

            {/* Line 3 */}
            <div style={{ display: 'flex', padding: '2px 10px' }}>
              <span style={{ width: '60px', textAlign: 'right', marginRight: '32px', userSelect: 'none', color: '#555555' }}>
                3:
              </span>
              <span>
                <strong>for</strong> <span style={{ fontStyle: 'italic' }}>i</span> := 1 <strong>to</strong> <span style={{ fontStyle: 'italic' }}>n</span> &minus; 1 <strong>do</strong>
              </span>
            </div>

            {/* Line 4 */}
            <div style={{ display: 'flex', padding: '2px 10px' }}>
              <span style={{ width: '60px', textAlign: 'right', marginRight: '32px', userSelect: 'none', color: '#555555' }}>
                4:
              </span>
              <span style={{ paddingLeft: '48px' }}>
                allocate a new node <span style={{ fontStyle: 'italic' }}>z</span>
              </span>
            </div>

            {/* Line 5 (GREEDY CHOICE) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2px 14px 2px 10px',
                backgroundColor: step >= 1 ? '#EBF7F6' : 'transparent',
                borderLeft: step >= 1 ? '5px solid #147D78' : '5px solid transparent',
                borderRadius: '2px',
                transition: 'all 0.35s ease',
              }}
            >
              <div style={{ display: 'flex' }}>
                <span style={{ width: '60px', textAlign: 'right', marginRight: '32px', userSelect: 'none', color: step >= 1 ? '#147D78' : '#555555', fontWeight: step >= 1 ? 700 : 400 }}>
                  5:
                </span>
                <span style={{ paddingLeft: '48px', color: step >= 1 ? '#147D78' : '#000000', fontWeight: step >= 1 ? 700 : 400 }}>
                  <span style={{ fontStyle: 'italic' }}>z</span>.<span style={{ fontStyle: 'italic' }}>left</span> := <span style={{ fontStyle: 'italic' }}>x</span> := <span style={{ fontVariant: 'small-caps' }}>Extract-Min</span>(<span style={{ fontStyle: 'italic' }}>Q</span>);
                </span>
              </div>
              {step >= 1 && (
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#147D78',
                    animation: 'fadeIn 0.35s ease both',
                  }}
                >
                  &larr; Greedy Choice (1st Minimum)
                </span>
              )}
            </div>

            {/* Line 6 (GREEDY CHOICE) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2px 14px 2px 10px',
                backgroundColor: step >= 1 ? '#EBF7F6' : 'transparent',
                borderLeft: step >= 1 ? '5px solid #147D78' : '5px solid transparent',
                borderRadius: '2px',
                transition: 'all 0.35s ease',
              }}
            >
              <div style={{ display: 'flex' }}>
                <span style={{ width: '60px', textAlign: 'right', marginRight: '32px', userSelect: 'none', color: step >= 1 ? '#147D78' : '#555555', fontWeight: step >= 1 ? 700 : 400 }}>
                  6:
                </span>
                <span style={{ paddingLeft: '48px', color: step >= 1 ? '#147D78' : '#000000', fontWeight: step >= 1 ? 700 : 400 }}>
                  <span style={{ fontStyle: 'italic' }}>z</span>.<span style={{ fontStyle: 'italic' }}>right</span> := <span style={{ fontStyle: 'italic' }}>y</span> := <span style={{ fontVariant: 'small-caps' }}>Extract-Min</span>(<span style={{ fontStyle: 'italic' }}>Q</span>);
                </span>
              </div>
              {step >= 1 && (
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#147D78',
                    animation: 'fadeIn 0.35s ease both',
                  }}
                >
                  &larr; Greedy Choice (2nd Minimum)
                </span>
              )}
            </div>

            {/* Line 7 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2px 14px 2px 10px',
                backgroundColor: step >= 2 ? '#F5F7F7' : 'transparent',
                borderLeft: step >= 2 ? '5px solid #202124' : '5px solid transparent',
                transition: 'all 0.35s ease',
              }}
            >
              <div style={{ display: 'flex' }}>
                <span style={{ width: '60px', textAlign: 'right', marginRight: '32px', userSelect: 'none', color: '#555555' }}>
                  7:
                </span>
                <span style={{ paddingLeft: '48px', fontWeight: step >= 2 ? 700 : 400 }}>
                  <span style={{ fontStyle: 'italic' }}>z</span>.<span style={{ fontStyle: 'italic' }}>freq</span> := <span style={{ fontStyle: 'italic' }}>x</span>.<span style={{ fontStyle: 'italic' }}>freq</span> + <span style={{ fontStyle: 'italic' }}>y</span>.<span style={{ fontStyle: 'italic' }}>freq</span>;
                </span>
              </div>
              {step >= 2 && (
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#444444',
                    animation: 'fadeIn 0.35s ease both',
                  }}
                >
                  &larr; Combine Frequencies
                </span>
              )}
            </div>

            {/* Line 8 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2px 14px 2px 10px',
                backgroundColor: step >= 2 ? '#F5F7F7' : 'transparent',
                borderLeft: step >= 2 ? '5px solid #202124' : '5px solid transparent',
                transition: 'all 0.35s ease',
              }}
            >
              <div style={{ display: 'flex' }}>
                <span style={{ width: '60px', textAlign: 'right', marginRight: '32px', userSelect: 'none', color: '#555555' }}>
                  8:
                </span>
                <span style={{ paddingLeft: '48px', fontWeight: step >= 2 ? 700 : 400 }}>
                  <span style={{ fontVariant: 'small-caps' }}>Insert</span>(<span style={{ fontStyle: 'italic' }}>Q</span>, <span style={{ fontStyle: 'italic' }}>z</span>);
                </span>
              </div>
              {step >= 2 && (
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#444444',
                    animation: 'fadeIn 0.35s ease both',
                  }}
                >
                  &larr; Reinsert Composite Node
                </span>
              )}
            </div>

            {/* Line 9 */}
            <div style={{ display: 'flex', padding: '2px 10px' }}>
              <span style={{ width: '60px', textAlign: 'right', marginRight: '32px', userSelect: 'none', color: '#555555' }}>
                9:
              </span>
              <span>
                <strong>end for</strong>
              </span>
            </div>

            {/* Line 10 */}
            <div
              style={{
                display: 'flex',
                padding: '2px 10px',
                backgroundColor: step >= 2 ? '#EBF7F6' : 'transparent',
                borderLeft: step >= 2 ? '5px solid #147D78' : '5px solid transparent',
                borderRadius: '2px',
                transition: 'all 0.35s ease',
              }}
            >
              <span style={{ width: '60px', textAlign: 'right', marginRight: '32px', userSelect: 'none', color: '#555555' }}>
                10:
              </span>
              <span style={{ fontWeight: step >= 2 ? 700 : 400 }}>
                <strong>return</strong> <span style={{ fontVariant: 'small-caps' }}>Extract-Min</span>(<span style={{ fontStyle: 'italic' }}>Q</span>); <span style={{ color: '#555555', fontStyle: 'italic', marginLeft: '24px', fontWeight: 400 }}>&#123;return the root of the tree&#125;</span>
              </span>
            </div>
          </div>

          {/* Bottom Thin Black Horizontal Line */}
          <div style={{ height: '2px', backgroundColor: '#000000', width: '100%' }} />

          {/* Clarification Note Underneath */}
          <div
            style={{
              paddingTop: '20px',
              fontSize: '24px',
              fontStyle: 'italic',
              color: '#444444',
              fontFamily: "'Inter', sans-serif",
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Note: <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>Q</span> denotes a min-priority queue keyed by symbol frequency.</span>
            <span style={{ color: '#147D78', fontWeight: 600 }}>Lines 5–6 implement the greedy choice.</span>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
