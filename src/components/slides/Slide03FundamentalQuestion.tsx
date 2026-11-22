import React, { useState } from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide03FundamentalQuestionProps {
  step?: number;
}

export const Slide03FundamentalQuestion: React.FC<Slide03FundamentalQuestionProps> = () => {
  const [imgFailed, setImgFailed] = useState<boolean>(false);

  const renderImageGraphic = () => {
    if (!imgFailed) {
      return (
        <img
          src="/assets/njupt-square-emblem.png"
          alt="Sample"
          onError={() => setImgFailed(true)}
          style={{
            width: '136px',
            height: '136px',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      );
    }
    return (
      <>
        <div style={{ width: '80px', height: '24px', backgroundColor: '#147D78', marginBottom: '8px' }} />
        <div style={{ width: '50px', height: '50px', backgroundColor: '#202124', borderRadius: '50%' }} />
      </>
    );
  };

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
          padding: '10px 60px',
          textAlign: 'center',
        }}
      >
        {/* Prominent Question in the Center */}
        <h1
          style={{
            fontSize: '54px',
            fontWeight: 800,
            color: '#202124',
            lineHeight: 1.25,
            maxWidth: '1300px',
            margin: '0 0 44px 0',
            letterSpacing: '-0.02em',
            animation: 'fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
          }}
        >
          Can we reduce the amount of data while preserving every original pixel?
        </h1>

        {/* Geometrically Centered Visual Pipeline Card */}
        <div
          style={{
            backgroundColor: '#FAFAFA',
            border: '2px solid #202124',
            padding: '44px 68px 36px 68px',
            boxShadow: '10px 10px 0px rgba(20, 125, 120, 0.12)',
            marginBottom: '36px',
            animation: 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Row 1: Image Boxes & Compression Arrow Strictly Aligned on Horizontal Centerline */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '240px 320px 240px',
              alignItems: 'center',
              justifyItems: 'center',
            }}
          >
            {/* Left Box: Original Image */}
            <div
              style={{
                width: '176px',
                height: '176px',
                backgroundColor: '#FFFFFF',
                border: '2.5px solid #202124',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px',
                boxSizing: 'border-box',
                animation: 'scaleIn 0.5s ease 0.2s both',
              }}
            >
              {renderImageGraphic()}
            </div>

            {/* Center: Perfectly Centered Arrows & Compression Badge */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                gap: '10px',
                animation: 'fadeIn 0.5s ease 0.35s both',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  gap: '12px',
                }}
              >
                <span style={{ fontSize: '36px', color: '#147D78', fontWeight: 800, lineHeight: 1 }}>
                  &mdash;&rarr;
                </span>
                <div
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#147D78',
                    color: '#FFFFFF',
                    fontSize: '19px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderRadius: '4px',
                    boxShadow: '0 4px 12px rgba(20, 125, 120, 0.2)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Compression
                </div>
                <span style={{ fontSize: '36px', color: '#147D78', fontWeight: 800, lineHeight: 1 }}>
                  &mdash;&rarr;
                </span>
              </div>
              <div style={{ fontSize: '16px', color: '#147D78', fontWeight: 700 }}>
                Fewer Stored Bits
              </div>
            </div>

            {/* Right Box: Reconstructed Image */}
            <div
              style={{
                width: '176px',
                height: '176px',
                backgroundColor: '#FFFFFF',
                border: '2.5px solid #147D78',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px',
                boxSizing: 'border-box',
                boxShadow: '0 6px 20px rgba(20, 125, 120, 0.16)',
                animation: 'scaleIn 0.5s ease 0.45s both',
              }}
            >
              {renderImageGraphic()}
            </div>
          </div>

          {/* Row 2: Captions Underneath Aligned with the 3 Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '240px 320px 240px',
              alignItems: 'start',
              justifyItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '21px', fontWeight: 800, color: '#202124' }}>
                ORIGINAL IMAGE
              </div>
              <div style={{ fontSize: '17px', color: '#666666', fontFamily: 'monospace', marginTop: '4px' }}>
                100% Raw Pixels
              </div>
            </div>

            <div />

            <div>
              <div style={{ fontSize: '21px', fontWeight: 800, color: '#147D78' }}>
                RECONSTRUCTED IMAGE
              </div>
              <div
                style={{
                  fontSize: '17px',
                  color: '#147D78',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  marginTop: '4px',
                }}
              >
                100% Bit-Exact Match
              </div>
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
            animation: 'fadeUp 0.5s ease 0.6s both',
          }}
        >
          Mandate: <strong>Lossless Compression</strong>
        </div>
      </div>
    </SlideLayout>
  );
};
