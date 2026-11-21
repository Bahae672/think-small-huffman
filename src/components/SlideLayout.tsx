import React from 'react';

interface SlideLayoutProps {
  slideNumber: number;
  totalSlides?: number;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  hideHeader?: boolean;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({
  slideNumber,
  totalSlides = 14,
  title,
  subtitle,
  children,
  hideHeader = false,
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
        padding: '56px 100px 56px 100px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top Academic Course Header & Slide Counter (Only header kept, NO footer) */}
      {!hideHeader && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '22px',
            color: '#777777',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '16px',
          }}
        >
          <div>Analysis of Algorithms</div>
          <div>Slide {slideNumber} / {totalSlides}</div>
        </div>
      )}

      {/* Main Slide Title Banner */}
      {title && (
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', flexWrap: 'wrap' }}>
            <h1
              style={{
                fontSize: '52px',
                fontWeight: 700,
                color: '#202124',
                letterSpacing: '-0.02em',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <span
                style={{
                  fontSize: '30px',
                  color: '#147D78',
                  fontWeight: 500,
                }}
              >
                — {subtitle}
              </span>
            )}
          </div>
          <div
            style={{
              width: '100%',
              height: '2px',
              backgroundColor: '#147D78',
              marginTop: '16px',
            }}
          />
        </div>
      )}

      {/* Slide Body Content */}
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
    </div>
  );
};
