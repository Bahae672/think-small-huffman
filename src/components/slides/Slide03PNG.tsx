import React from 'react';
import { SlideLayout } from '../SlideLayout';

export const Slide03PNG: React.FC = () => {
  return (
    <SlideLayout
      slideNumber={3}
      title="Huffman Coding in PNG"
      subtitle="Architectural Context within the Lossless Pipeline"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '64px',
          height: '100%',
          alignItems: 'center',
        }}
      >
        {/* Left Column: Conceptual & Contextual Explanation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
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
              Industry Standard Context
            </div>
            <div
              style={{
                fontSize: '22px',
                lineHeight: 1.5,
                color: '#202124',
                fontWeight: 500,
              }}
            >
              Portable Network Graphics (PNG) is the dominant lossless image standard across the World Wide Web, designed specifically to replace GIF and uncompressed raster formats.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                padding: '18px 22px',
                border: '1px solid #E2E2E2',
                backgroundColor: '#FAFAFA',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '17px', color: '#202124', marginBottom: '6px' }}>
                Lossless Guarantee
              </div>
              <div style={{ fontSize: '16px', color: '#555555', lineHeight: 1.5 }}>
                PNG preserves exact 24-bit RGB and 32-bit RGBA color definitions. Every individual pixel rasterized at decoding matches the source raster byte-for-byte.
              </div>
            </div>

            <div
              style={{
                padding: '18px 22px',
                border: '1px solid #E2E2E2',
                backgroundColor: '#FAFAFA',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '17px', color: '#202124', marginBottom: '6px' }}>
                The DEFLATE Architecture
              </div>
              <div style={{ fontSize: '16px', color: '#555555', lineHeight: 1.5 }}>
                PNG relies on the DEFLATE compression algorithm (RFC 1951). DEFLATE combines dictionary-based substitution with entropy encoding.
              </div>
            </div>

            <div
              style={{
                padding: '18px 22px',
                border: '1px solid #147D78',
                backgroundColor: '#F3F9F9',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '17px', color: '#147D78', marginBottom: '6px' }}>
                Scope of Our Exploration: The Greedy Core
              </div>
              <div style={{ fontSize: '16px', color: '#333333', lineHeight: 1.5 }}>
                Our investigation specifically isolates the <strong>Huffman Coding</strong> stage of this pipeline. We study how greedy tree construction assigns optimal prefix-free codes to symbol frequencies.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Vertical Architecture Pipeline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {/* Box 1: PNG IMAGE DATA */}
            <div
              style={{
                width: '100%',
                padding: '20px 24px',
                border: '1px solid #CCCCCC',
                backgroundColor: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#202124', letterSpacing: '0.04em' }}>
                PNG IMAGE DATA
              </div>
              <div style={{ fontSize: '13px', color: '#777777', marginTop: '4px' }}>
                Source RGB / RGBA Pixel Stream
              </div>
            </div>

            <div style={{ fontSize: '20px', color: '#777777', lineHeight: 1 }}>↓</div>

            {/* Box 2: DEFLATE COMPRESSION */}
            <div
              style={{
                width: '100%',
                padding: '20px 24px',
                border: '1px solid #CCCCCC',
                backgroundColor: '#F8F9FA',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#202124', letterSpacing: '0.04em' }}>
                DEFLATE COMPRESSION
              </div>
              <div style={{ fontSize: '13px', color: '#777777', marginTop: '4px' }}>
                Standard Compression Pipeline (RFC 1951)
              </div>
            </div>

            <div style={{ fontSize: '20px', color: '#147D78', lineHeight: 1, fontWeight: 700 }}>↓</div>

            {/* Box 3: HUFFMAN CODING (HIGHLIGHTED IN TEAL) */}
            <div
              style={{
                width: '100%',
                padding: '24px 28px',
                border: '2px solid #147D78',
                backgroundColor: '#F0F9F8',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(20, 125, 120, 0.1)',
              }}
            >
              <div
                style={{
                  fontSize: '19px',
                  fontWeight: 700,
                  color: '#147D78',
                  letterSpacing: '0.05em',
                }}
              >
                HUFFMAN CODING
              </div>
              <div style={{ fontSize: '13px', color: '#147D78', marginTop: '6px', fontWeight: 500 }}>
                Greedy Prefix-Free Binary Tree Construction [OUR FOCUS]
              </div>
            </div>

            <div style={{ fontSize: '20px', color: '#777777', lineHeight: 1 }}>↓</div>

            {/* Box 4: BINARY REPRESENTATION */}
            <div
              style={{
                width: '100%',
                padding: '20px 24px',
                border: '1px solid #CCCCCC',
                backgroundColor: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#202124', letterSpacing: '0.04em' }}>
                BINARY REPRESENTATION
              </div>
              <div style={{ fontSize: '13px', color: '#777777', marginTop: '4px' }}>
                Packed Bitstream Payload
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: '28px',
              maxWidth: '520px',
              fontSize: '12.5px',
              color: '#777777',
              fontStyle: 'italic',
              lineHeight: 1.5,
              textAlign: 'center',
              borderTop: '1px solid #EEEEEE',
              paddingTop: '12px',
            }}
          >
            "Huffman coding is one component of PNG's DEFLATE compression method; this presentation focuses specifically on its greedy tree-construction algorithm."
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
