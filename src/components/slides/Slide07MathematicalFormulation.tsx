import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide07MathematicalFormulationProps {
  step?: number;
}

export const Slide07MathematicalFormulation: React.FC<Slide07MathematicalFormulationProps> = ({ step = 0 }) => {
  return (
    <SlideLayout
      slideNumber={7}
      title="Theoretical Optimality & Shannon Entropy"
      subtitle="Average Codeword Length versus Entropy Lower Bound"
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
        {/* Top: 2 Main Theoretical Equations */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
          }}
        >
          {/* Average Code Length Card */}
          <div
            style={{
              padding: '32px 36px',
              backgroundColor: '#FAFAFA',
              border: '2px solid #E2E2E2',
              borderTop: '6px solid #147D78',
              opacity: step >= 0 ? 1 : 0.4,
              transition: 'opacity 0.4s ease',
            }}
          >
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#147D78', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
              Average Codeword Length
            </div>
            <div
              style={{
                fontSize: '48px',
                fontFamily: "'Crimson Pro', 'Latin Modern Math', 'Lora', serif",
                fontWeight: 700,
                color: '#202124',
                margin: '12px 0',
              }}
            >
              <span style={{ fontStyle: 'italic' }}>L̄</span> = &sum; (<span style={{ fontStyle: 'italic' }}>p<sub>i</sub></span> &times; <span style={{ fontStyle: 'italic' }}>l<sub>i</sub></span>)
            </div>
            <div style={{ fontSize: '24px', color: '#555555', marginTop: '14px', lineHeight: 1.4 }}>
              Where <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>p<sub>i</sub></span> is symbol probability and <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>l<sub>i</sub></span> is assigned Huffman codeword bit length.
            </div>
          </div>

          {/* Shannon Entropy Card */}
          <div
            style={{
              padding: '32px 36px',
              backgroundColor: '#FAFAFA',
              border: '2px solid #E2E2E2',
              borderTop: '6px solid #202124',
              opacity: step >= 1 ? 1 : 0.35,
              transform: step >= 1 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.4s ease',
            }}
          >
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#202124', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
              Shannon Source Entropy
            </div>
            <div
              style={{
                fontSize: '48px',
                fontFamily: "'Crimson Pro', 'Latin Modern Math', 'Lora', serif",
                fontWeight: 700,
                color: '#202124',
                margin: '12px 0',
              }}
            >
              <span style={{ fontStyle: 'italic' }}>H(X)</span> = &minus;&sum; (<span style={{ fontStyle: 'italic' }}>p<sub>i</sub></span> &times; log<sub>2</sub> <span style={{ fontStyle: 'italic' }}>p<sub>i</sub></span>)
            </div>
            <div style={{ fontSize: '24px', color: '#555555', marginTop: '14px', lineHeight: 1.4 }}>
              Defines the absolute information-theoretic lower bound on lossless compression.
            </div>
          </div>
        </div>

        {/* Central Focal Point: Shannon-Huffman Fundamental Bound */}
        <div
          style={{
            padding: '28px 36px',
            backgroundColor: '#F3F9F9',
            border: '3px solid #147D78',
            textAlign: 'center',
            margin: '20px 0',
            opacity: step >= 2 ? 1 : 0.3,
            transform: step >= 2 ? 'scale(1)' : 'scale(0.98)',
            transition: 'all 0.4s ease',
          }}
        >
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#147D78', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            Fundamental Theoretical Bound
          </div>
          <div
            style={{
              fontSize: '56px',
              fontFamily: "'Crimson Pro', 'Latin Modern Math', 'Lora', serif",
              fontWeight: 800,
              color: '#202124',
              letterSpacing: '0.04em',
            }}
          >
            <span style={{ fontStyle: 'italic' }}>H(X)</span> &le; <span style={{ fontStyle: 'italic', color: '#147D78' }}>L̄</span> &lt; <span style={{ fontStyle: 'italic' }}>H(X)</span> + 1
          </div>
          <div style={{ fontSize: '24px', color: '#444444', marginTop: '8px' }}>
            Huffman Coding achieves an average codeword length within 1 bit of theoretical source entropy.
          </div>
        </div>

        {/* Bottom Quantitative Verification: 6-Symbol Example */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            padding: '24px 32px',
            backgroundColor: '#FFFFFF',
            border: '2px solid #E2E2E2',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#777777', textTransform: 'uppercase' }}>
              Empirical 6-Symbol Distribution (100 Symbols Total)
            </div>
            <div style={{ fontSize: '26px', fontFamily: 'monospace', color: '#202124', marginTop: '6px' }}>
              A(0.45), B(0.13), C(0.12), D(0.16), E(0.09), F(0.05)
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', padding: '0 20px' }}>
              <div style={{ fontSize: '18px', color: '#777777', fontWeight: 600 }}>Entropy Lower Bound</div>
              <div style={{ fontSize: '38px', fontWeight: 800, fontFamily: 'monospace', color: '#202124' }}>
                H(X) &approx; 2.22
              </div>
              <div style={{ fontSize: '18px', color: '#888888' }}>bits / symbol</div>
            </div>

            <div style={{ fontSize: '36px', color: '#147D78', fontWeight: 700 }}>&le;</div>

            <div style={{ textAlign: 'center', padding: '0 20px', backgroundColor: '#E6F4F3', borderRadius: '4px', border: '1px solid #147D78' }}>
              <div style={{ fontSize: '18px', color: '#147D78', fontWeight: 700 }}>Huffman Code Length</div>
              <div style={{ fontSize: '38px', fontWeight: 800, fontFamily: 'monospace', color: '#147D78' }}>
                L̄ = 2.24
              </div>
              <div style={{ fontSize: '18px', color: '#147D78', fontWeight: 600 }}>bits / symbol</div>
            </div>

            <div style={{ fontSize: '36px', color: '#777777', fontWeight: 700 }}>&lt;</div>

            <div style={{ textAlign: 'center', padding: '0 20px' }}>
              <div style={{ fontSize: '18px', color: '#777777', fontWeight: 600 }}>Upper Bound</div>
              <div style={{ fontSize: '38px', fontWeight: 800, fontFamily: 'monospace', color: '#666666' }}>
                3.22
              </div>
              <div style={{ fontSize: '18px', color: '#888888' }}>bits / symbol</div>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
