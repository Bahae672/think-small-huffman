import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide03FundamentalQuestionProps {
  step?: number;
}

export const Slide03FundamentalQuestion: React.FC<Slide03FundamentalQuestionProps> = () => {
  return (
    <SlideLayout
      slideNumber={3}
      totalSlides={14}
      title="The Fundamental Question"
      subtitle="The Challenge of Lossless Data Reduction"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '20px 80px',
          textAlign: 'center',
        }}
      >
        {/* Prominent Question in the Center */}
        <h1
          style={{
            fontSize: '56px',
            fontWeight: 800,
            color: '#202124',
            lineHeight: 1.25,
            maxWidth: '1300px',
            margin: '0 0 50px 0',
            letterSpacing: '-0.02em',
          }}
        >
          Can we reduce the amount of data while preserving every original pixel?
        </h1>

        {/* Simple, Elegant Visual Pipeline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '36px',
            backgroundColor: '#FAFAFA',
            border: '2px solid #202124',
            padding: '40px 60px',
            boxShadow: '10px 10px 0px rgba(20, 125, 120, 0.12)',
            marginBottom: '48px',
          }}
        >
          {/* Original Image Card */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '160px',
                height: '160px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #202124',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
              }}
            >
              <div style={{ width: '80px', height: '24px', backgroundColor: '#147D78', marginBottom: '8px' }} />
              <div style={{ width: '50px', height: '50px', backgroundColor: '#202124', borderRadius: '50%' }} />
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#202124' }}>
              ORIGINAL IMAGE
            </div>
            <div style={{ fontSize: '18px', color: '#777777', fontFamily: 'monospace' }}>
              100% Raw Pixels
            </div>
          </div>

          {/* Arrow & Compression */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '42px', color: '#147D78', fontWeight: 800 }}>&rarr;</div>
            <div
              style={{
                padding: '10px 20px',
                backgroundColor: '#147D78',
                color: '#FFFFFF',
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: '3px',
              }}
            >
              Compression
            </div>
            <div style={{ fontSize: '16px', color: '#147D78', fontWeight: 600 }}>
              Fewer Stored Bits
            </div>
            <div style={{ fontSize: '42px', color: '#147D78', fontWeight: 800 }}>&rarr;</div>
          </div>

          {/* Reconstructed Image Card (Identical) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '160px',
                height: '160px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #147D78',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                boxShadow: '0 4px 16px rgba(20, 125, 120, 0.15)',
              }}
            >
              <div style={{ width: '80px', height: '24px', backgroundColor: '#147D78', marginBottom: '8px' }} />
              <div style={{ width: '50px', height: '50px', backgroundColor: '#202124', borderRadius: '50%' }} />
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#147D78' }}>
              RECONSTRUCTED IMAGE
            </div>
            <div style={{ fontSize: '18px', color: '#147D78', fontFamily: 'monospace', fontWeight: 700 }}>
              100% Bit-Exact Match
            </div>
          </div>
        </div>

        {/* Emphasize Lossless Compression */}
        <div
          style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#147D78',
            letterSpacing: '0.04em',
          }}
        >
          Mandate: <strong>Lossless Compression</strong>
        </div>
      </div>
    </SlideLayout>
  );
};
