import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide03PNGProps {
  step?: number;
}

export const Slide03PNG: React.FC<Slide03PNGProps> = ({ step = 0 }) => {
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
          gap: '80px',
          height: '100%',
          alignItems: 'center',
        }}
      >
        {/* Left Column: Conceptual & Contextual Explanation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: '#147D78',
                letterSpacing: '0.06em',
                marginBottom: '10px',
              }}
            >
              Industry Standard Context
            </div>
            <div
              style={{
                fontSize: '34px',
                lineHeight: 1.45,
                color: '#202124',
                fontWeight: 600,
              }}
            >
              Portable Network Graphics (PNG) is the foundational lossless image standard across the World Wide Web.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div
              style={{
                padding: '24px 28px',
                border: '2px solid #E2E2E2',
                backgroundColor: '#FAFAFA',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '26px', color: '#202124', marginBottom: '8px' }}>
                Lossless Guarantee
              </div>
              <div style={{ fontSize: '30px', color: '#444444', lineHeight: 1.4 }}>
                PNG preserves exact 24-bit RGB and 32-bit RGBA color definitions byte-for-byte.
              </div>
            </div>

            <div
              style={{
                padding: '24px 28px',
                border: '2px solid #E2E2E2',
                backgroundColor: '#FAFAFA',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '26px', color: '#202124', marginBottom: '8px' }}>
                The DEFLATE Architecture
              </div>
              <div style={{ fontSize: '30px', color: '#444444', lineHeight: 1.4 }}>
                PNG relies on DEFLATE (RFC 1951), coupling dictionary substitution with entropy coding.
              </div>
            </div>

            <div
              style={{
                padding: '24px 28px',
                border: '3px solid #147D78',
                backgroundColor: '#F3F9F9',
                opacity: step >= 1 ? 1 : 0.4,
                transform: step >= 1 ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.4s ease',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '28px', color: '#147D78', marginBottom: '8px' }}>
                Our Focus: The Greedy Core
              </div>
              <div style={{ fontSize: '30px', color: '#202124', lineHeight: 1.4 }}>
                We specifically isolate the <strong>Huffman Coding</strong> stage to analyze its greedy prefix-free tree construction.
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
              maxWidth: '560px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Box 1 */}
            <div
              style={{
                width: '100%',
                padding: '24px 28px',
                border: '2px solid #202124',
                backgroundColor: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#202124', letterSpacing: '0.04em' }}>
                PNG IMAGE DATA
              </div>
              <div style={{ fontSize: '20px', color: '#666666', marginTop: '6px' }}>
                Decoded Uncompressed RGBA Raster
              </div>
            </div>

            <div style={{ fontSize: '32px', color: '#777777', lineHeight: 1, fontWeight: 700 }}>&darr;</div>

            {/* Box 2 */}
            <div
              style={{
                width: '100%',
                padding: '24px 28px',
                border: '2px solid #CCCCCC',
                backgroundColor: '#F8F9FA',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#202124', letterSpacing: '0.04em' }}>
                DEFLATE COMPRESSION
              </div>
              <div style={{ fontSize: '20px', color: '#666666', marginTop: '6px' }}>
                Standard Pipeline (RFC 1951)
              </div>
            </div>

            <div style={{ fontSize: '36px', color: '#147D78', lineHeight: 1, fontWeight: 800 }}>&darr;</div>

            {/* Box 3: HUFFMAN CODING HIGHLIGHT */}
            <div
              style={{
                width: '100%',
                padding: '28px 32px',
                border: '4px solid #147D78',
                backgroundColor: '#F0F9F8',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(20, 125, 120, 0.15)',
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  color: '#147D78',
                  letterSpacing: '0.05em',
                }}
              >
                HUFFMAN CODING
              </div>
              <div style={{ fontSize: '22px', color: '#147D78', marginTop: '8px', fontWeight: 600 }}>
                Greedy Prefix-Free Binary Tree Construction [OUR FOCUS]
              </div>
            </div>

            <div style={{ fontSize: '32px', color: '#777777', lineHeight: 1, fontWeight: 700 }}>&darr;</div>

            {/* Box 4 */}
            <div
              style={{
                width: '100%',
                padding: '24px 28px',
                border: '2px solid #202124',
                backgroundColor: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#202124', letterSpacing: '0.04em' }}>
                BINARY REPRESENTATION
              </div>
              <div style={{ fontSize: '20px', color: '#666666', marginTop: '6px' }}>
                Packed Bitstream Payload
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: '36px',
              maxWidth: '600px',
              fontSize: '22px',
              color: '#555555',
              fontStyle: 'italic',
              lineHeight: 1.45,
              textAlign: 'center',
              borderTop: '2px solid #EEEEEE',
              paddingTop: '16px',
            }}
          >
            "Huffman coding is one component of PNG's DEFLATE compression method; this presentation focuses specifically on its greedy tree-construction algorithm."
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
