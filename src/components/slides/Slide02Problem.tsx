import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide02ProblemProps {
  step?: number;
}

export const Slide02Problem: React.FC<Slide02ProblemProps> = () => {
  const assets = [
    { title: 'Institutional Logos', icon: '🏛️', desc: 'High-contrast line art' },
    { title: 'Lecture Diagrams', icon: '📐', desc: 'Sharp vectors & text' },
    { title: 'Technical Screenshots', icon: '💻', desc: 'Code & user interfaces' },
    { title: 'Course Icons & Assets', icon: '🎨', desc: 'Palette graphics' },
  ];

  return (
    <SlideLayout
      slideNumber={2}
      totalSlides={14}
      title="The Growing Cost of Digital Images"
      subtitle="Data Accumulation Across Digital Educational Infrastructure"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: '10px 0',
        }}
      >
        {/* Central Visual Composition: Thumbnail Gallery Feeding Into Massive Data Payload */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '60px',
            alignItems: 'center',
            flex: 1,
          }}
        >
          {/* Left: Visual Asset Mosaic */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#777777',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Academic Digital Asset Library
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
              }}
            >
              {assets.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FAFAFA',
                    border: '2px solid #202124',
                    padding: '24px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    boxShadow: '4px 4px 0px rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{ fontSize: '36px' }}>{item.icon}</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#202124' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '20px', color: '#666666' }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Storage & Bandwidth Accumulation Visualizer */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '3px solid #202124',
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              boxShadow: '8px 8px 0px rgba(20, 125, 120, 0.15)',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#147D78',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Storage &amp; Transfer Impact
            </div>

            {/* Volume Growth Indicator */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '22px', fontWeight: 700 }}>
                <span>Uncompressed Raster Footprint</span>
                <span style={{ color: '#D9534F' }}>100% Volume</span>
              </div>
              <div style={{ width: '100%', height: '36px', backgroundColor: '#EBEBEB', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#D9534F' }} />
              </div>
              <div style={{ fontSize: '18px', color: '#777', fontFamily: 'monospace' }}>
                8 bits &times; 3 or 4 channels per pixel &times; millions of images
              </div>
            </div>

            {/* Constraints */}
            <div
              style={{
                padding: '20px',
                backgroundColor: '#F7FCFC',
                borderLeft: '6px solid #147D78',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#147D78' }}>
                The Fidelity Constraint
              </div>
              <div style={{ fontSize: '22px', color: '#333333', lineHeight: 1.4 }}>
                Lossy compression causes ringing and blur around typography and lines.
                <strong> Image quality cannot be sacrificed.</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Summary Takeaway */}
        <div
          style={{
            borderTop: '1px solid #EBEBEB',
            paddingTop: '16px',
            fontSize: '24px',
            color: '#555555',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          Uncompressed image archives place massive demands on server disk storage and global network bandwidth.
        </div>
      </div>
    </SlideLayout>
  );
};
