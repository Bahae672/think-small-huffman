import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide02ProblemProps {
  step?: number;
}

export const Slide02Problem: React.FC<Slide02ProblemProps> = ({ step = 0 }) => {
  return (
    <SlideLayout
      slideNumber={2}
      title="The Problem: Efficient Image Storage"
      subtitle="Motivation for Lossless Entropy Compression"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: '70px',
          height: '100%',
          alignItems: 'center',
        }}
      >
        {/* Left Column: Context & Core Question */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: '#147D78',
                letterSpacing: '0.06em',
                marginBottom: '12px',
              }}
            >
              Academic Scenario
            </div>
            <div
              style={{
                fontSize: '32px',
                lineHeight: 1.45,
                color: '#202124',
              }}
            >
              Digital platforms host millions of academic assets: logos, lecture diagrams, UI icons, and technical screenshots.
            </div>
          </div>

          <div
            style={{
              padding: '28px 32px',
              backgroundColor: '#FAFAFA',
              borderLeft: '6px solid #147D78',
              borderRadius: '2px',
            }}
          >
            <div
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#147D78',
                marginBottom: '10px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              The Fundamental Constraint
            </div>
            <div style={{ fontSize: '30px', color: '#333333', lineHeight: 1.4 }}>
              Lossy compression alters pixel values and introduces blur around lines and fonts. <strong>Lossless fidelity is mandatory.</strong>
            </div>
          </div>

          <div
            style={{
              padding: '24px 28px',
              backgroundColor: '#F7FCFC',
              border: '2px solid #147D78',
              opacity: step >= 0 ? 1 : 0.4,
              transition: 'opacity 0.4s ease',
            }}
          >
            <div style={{ fontSize: '20px', color: '#147D78', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
              Central Algorithmic Question
            </div>
            <div
              style={{
                fontSize: '36px',
                fontWeight: 700,
                color: '#202124',
                marginTop: '8px',
                lineHeight: 1.35,
              }}
            >
              How can we represent the same image using fewer bits without losing any information?
            </div>
          </div>
        </div>

        {/* Right Column: High-Impact Animated Pipeline & Payload Comparison */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '36px',
          }}
        >
          {/* Data Flow Diagram */}
          <div
            style={{
              padding: '32px 36px',
              border: '2px solid #202124',
              backgroundColor: '#FFFFFF',
            }}
          >
            <div
              style={{
                fontSize: '22px',
                color: '#777777',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '24px',
                fontWeight: 600,
              }}
            >
              Data Flow in Digital Infrastructure
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {[
                { title: 'IMAGE DATA', sub: 'Raw Raster Bytes' },
                { title: 'STORAGE', sub: 'Disk Archive' },
                { title: 'TRANSMISSION', sub: 'Network Bandwidth' },
              ].map((item, idx) => (
                <React.Fragment key={idx}>
                  <div
                    style={{
                      border: '2px solid #202124',
                      padding: '20px 24px',
                      textAlign: 'center',
                      backgroundColor: '#FAFAFA',
                      minWidth: '170px',
                    }}
                  >
                    <div style={{ fontSize: '26px', fontWeight: 700, color: '#202124' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '20px', color: '#777777', marginTop: '6px' }}>
                      {item.sub}
                    </div>
                  </div>
                  {idx < 2 && (
                    <div
                      style={{
                        fontSize: '36px',
                        color: '#147D78',
                        fontWeight: 700,
                        padding: '0 8px',
                      }}
                    >
                      &rarr;
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Large Representation Comparison */}
          <div
            style={{
              padding: '32px 36px',
              border: '2px solid #E0E0E0',
              backgroundColor: '#FAFAFA',
              opacity: step >= 1 ? 1 : 0.35,
              transform: step >= 1 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.4s ease',
            }}
          >
            <div style={{ fontSize: '22px', color: '#777777', marginBottom: '20px', fontWeight: 700, textTransform: 'uppercase' }}>
              Comparison of Payload Representations
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600 }}>Uncompressed Fixed 8-bit Encoding</span>
                  <span style={{ color: '#777777', fontWeight: 600 }}>100% Volume</span>
                </div>
                <div style={{ width: '100%', height: '36px', backgroundColor: '#E0E0E0', border: '1px solid #CCCCCC' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#888888',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '16px',
                      fontSize: '18px',
                      color: '#FFFFFF',
                      fontWeight: 700,
                    }}
                  >
                    UNIFORM 8 BITS PER SYMBOL
                  </div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 700, color: '#147D78' }}>Lossless Variable-Length Entropy (Huffman)</span>
                  <span style={{ color: '#147D78', fontWeight: 700 }}>Compressed Payload</span>
                </div>
                <div style={{ width: '100%', height: '36px', backgroundColor: '#E0E0E0', border: '1px solid #CCCCCC' }}>
                  <div
                    style={{
                      width: '68%',
                      height: '100%',
                      backgroundColor: '#147D78',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '16px',
                      fontSize: '18px',
                      color: '#FFFFFF',
                      fontWeight: 700,
                    }}
                  >
                    FREQUENT: 1–3 BITS | RARE: 8+ BITS
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: '22px',
                color: '#555555',
                fontStyle: 'italic',
                marginTop: '20px',
                textAlign: 'center',
              }}
            >
              Figure 1. Fixed-width representation versus variable-length entropy coding.
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
