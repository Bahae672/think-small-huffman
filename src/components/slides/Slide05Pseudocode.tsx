import React from 'react';
import { SlideLayout } from '../SlideLayout';

export const Slide05Pseudocode: React.FC = () => {
  return (
    <SlideLayout
      slideNumber={5}
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
          padding: '10px 0',
        }}
      >
        {/* Academic Algorithm Frame */}
        <div
          style={{
            width: '100%',
            maxWidth: '1050px',
            fontFamily: "'Crimson Pro', 'Latin Modern Math', 'Lora', 'Times New Roman', serif",
            color: '#000000',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Top Thin Black Horizontal Line */}
          <div style={{ height: '1.2px', backgroundColor: '#000000', width: '100%' }} />

          {/* Algorithm Header */}
          <div
            style={{
              padding: '10px 0 8px 0',
              display: 'flex',
              alignItems: 'baseline',
              fontSize: '22px',
            }}
          >
            <span style={{ fontWeight: 700, fontVariant: 'normal', marginRight: '8px' }}>
              Algorithm 1
            </span>
            <span
              style={{
                fontVariant: 'small-caps',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              Huffman
            </span>
            <span style={{ fontStyle: 'italic', marginLeft: '2px' }}>(C)</span>
          </div>

          {/* Thick Black Horizontal Line Directly Underneath Heading */}
          <div style={{ height: '2.8px', backgroundColor: '#000000', width: '100%' }} />

          {/* Pseudocode Lines Body */}
          <div
            style={{
              padding: '24px 16px',
              fontSize: '21px',
              lineHeight: 2.1,
              letterSpacing: '0.01em',
            }}
          >
            {/* Line 1 */}
            <div style={{ display: 'flex' }}>
              <span style={{ width: '45px', textAlign: 'right', marginRight: '24px', userSelect: 'none', color: '#333333' }}>
                1:
              </span>
              <span>
                <span style={{ fontStyle: 'italic' }}>n</span> := |<span style={{ fontStyle: 'italic' }}>C</span>|;
              </span>
            </div>

            {/* Line 2 */}
            <div style={{ display: 'flex' }}>
              <span style={{ width: '45px', textAlign: 'right', marginRight: '24px', userSelect: 'none', color: '#333333' }}>
                2:
              </span>
              <span>
                <span style={{ fontStyle: 'italic' }}>Q</span> := <span style={{ fontStyle: 'italic' }}>C</span>;
              </span>
            </div>

            {/* Line 3 */}
            <div style={{ display: 'flex' }}>
              <span style={{ width: '45px', textAlign: 'right', marginRight: '24px', userSelect: 'none', color: '#333333' }}>
                3:
              </span>
              <span>
                <strong>for</strong> <span style={{ fontStyle: 'italic' }}>i</span> := 1 <strong>to</strong> <span style={{ fontStyle: 'italic' }}>n</span> − 1 <strong>do</strong>
              </span>
            </div>

            {/* Line 4 */}
            <div style={{ display: 'flex' }}>
              <span style={{ width: '45px', textAlign: 'right', marginRight: '24px', userSelect: 'none', color: '#333333' }}>
                4:
              </span>
              <span style={{ paddingLeft: '38px' }}>
                allocate a new node <span style={{ fontStyle: 'italic' }}>z</span>
              </span>
            </div>

            {/* Line 5 */}
            <div style={{ display: 'flex' }}>
              <span style={{ width: '45px', textAlign: 'right', marginRight: '24px', userSelect: 'none', color: '#333333' }}>
                5:
              </span>
              <span style={{ paddingLeft: '38px' }}>
                <span style={{ fontStyle: 'italic' }}>z</span>.<span style={{ fontStyle: 'italic' }}>left</span> := <span style={{ fontStyle: 'italic' }}>x</span> := <span style={{ fontVariant: 'small-caps' }}>Extract-Min</span>(<span style={{ fontStyle: 'italic' }}>Q</span>);
              </span>
            </div>

            {/* Line 6 */}
            <div style={{ display: 'flex' }}>
              <span style={{ width: '45px', textAlign: 'right', marginRight: '24px', userSelect: 'none', color: '#333333' }}>
                6:
              </span>
              <span style={{ paddingLeft: '38px' }}>
                <span style={{ fontStyle: 'italic' }}>z</span>.<span style={{ fontStyle: 'italic' }}>right</span> := <span style={{ fontStyle: 'italic' }}>y</span> := <span style={{ fontVariant: 'small-caps' }}>Extract-Min</span>(<span style={{ fontStyle: 'italic' }}>Q</span>);
              </span>
            </div>

            {/* Line 7 */}
            <div style={{ display: 'flex' }}>
              <span style={{ width: '45px', textAlign: 'right', marginRight: '24px', userSelect: 'none', color: '#333333' }}>
                7:
              </span>
              <span style={{ paddingLeft: '38px' }}>
                <span style={{ fontStyle: 'italic' }}>z</span>.<span style={{ fontStyle: 'italic' }}>freq</span> := <span style={{ fontStyle: 'italic' }}>x</span>.<span style={{ fontStyle: 'italic' }}>freq</span> + <span style={{ fontStyle: 'italic' }}>y</span>.<span style={{ fontStyle: 'italic' }}>freq</span>;
              </span>
            </div>

            {/* Line 8 */}
            <div style={{ display: 'flex' }}>
              <span style={{ width: '45px', textAlign: 'right', marginRight: '24px', userSelect: 'none', color: '#333333' }}>
                8:
              </span>
              <span style={{ paddingLeft: '38px' }}>
                <span style={{ fontVariant: 'small-caps' }}>Insert</span>(<span style={{ fontStyle: 'italic' }}>Q</span>, <span style={{ fontStyle: 'italic' }}>z</span>);
              </span>
            </div>

            {/* Line 9 */}
            <div style={{ display: 'flex' }}>
              <span style={{ width: '45px', textAlign: 'right', marginRight: '24px', userSelect: 'none', color: '#333333' }}>
                9:
              </span>
              <span>
                <strong>end for</strong>
              </span>
            </div>

            {/* Line 10 */}
            <div style={{ display: 'flex' }}>
              <span style={{ width: '45px', textAlign: 'right', marginRight: '24px', userSelect: 'none', color: '#333333' }}>
                10:
              </span>
              <span>
                <strong>return</strong> <span style={{ fontVariant: 'small-caps' }}>Extract-Min</span>(<span style={{ fontStyle: 'italic' }}>Q</span>); <span style={{ color: '#555555', fontStyle: 'italic', marginLeft: '16px' }}>&#123;return the root of the tree&#125;</span>
              </span>
            </div>
          </div>

          {/* Bottom Thin Black Horizontal Line */}
          <div style={{ height: '1.2px', backgroundColor: '#000000', width: '100%' }} />

          {/* Clarification Note Underneath */}
          <div
            style={{
              paddingTop: '14px',
              fontSize: '16px',
              fontStyle: 'italic',
              color: '#444444',
              fontFamily: "'Inter', sans-serif",
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Note: <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>Q</span> denotes a min-priority queue keyed by symbol frequency.</span>
            <span style={{ color: '#147D78', fontWeight: 500 }}>Lines 5–6 implement the greedy choice.</span>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
