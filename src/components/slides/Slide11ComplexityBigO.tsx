import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide11ComplexityBigOProps {
  step?: number;
}

export const Slide11ComplexityBigO: React.FC<Slide11ComplexityBigOProps> = ({ step = 0 }) => {
  const currentStep = Math.min(2, Math.max(0, step));

  return (
    <SlideLayout
      slideNumber={11}
      totalSlides={14}
      title="Computational Complexity: Big-O Analysis"
      subtitle="Asymptotic Runtime and Auxiliary Space Bounds in Image Processing"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        {/* Context parameters */}
        <div style={{ fontSize: '28px', color: '#444444', lineHeight: 1.4 }}>
          Let <span style={{ fontStyle: 'italic', fontFamily: 'serif', fontWeight: 700 }}>N</span> denote the total
          image pixel byte stream, and{' '}
          <span style={{ fontStyle: 'italic', fontFamily: 'serif', fontWeight: 700 }}>k</span> denote the alphabet size
          (distinct symbol count, <span style={{ fontFamily: 'serif' }}>k &le; 256</span> for 8-bit image channels).
        </div>

        {/* 4-Stage Breakdown Table */}
        <div
          style={{
            backgroundColor: '#FAFAFA',
            border: '2px solid #202124',
            boxShadow: '6px 6px 0px rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '24px',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '3px solid #202124', backgroundColor: '#F0F0F0' }}>
                <th style={{ padding: '16px 24px', fontWeight: 800 }}>Algorithmic Stage</th>
                <th style={{ padding: '16px 24px', fontWeight: 800 }}>Primary Operation</th>
                <th style={{ padding: '16px 24px', textAlign: 'right', fontWeight: 800 }}>Time Complexity</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E0E0E0', backgroundColor: '#FFFFFF' }}>
                <td style={{ padding: '18px 24px', fontWeight: 700 }}>1. Frequency Histogram</td>
                <td style={{ padding: '18px 24px', color: '#555' }}>Single linear pass over raw pixel data stream</td>
                <td style={{ padding: '18px 24px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 800 }}>
                  O(N)
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E0E0E0', backgroundColor: '#FFFFFF' }}>
                <td style={{ padding: '18px 24px', fontWeight: 700 }}>2. Priority Queue Init</td>
                <td style={{ padding: '18px 24px', color: '#555' }}>
                  Bottom-up heapify of <em>k</em> distinct symbols (<span style={{ fontVariant: 'small-caps' }}>Build-Min-Heap</span>)
                </td>
                <td style={{ padding: '18px 24px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 800 }}>
                  O(k)
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E0E0E0', backgroundColor: '#EBF7F6' }}>
                <td style={{ padding: '18px 24px', fontWeight: 800, color: '#147D78' }}>
                  3. Greedy Tree Construction
                </td>
                <td style={{ padding: '18px 24px', color: '#147D78' }}>
                  (k - 1) iterations of 2 &times; Extract-Min + 1 &times; Insert
                </td>
                <td
                  style={{
                    padding: '18px 24px',
                    textAlign: 'right',
                    fontFamily: 'monospace',
                    fontWeight: 800,
                    color: '#147D78',
                    fontSize: '28px',
                  }}
                >
                  O(k log k)
                </td>
              </tr>
              <tr style={{ backgroundColor: '#FFFFFF' }}>
                <td style={{ padding: '18px 24px', fontWeight: 700 }}>4. Codeword Generation</td>
                <td style={{ padding: '18px 24px', color: '#555' }}>Depth-First Search (DFS) traversal of completed tree</td>
                <td style={{ padding: '18px 24px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 800 }}>
                  O(k)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dynamic Cards: Overall Time and Space Bounds */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px' }}>
          {/* Total Time Complexity */}
          <div
            style={{
              border: '2px solid #202124',
              backgroundColor: currentStep >= 1 ? '#FFFFFF' : '#FAFAFA',
              padding: '24px 32px',
              opacity: currentStep >= 1 ? 1 : 0.4,
              transition: 'opacity 0.3s ease',
              boxShadow: currentStep >= 1 ? '6px 6px 0px rgba(20,125,120,0.15)' : 'none',
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>
              Overall Time Complexity
            </div>
            <div
              style={{
                fontSize: '44px',
                fontWeight: 800,
                color: '#147D78',
                fontFamily: 'monospace',
                margin: '8px 0',
              }}
            >
              O(N + k log k)
            </div>
            <div style={{ fontSize: '20px', color: '#444', lineHeight: 1.45 }}>
              In image compression, <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>N &gt;&gt; k</span>{' '}
              (e.g., a 1080p frame has <span style={{ fontFamily: 'monospace' }}>N &approx; 2.07 &times; 10⁶</span> pixels while{' '}
              <span style={{ fontFamily: 'monospace' }}>k &le; 256</span>). The linear <span style={{ fontFamily: 'monospace' }}>O(N)</span> scan
              dominates wall-clock time; tree generation is negligible.
            </div>
          </div>

          {/* Auxiliary Space */}
          <div
            style={{
              border: '2px solid #202124',
              backgroundColor: currentStep >= 2 ? '#FFFFFF' : '#FAFAFA',
              padding: '24px 32px',
              opacity: currentStep >= 2 ? 1 : 0.4,
              transition: 'opacity 0.3s ease',
              boxShadow: currentStep >= 2 ? '6px 6px 0px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>
              Auxiliary Space Complexity
            </div>
            <div
              style={{
                fontSize: '44px',
                fontWeight: 800,
                color: '#202124',
                fontFamily: 'monospace',
                margin: '8px 0',
              }}
            >
              O(k)
            </div>
            <div style={{ fontSize: '20px', color: '#444', lineHeight: 1.45 }}>
              Stores frequency table, heap structure, and final binary tree containing exactly{' '}
              <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>2k - 1</span> nodes (at most 511 nodes for byte
              alphabets). Minimal working memory footprint.
            </div>
          </div>
        </div>

        {/* Bottom takeaway */}
        <div
          style={{
            borderLeft: '6px solid #147D78',
            backgroundColor: '#F4FAF9',
            padding: '16px 24px',
            fontSize: '22px',
            color: '#202124',
            fontWeight: 600,
          }}
        >
          <strong>Practical Real-World Implication:</strong> High-throughput encoding handles megapixel images in near-linear time since tree synthesis operates entirely in CPU L1 cache.
        </div>
      </div>
    </SlideLayout>
  );
};
