import React from 'react';
import { SlideLayout } from '../SlideLayout';

export const Slide07MathematicalFormulation: React.FC = () => {
  return (
    <SlideLayout
      slideNumber={7}
      title="Encoding Cost"
      subtitle="Mathematical Formulation &amp; Compression Efficiency"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 40px',
        }}
      >
        {/* Large Centered Equation Box */}
        <div
          style={{
            width: '100%',
            maxWidth: '1100px',
            padding: '32px 40px',
            backgroundColor: '#FAFAFA',
            border: '1px solid #E5E5E5',
            textAlign: 'center',
            marginTop: '10px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: '#777777',
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}
          >
            Cost Objective Function (Total Payload Length)
          </div>

          <div
            style={{
              fontSize: '52px',
              fontFamily: "'Crimson Pro', 'Latin Modern Math', 'Lora', serif",
              fontWeight: 600,
              color: '#202124',
              letterSpacing: '0.02em',
            }}
          >
            <span style={{ fontStyle: 'italic' }}>B</span> = &sum; (<span style={{ fontStyle: 'italic' }}>f<sub>i</sub></span> &times; <span style={{ fontStyle: 'italic' }}>l<sub>i</sub></span>)
          </div>

          <div
            style={{
              marginTop: '18px',
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              fontSize: '16px',
              color: '#555555',
            }}
          >
            <span><strong style={{ color: '#202124' }}>B</strong> : total number of encoded bits</span>
            <span><strong style={{ color: '#202124' }}>f<sub>i</sub></strong> : frequency of symbol i</span>
            <span><strong style={{ color: '#202124' }}>l<sub>i</sub></strong> : length of binary codeword for symbol i</span>
          </div>
        </div>

        {/* 6-Symbol Example Quantitative Evaluation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            width: '100%',
            maxWidth: '1100px',
            margin: '24px 0',
          }}
        >
          {/* Method Comparison Card */}
          <div
            style={{
              padding: '24px 28px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
            }}
          >
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#202124', textTransform: 'uppercase', marginBottom: '16px' }}>
              Encoding Scheme Comparison (100 Symbols)
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '17px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #202124' }}>
                  <th style={{ padding: '8px 0', textAlign: 'left', fontWeight: 600 }}>Encoding Method</th>
                  <th style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600 }}>Bits Required</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #ECECEC' }}>
                  <td style={{ padding: '12px 0', color: '#555555' }}>
                    Fixed-length encoding (3 bits &times; 100)
                  </td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontFamily: 'monospace', fontSize: '18px' }}>
                    300
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ECECEC', backgroundColor: '#F4FAF9' }}>
                  <td style={{ padding: '12px 0', fontWeight: 600, color: '#147D78' }}>
                    Huffman variable-length encoding
                  </td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontFamily: 'monospace', fontSize: '20px', fontWeight: 700, color: '#147D78' }}>
                    224
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={{ fontSize: '13px', color: '#777777', marginTop: '14px', lineHeight: 1.5 }}>
              Huffman sum: (45&times;1) + (13&times;3) + (12&times;3) + (16&times;3) + (9&times;4) + (5&times;4) = 45 + 39 + 36 + 48 + 36 + 20 = 224 bits.
            </div>
          </div>

          {/* Savings Calculation Card */}
          <div
            style={{
              padding: '24px 28px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#202124', textTransform: 'uppercase', marginBottom: '8px' }}>
                Mathematical Savings Calculation
              </div>
              <div style={{ fontSize: '16px', color: '#666666', fontFamily: 'monospace', marginBottom: '16px' }}>
                Savings = ((300 &minus; 224) / 300) &times; 100 = (76 / 300) &times; 100
              </div>
            </div>

            <div
              style={{
                padding: '16px 20px',
                backgroundColor: '#F0F8F7',
                borderLeft: '5px solid #147D78',
              }}
            >
              <div style={{ fontSize: '13px', color: '#147D78', fontWeight: 600, textTransform: 'uppercase' }}>
                Compression Gain
              </div>
              <div
                style={{
                  fontSize: '40px',
                  fontWeight: 700,
                  color: '#147D78',
                  letterSpacing: '-0.02em',
                  marginTop: '2px',
                }}
              >
                25.33% fewer bits
              </div>
            </div>

            <div style={{ fontSize: '13px', color: '#888888', marginTop: '8px' }}>
              Achieved solely by adjusting codeword lengths to symbol probability distribution.
            </div>
          </div>
        </div>

        {/* Small Technical Caption */}
        <div
          style={{
            fontSize: '13px',
            color: '#777777',
            fontStyle: 'italic',
            textAlign: 'center',
            borderTop: '1px solid #EEEEEE',
            paddingTop: '14px',
            width: '100%',
          }}
        >
          "Payload comparison; tree/code-table metadata is excluded. This represents an illustrative six-symbol academic derivation."
        </div>
      </div>
    </SlideLayout>
  );
};
