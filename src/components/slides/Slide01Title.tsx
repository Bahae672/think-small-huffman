import React from 'react';
import { UniversityLogo } from '../UniversityLogo';

export const Slide01Title: React.FC = () => {
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
        padding: '70px 120px 80px 120px',
        boxSizing: 'border-box',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Top Academic Context */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '15px',
          color: '#777777',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontWeight: 500,
          borderBottom: '1px solid #ECECEC',
          paddingBottom: '16px',
        }}
      >
        <span>Analysis of Algorithms</span>
        <span>Course Presentation — Fall 2026</span>
      </div>

      {/* Main Title & Subtitle block */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Horizontal University Title Logo Space */}
        <UniversityLogo />

        <h1
          style={{
            fontSize: '56px',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#202124',
            margin: '0 0 20px 0',
          }}
        >
          Think Small: How Greedy Algorithms Compress Images
        </h1>

        <div
          style={{
            fontSize: '26px',
            color: '#147D78',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            marginBottom: '36px',
          }}
        >
          Huffman Coding and Lossless Image Compression
        </div>

        <div
          style={{
            width: '120px',
            height: '2px',
            backgroundColor: '#147D78',
            marginBottom: '36px',
          }}
        />

        <div
          style={{
            fontSize: '18px',
            color: '#555555',
            lineHeight: 1.6,
            maxWidth: '850px',
          }}
        >
          An algorithmic exploration of optimal prefix-free codes, greedy tree construction,
          and lossless image raster compression.
        </div>
      </div>

      {/* Bottom Academic Metadata */}
      <div
        style={{
          borderTop: '1px solid #ECECEC',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          fontSize: '16px',
          color: '#666666',
        }}
      >
        <div>
          <div style={{ fontWeight: 600, color: '#202124', marginBottom: '4px' }}>
            Nanjing University of Posts and Telecommunications
          </div>
          <div>School of Computer Science &amp; Technology</div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 500, color: '#202124', marginBottom: '4px' }}>
            Course: Analysis of Algorithms
          </div>
          <div>November 2026</div>
        </div>
      </div>
    </div>
  );
};
