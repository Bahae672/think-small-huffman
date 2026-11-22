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
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '90px 160px',
        boxSizing: 'border-box',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top: Square University Emblem & Course Name */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          animation: 'fadeUp 0.6s ease both',
        }}
      >
        <UniversityLogo size={110} />
        <div
          style={{
            fontSize: '26px',
            fontWeight: 600,
            color: '#147D78',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Analysis of Algorithms
        </div>
      </div>

      {/* Center: Presentation Title & Subtitle (Main Focal Point) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1500px',
          animation: 'fadeUp 0.7s ease 0.15s both',
        }}
      >
        <h1
          style={{
            fontSize: '76px',
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.035em',
            color: '#202124',
            margin: '0 0 28px 0',
          }}
        >
          Think Small: How Greedy Algorithms Compress Images
        </h1>

        <div
          style={{
            fontSize: '38px',
            color: '#147D78',
            fontWeight: 500,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}
        >
          Huffman Coding and Lossless Image Compression
        </div>
      </div>

      {/* Bottom: Presenter Names Neatly Positioned */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'baseline',
          gap: '40px',
          paddingTop: '32px',
          borderTop: '1px solid #EBEBEB',
          animation: 'fadeUp 0.6s ease 0.3s both',
        }}
      >
        <div
          style={{
            fontSize: '32px',
            fontWeight: 600,
            color: '#202124',
            letterSpacing: '-0.01em',
          }}
        >
          Bahaeddine EL ATIGUI
        </div>
        <div style={{ fontSize: '28px', color: '#CCCCCC', fontWeight: 300 }}>
          &bull;
        </div>
        <div
          style={{
            fontSize: '32px',
            fontWeight: 600,
            color: '#202124',
            letterSpacing: '-0.01em',
          }}
        >
          Hafssa GAMMAZ
        </div>
      </div>
    </div>
  );
};
