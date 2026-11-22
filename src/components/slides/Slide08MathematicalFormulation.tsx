import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide08MathematicalFormulationProps {
  step?: number;
}

export const Slide08MathematicalFormulation: React.FC<Slide08MathematicalFormulationProps> = () => {
  return (
    <SlideLayout
      slideNumber={8}
      totalSlides={14}
      title="Mathematical Formulation"
      subtitle="Minimum Average Codeword Length Over Binary Prefix Codes"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '10px 80px',
        }}
      >
        {/* Prominent Centerpiece: Boxed Equation with True Subscripts and Clean Summation Limits */}
        <div
          style={{
            border: '3px solid #202124',
            backgroundColor: '#FFFFFF',
            padding: '36px 84px',
            boxShadow: '8px 8px 0px rgba(20, 125, 120, 0.15)',
            marginBottom: '48px',
            animation: 'fadeUp 0.6s cubic-bezier(0.2, 1, 0.3, 1) both',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontFamily: "'Crimson Pro', 'Latin Modern Math', 'Lora', 'Times New Roman', serif",
              color: '#202124',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
            }}
          >
            {/* L_bar_Huffman */}
            <span style={{ display: 'inline-block', lineHeight: 1 }}>
              <span style={{ fontStyle: 'italic', fontWeight: 700 }}>L&#772;</span>
              <span
                style={{
                  fontSize: '28px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  position: 'relative',
                  top: '16px',
                  marginLeft: '3px',
                }}
              >
                Huffman
              </span>
            </span>

            {/* = */}
            <span style={{ margin: '0 10px', fontWeight: 400 }}>=</span>

            {/* min_{prefix codes} */}
            <div
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '14px',
              }}
            >
              <span style={{ fontSize: '46px', fontWeight: 600, lineHeight: 1 }}>min</span>
              <span
                style={{
                  fontSize: '20px',
                  color: '#147D78',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  marginTop: '6px',
                  lineHeight: 1,
                }}
              >
                prefix codes
              </span>
            </div>

            {/* Summation \sum_{i=1}^k with generous spacing above and below */}
            <div
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 8px',
              }}
            >
              <span
                style={{
                  fontSize: '24px',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  lineHeight: 1,
                  marginBottom: '6px',
                }}
              >
                k
              </span>
              <span style={{ fontSize: '68px', lineHeight: 0.95, fontWeight: 400 }}>&sum;</span>
              <span
                style={{
                  fontSize: '23px',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  lineHeight: 1,
                  marginTop: '10px',
                }}
              >
                i = 1
              </span>
            </div>

            {/* p_i \cdot l_i with explicit lowered subscripts */}
            <span style={{ display: 'inline-block', lineHeight: 1 }}>
              <span style={{ fontStyle: 'italic' }}>p</span>
              <span
                style={{
                  fontSize: '32px',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  position: 'relative',
                  top: '15px',
                  marginLeft: '2px',
                }}
              >
                i
              </span>
              <span style={{ margin: '0 12px' }}>&sdot;</span>
              <span style={{ fontStyle: 'italic' }}>l</span>
              <span
                style={{
                  fontSize: '32px',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  position: 'relative',
                  top: '15px',
                  marginLeft: '2px',
                }}
              >
                i
              </span>
            </span>
          </div>
        </div>

        {/* Vertically Aligned Symbol Definitions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%',
            maxWidth: '1040px',
          }}
        >
          {/* Definition 1: L_bar_Huffman */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 28px',
              backgroundColor: '#FAFAFA',
              borderLeft: '5px solid #147D78',
              animation: 'fadeUp 0.5s ease 0.15s both',
            }}
          >
            <div
              style={{
                width: '170px',
                fontSize: '34px',
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 700,
                color: '#147D78',
              }}
            >
              <span style={{ fontStyle: 'italic' }}>L&#772;</span>
              <span
                style={{
                  fontSize: '19px',
                  fontStyle: 'normal',
                  position: 'relative',
                  top: '8px',
                  marginLeft: '2px',
                }}
              >
                Huffman
              </span>
            </div>
            <div style={{ fontSize: '25px', color: '#333333' }}>
              Minimum average code length (bits per symbol).
            </div>
          </div>

          {/* Definition 2: p_i */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 28px',
              backgroundColor: '#FAFAFA',
              borderLeft: '5px solid #202124',
              animation: 'fadeUp 0.5s ease 0.28s both',
            }}
          >
            <div
              style={{
                width: '170px',
                fontSize: '34px',
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 700,
                color: '#202124',
              }}
            >
              <span style={{ fontStyle: 'italic' }}>p</span>
              <span
                style={{
                  fontSize: '22px',
                  fontStyle: 'italic',
                  position: 'relative',
                  top: '9px',
                  marginLeft: '2px',
                }}
              >
                i
              </span>
            </div>
            <div style={{ fontSize: '25px', color: '#333333' }}>
              Probability (relative frequency) of symbol{' '}
              <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>i</span>.
            </div>
          </div>

          {/* Definition 3: l_i */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 28px',
              backgroundColor: '#FAFAFA',
              borderLeft: '5px solid #202124',
              animation: 'fadeUp 0.5s ease 0.41s both',
            }}
          >
            <div
              style={{
                width: '170px',
                fontSize: '34px',
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 700,
                color: '#202124',
              }}
            >
              <span style={{ fontStyle: 'italic' }}>l</span>
              <span
                style={{
                  fontSize: '22px',
                  fontStyle: 'italic',
                  position: 'relative',
                  top: '9px',
                  marginLeft: '2px',
                }}
              >
                i
              </span>
            </div>
            <div style={{ fontSize: '25px', color: '#333333' }}>
              Length in bits of the binary codeword assigned to symbol{' '}
              <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>i</span>.
            </div>
          </div>

          {/* Definition 4: k */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 28px',
              backgroundColor: '#FAFAFA',
              borderLeft: '5px solid #147D78',
              animation: 'fadeUp 0.5s ease 0.54s both',
            }}
          >
            <div
              style={{
                width: '170px',
                fontSize: '34px',
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 700,
                color: '#147D78',
              }}
            >
              <span style={{ fontStyle: 'italic' }}>k</span>
            </div>
            <div style={{ fontSize: '25px', color: '#333333' }}>
              Number of distinct symbols in the alphabet (minimization taken over valid binary prefix codes).
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
