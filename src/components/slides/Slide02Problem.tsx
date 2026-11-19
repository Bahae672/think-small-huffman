import React from 'react';
import { SlideLayout } from '../SlideLayout';

export const Slide02Problem: React.FC = () => {
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
          gap: '64px',
          height: '100%',
          alignItems: 'center',
        }}
      >
        {/* Left Column: Context & Requirements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: '#147D78',
                letterSpacing: '0.06em',
                marginBottom: '8px',
              }}
            >
              Academic Scenario
            </div>
            <div
              style={{
                fontSize: '21px',
                lineHeight: 1.55,
                color: '#333333',
              }}
            >
              Modern university portals, digital learning repositories, and research platforms
              store and serve millions of graphical assets:
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px',
            }}
          >
            {[
              'University title logos & insignia',
              'Mathematical diagrams & charts',
              'High-contrast UI icons & glyphs',
              'Algorithmic execution screenshots',
              'Digital courseware materials',
              'Vector-rasterized figures',
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '17px',
                  color: '#444444',
                  padding: '8px 12px',
                  backgroundColor: '#F8F9FA',
                  borderLeft: '3px solid #147D78',
                }}
              >
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: '22px 26px',
              backgroundColor: '#FAFAFA',
              border: '1px solid #E4E4E4',
              borderRadius: '2px',
            }}
          >
            <div
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#202124',
                marginBottom: '8px',
                letterSpacing: '0.02em',
              }}
            >
              THE CORE CONFLICT:
            </div>
            <div style={{ fontSize: '19px', color: '#555555', lineHeight: 1.5 }}>
              Raw bitmaps consume massive network bandwidth and disk storage. Yet lossy compression (such as JPEG) destroys crisp line art, induces blur around fonts, and alters exact pixel values.
            </div>
          </div>

          <div
            style={{
              borderLeft: '4px solid #147D78',
              paddingLeft: '20px',
              marginTop: '4px',
            }}
          >
            <div style={{ fontSize: '15px', color: '#777777', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Central Research Question
            </div>
            <div
              style={{
                fontSize: '23px',
                fontWeight: 600,
                color: '#202124',
                marginTop: '6px',
                lineHeight: 1.4,
              }}
            >
              How can we represent the same image information using fewer bits without losing any original information?
            </div>
          </div>
        </div>

        {/* Right Column: Academic Pipeline Diagram & Payload Comparison */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '36px',
          }}
        >
          {/* Minimalist Pipeline Diagram */}
          <div
            style={{
              width: '100%',
              padding: '28px 32px',
              border: '1px solid #E5E5E5',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                color: '#888888',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '20px',
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
                { title: 'IMAGE DATA', sub: 'Uncompressed RGBA8' },
                { title: 'STORAGE', sub: 'File Archive / DB' },
                { title: 'TRANSMISSION', sub: 'HTTP / Client Net' },
              ].map((step, idx) => (
                <React.Fragment key={idx}>
                  <div
                    style={{
                      border: '1px solid #202124',
                      padding: '16px 20px',
                      textAlign: 'center',
                      minWidth: '150px',
                      backgroundColor: '#FAFAFA',
                    }}
                  >
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#202124' }}>
                      {step.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#777777', marginTop: '4px' }}>
                      {step.sub}
                    </div>
                  </div>
                  {idx < 2 && (
                    <div
                      style={{
                        fontSize: '22px',
                        color: '#147D78',
                        fontWeight: 300,
                        padding: '0 8px',
                      }}
                    >
                      →
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Minimalist Comparison Figure */}
          <div
            style={{
              width: '100%',
              padding: '24px 28px',
              border: '1px solid #E5E5E5',
              backgroundColor: '#FAFAFA',
            }}
          >
            <div style={{ fontSize: '13px', color: '#777777', marginBottom: '16px', fontWeight: 600, textTransform: 'uppercase' }}>
              Comparison of Raster Representation Models
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600 }}>Uncompressed 8-bit Fixed Payload (Uniform 8 bits/symbol)</span>
                  <span style={{ color: '#777777' }}>100% Volume</span>
                </div>
                <div style={{ width: '100%', height: '24px', backgroundColor: '#E0E0E0', border: '1px solid #CCCCCC' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#9E9E9E',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '10px',
                      fontSize: '11px',
                      color: '#FFFFFF',
                      fontWeight: 600,
                    }}
                  >
                    RAW BYTES (8 BITS EACH REGARDLESS OF FREQUENCY)
                  </div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: '#147D78' }}>Lossless Variable-Length Entropy Payload (Huffman)</span>
                  <span style={{ color: '#147D78', fontWeight: 600 }}>Significantly Reduced Payload</span>
                </div>
                <div style={{ width: '100%', height: '24px', backgroundColor: '#E0E0E0', border: '1px solid #CCCCCC' }}>
                  <div
                    style={{
                      width: '68%',
                      height: '100%',
                      backgroundColor: '#147D78',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '10px',
                      fontSize: '11px',
                      color: '#FFFFFF',
                      fontWeight: 600,
                    }}
                  >
                    FREQUENT: 1-4 BITS | RARE: 8-12 BITS
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: '13px',
                color: '#666666',
                fontStyle: 'italic',
                marginTop: '16px',
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
