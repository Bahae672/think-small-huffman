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
          padding: '20px 80px',
        }}
      >
        {/* Prominent Centerpiece: Exactly the Requested Boxed Equation */}
        <div
          style={{
            border: '3px solid #202124',
            backgroundColor: '#FFFFFF',
            padding: '40px 80px',
            boxShadow: '8px 8px 0px rgba(20, 125, 120, 0.15)',
            marginBottom: '60px',
            animation: 'fadeUp 0.6s cubic-bezier(0.2, 1, 0.3, 1) both',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontFamily: "'Crimson Pro', 'Latin Modern Math', 'Lora', 'Times New Roman', serif",
              color: '#202124',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontStyle: 'italic', fontWeight: 700 }}>L̄</span>
            <sub style={{ fontSize: '32px', fontStyle: 'normal', fontWeight: 600, marginLeft: '2px' }}>
              Huffman
            </sub>
            <span style={{ margin: '0 24px', fontWeight: 400 }}>=</span>
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px' }}>
              <span style={{ fontSize: '42px', fontWeight: 600 }}>min</span>
              <span style={{ fontSize: '20px', color: '#147D78', fontStyle: 'italic', marginTop: '-4px', fontWeight: 600 }}>
                prefix codes
              </span>
            </div>
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '0 12px' }}>
              <span style={{ fontSize: '24px', fontStyle: 'italic' }}>k</span>
              <span style={{ fontSize: '64px', lineHeight: 0.8, fontWeight: 300 }}>&sum;</span>
              <span style={{ fontSize: '24px', fontStyle: 'italic' }}>i=1</span>
            </div>
            <span style={{ fontStyle: 'italic', margin: '0 4px 0 12px' }}>p</span>
            <sub style={{ fontSize: '28px', fontStyle: 'italic' }}>i</sub>
            <span style={{ margin: '0 6px' }}>&sdot;</span>
            <span style={{ fontStyle: 'italic' }}>l</span>
            <sub style={{ fontSize: '28px', fontStyle: 'italic' }}>i</sub>
          </div>
        </div>

        {/* Vertically Aligned Symbol Definitions (Exactly the Four Requested) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            width: '100%',
            maxWidth: '1000px',
          }}
        >
          {/* Definition 1: L_bar_Huffman */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 24px',
              backgroundColor: '#FAFAFA',
              borderLeft: '5px solid #147D78',
              animation: 'fadeUp 0.5s ease 0.15s both',
            }}
          >
            <div
              style={{
                width: '160px',
                fontSize: '32px',
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 700,
                color: '#147D78',
              }}
            >
              <span style={{ fontStyle: 'italic' }}>L̄</span>
              <sub style={{ fontSize: '20px', fontStyle: 'normal' }}>Huffman</sub>
            </div>
            <div style={{ fontSize: '26px', color: '#333333' }}>
              Minimum average code length (bits per symbol).
            </div>
          </div>

          {/* Definition 2: p_i */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 24px',
              backgroundColor: '#FAFAFA',
              borderLeft: '5px solid #202124',
              animation: 'fadeUp 0.5s ease 0.3s both',
            }}
          >
            <div
              style={{
                width: '160px',
                fontSize: '32px',
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 700,
                color: '#202124',
              }}
            >
              <span style={{ fontStyle: 'italic' }}>p</span>
              <sub style={{ fontSize: '20px', fontStyle: 'italic' }}>i</sub>
            </div>
            <div style={{ fontSize: '26px', color: '#333333' }}>
              Probability of symbol <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>i</span>.
            </div>
          </div>

          {/* Definition 3: l_i */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 24px',
              backgroundColor: '#FAFAFA',
              borderLeft: '5px solid #202124',
              animation: 'fadeUp 0.5s ease 0.45s both',
            }}
          >
            <div
              style={{
                width: '160px',
                fontSize: '32px',
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 700,
                color: '#202124',
              }}
            >
              <span style={{ fontStyle: 'italic' }}>l</span>
              <sub style={{ fontSize: '20px', fontStyle: 'italic' }}>i</sub>
            </div>
            <div style={{ fontSize: '26px', color: '#333333' }}>
              Length of the binary code assigned to symbol <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>i</span>.
            </div>
          </div>

          {/* Definition 4: k */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 24px',
              backgroundColor: '#FAFAFA',
              borderLeft: '5px solid #147D78',
              animation: 'fadeUp 0.5s ease 0.6s both',
            }}
          >
            <div
              style={{
                width: '160px',
                fontSize: '32px',
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 700,
                color: '#147D78',
              }}
            >
              <span style={{ fontStyle: 'italic' }}>k</span>
            </div>
            <div style={{ fontSize: '26px', color: '#333333' }}>
              Number of distinct symbols in the alphabet (minimization taken over valid binary prefix codes).
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
