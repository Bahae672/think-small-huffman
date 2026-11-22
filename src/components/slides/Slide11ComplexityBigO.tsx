import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide11ComplexityBigOProps {
  step?: number;
}

export const Slide11ComplexityBigO: React.FC<Slide11ComplexityBigOProps> = ({ step = 0 }) => {
  const currentStep = Math.min(2, Math.max(0, step));

  const pipelineSteps = [
    {
      num: '01',
      title: 'Count Frequencies',
      complexity: 'O(N)',
      desc: 'Scan all N image bytes once to count how often each value appears.',
      detail: '1 pass over the image pixels',
      highlight: false,
    },
    {
      num: '02',
      title: 'Initialize Min-Heap',
      complexity: 'O(k)',
      desc: 'Insert the k unique byte values into a min-priority queue.',
      detail: 'At most k = 256 unique byte values',
      highlight: false,
    },
    {
      num: '03',
      title: 'Build Huffman Tree',
      complexity: 'O(k log k)',
      desc: 'Repeatedly extract the 2 smallest nodes and merge them (k − 1 times).',
      detail: 'k − 1 merges × O(log k) heap step',
      highlight: true,
    },
  ];

  return (
    <SlideLayout
      slideNumber={11}
      totalSlides={14}
      title="Computational Complexity"
      subtitle="How Fast Is Huffman Coding on Real Images?"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        {/* Top Simple Variable Legend */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '28px',
            animation: 'fadeUp 0.5s ease both',
          }}
        >
          <div
            style={{
              backgroundColor: '#FAFAFA',
              border: '2px solid #202124',
              padding: '18px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#202124',
                color: '#FFFFFF',
                fontFamily: 'serif',
                fontStyle: 'italic',
                fontSize: '32px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                flexShrink: 0,
              }}
            >
              N
            </div>
            <div>
              <div style={{ fontSize: '23px', fontWeight: 800, color: '#202124' }}>
                Total Pixels / Bytes in Image
              </div>
              <div style={{ fontSize: '18px', color: '#555555', marginTop: '2px' }}>
                Large number — e.g., <strong>2,000,000+ bytes</strong> in a standard photo
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#F4FAF9',
              border: '2px solid #147D78',
              padding: '18px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#147D78',
                color: '#FFFFFF',
                fontFamily: 'serif',
                fontStyle: 'italic',
                fontSize: '32px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                flexShrink: 0,
              }}
            >
              k
            </div>
            <div>
              <div style={{ fontSize: '23px', fontWeight: 800, color: '#147D78' }}>
                Unique Byte Symbols
              </div>
              <div style={{ fontSize: '18px', color: '#444444', marginTop: '2px' }}>
                Tiny constant cap — at most <strong>k &le; 256</strong> possible byte values (0–255)
              </div>
            </div>
          </div>
        </div>

        {/* Middle: 3-Step Visual Complexity Pipeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 40px 1fr 40px 1fr',
            alignItems: 'stretch',
            gap: '8px',
          }}
        >
          {pipelineSteps.map((item, idx) => (
            <React.Fragment key={item.num}>
              <div
                style={{
                  border: item.highlight ? '3px solid #147D78' : '2px solid #202124',
                  backgroundColor: item.highlight ? '#F4FAF9' : '#FFFFFF',
                  padding: '28px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: item.highlight
                    ? '8px 8px 0px rgba(20, 125, 120, 0.16)'
                    : '6px 6px 0px rgba(0, 0, 0, 0.05)',
                  animation: `fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.14}s both`,
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '14px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 800,
                        color: item.highlight ? '#147D78' : '#777777',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      STEP {item.num}
                    </span>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '30px',
                        fontWeight: 800,
                        color: item.highlight ? '#FFFFFF' : '#147D78',
                        backgroundColor: item.highlight ? '#147D78' : '#E6F4F3',
                        padding: '6px 16px',
                        borderRadius: '4px',
                      }}
                    >
                      {item.complexity}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: '28px',
                      fontWeight: 800,
                      color: '#202124',
                      marginBottom: '12px',
                    }}
                  >
                    {item.title}
                  </div>

                  <div style={{ fontSize: '20px', color: '#444444', lineHeight: 1.45 }}>
                    {item.desc}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '20px',
                    paddingTop: '14px',
                    borderTop: '1.5px dashed #D0D0D0',
                    fontFamily: 'monospace',
                    fontSize: '17px',
                    fontWeight: 700,
                    color: item.highlight ? '#147D78' : '#666666',
                  }}
                >
                  &rarr; {item.detail}
                </div>
              </div>

              {idx < 2 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    fontWeight: 800,
                    color: '#147D78',
                  }}
                >
                  +
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom: Progressive Total Time & Space Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '28px' }}>
          {/* Total Time Card */}
          <div
            style={{
              border: '3px solid #147D78',
              backgroundColor: currentStep >= 1 ? '#FFFFFF' : '#FAFAFA',
              padding: '22px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              opacity: currentStep >= 1 ? 1 : 0.28,
              transform: currentStep >= 1 ? 'translateY(0)' : 'translateY(8px)',
              boxShadow: currentStep >= 1 ? '8px 8px 0px rgba(20, 125, 120, 0.15)' : 'none',
              transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 800,
                  color: '#147D78',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Total Time Complexity
              </div>
              <div
                style={{
                  fontSize: '42px',
                  fontWeight: 800,
                  color: '#202124',
                  fontFamily: 'monospace',
                  margin: '4px 0 8px 0',
                }}
              >
                O(N + k log k)
              </div>
              <div style={{ fontSize: '19px', color: '#444444', lineHeight: 1.4 }}>
                Since <strong>N &gt;&gt; k</strong>, building the 256-node tree takes <strong>under 0.1 ms</strong>.
              </div>
            </div>
          </div>

          {/* Space Complexity Card */}
          <div
            style={{
              border: '2px solid #202124',
              backgroundColor: currentStep >= 2 ? '#FFFFFF' : '#FAFAFA',
              padding: '22px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              opacity: currentStep >= 2 ? 1 : 0.28,
              transform: currentStep >= 2 ? 'translateY(0)' : 'translateY(8px)',
              boxShadow: currentStep >= 2 ? '8px 8px 0px rgba(0, 0, 0, 0.06)' : 'none',
              transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                fontWeight: 800,
                color: '#666666',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Extra Memory (Space)
            </div>
            <div
              style={{
                fontSize: '42px',
                fontWeight: 800,
                color: '#147D78',
                fontFamily: 'monospace',
                margin: '4px 0 8px 0',
              }}
            >
              O(k)
            </div>
            <div style={{ fontSize: '19px', color: '#444444', lineHeight: 1.4 }}>
              Stores at most <strong>2k &minus; 1 = 511</strong> tree nodes (&lt; 4 KB of RAM).
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
