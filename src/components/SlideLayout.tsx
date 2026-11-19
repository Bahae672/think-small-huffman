import React from 'react';

interface SlideLayoutProps {
  slideNumber: number;
  totalSlides?: number;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  hideHeaderFooter?: boolean;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({
  slideNumber,
  totalSlides = 12,
  title,
  subtitle,
  children,
  hideHeaderFooter = false,
}) => {
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
        padding: '52px 88px 48px 88px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top Academic Header */}
      {!hideHeaderFooter && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '15px',
            color: '#777777',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontWeight: 500,
            marginBottom: '16px',
          }}
        >
          <div>Analysis of Algorithms — Nanjing University of Posts and Telecommunications</div>
          <div>Slide {slideNumber} of {totalSlides}</div>
        </div>
      )}

      {/* Slide Title and Divider */}
      {title && (
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 600,
                color: '#202124',
                letterSpacing: '-0.02em',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <span
                style={{
                  fontSize: '18px',
                  color: '#777777',
                  fontWeight: 400,
                }}
              >
                — {subtitle}
              </span>
            )}
          </div>
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: '#E0E0E0',
              marginTop: '14px',
            }}
          />
        </div>
      )}

      {/* Main Slide Content Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: 0,
        }}
      >
        {children}
      </div>

      {/* Restrained Academic Footer */}
      {!hideHeaderFooter && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '13px',
            color: '#999999',
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid #F0F0F0',
          }}
        >
          <span>Think Small: How Greedy Algorithms Compress Images</span>
          <span>Topic: Greedy Algorithms &amp; Huffman Coding</span>
        </div>
      )}
    </div>
  );
};
