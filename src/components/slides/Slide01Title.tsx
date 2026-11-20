import React from 'react';
import { UniversityLogo } from '../UniversityLogo';

interface Slide01TitleProps {
  step?: number;
}

export const Slide01Title: React.FC<Slide01TitleProps> = () => {
  return (
    <div
      style={{
        width: '1920px',
        height: '1080px',
        backgroundColor: '#FFFFFF',
        color: '#202124',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 140px',
        boxSizing: 'border-box',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top Section: Course Name & Square Emblem in a balanced academic header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #EBEBEB',
          paddingBottom: '28px',
        }}
      >
        <div
          style={{
            fontSize: '30px',
            fontWeight: 600,
            color: '#147D78',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Analysis of Algorithms
        </div>
        <UniversityLogo size={120} />
      </div>

      {/* Center Section: Main Title & Subtitle */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          maxWidth: '1500px',
          margin: '30px 0',
        }}
      >
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#202124',
            margin: '0 0 24px 0',
          }}
        >
          Think Small: How Greedy Algorithms Compress Images
        </h1>

        <div
          style={{
            fontSize: '36px',
            color: '#147D78',
            fontWeight: 500,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            marginBottom: '32px',
          }}
        >
          Huffman Coding and Lossless Image Compression
        </div>

        <div
          style={{
            width: '140px',
            height: '4px',
            backgroundColor: '#147D78',
          }}
        />
      </div>

      {/* Bottom Section: Presenter Names in clean academic layout */}
      <div
        style={{
          borderTop: '2px solid #EBEBEB',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '22px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#777777',
              fontWeight: 600,
              marginBottom: '10px',
            }}
          >
            Presenters
          </div>
          <div
            style={{
              display: 'flex',
              gap: '40px',
              fontSize: '30px',
              fontWeight: 600,
              color: '#202124',
            }}
          >
            <span>Bahaeddine EL ATIGUI</span>
            <span style={{ color: '#CCCCCC' }}>|</span>
            <span>Hafssa Gammaz</span>
          </div>
        </div>

        <div
          style={{
            fontSize: '24px',
            color: '#777777',
            fontWeight: 500,
          }}
        >
          Fall 2026
        </div>
      </div>
    </div>
  );
};
