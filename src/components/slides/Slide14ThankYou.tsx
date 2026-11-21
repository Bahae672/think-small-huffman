import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide14ThankYouProps {
  step?: number;
}

export const Slide14ThankYou: React.FC<Slide14ThankYouProps> = () => {
  return (
    <SlideLayout slideNumber={14} totalSlides={14} hideHeader={true}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          animation: 'fadeUp 0.8s cubic-bezier(0.2, 1, 0.3, 1) both',
        }}
      >
        <h1
          style={{
            fontSize: '84px',
            fontWeight: 800,
            color: '#202124',
            letterSpacing: '-0.03em',
            margin: '0 0 28px 0',
          }}
        >
          Thank You
        </h1>

        <p
          style={{
            fontSize: '32px',
            fontStyle: 'italic',
            color: '#555555',
            fontWeight: 400,
            maxWidth: '900px',
            lineHeight: 1.5,
            margin: '0 0 40px 0',
          }}
        >
          &ldquo;Small choices can lead to optimal solutions.&rdquo;
        </p>

        <div
          style={{
            width: '80px',
            height: '4px',
            backgroundColor: '#147D78',
            borderRadius: '2px',
          }}
        />
      </div>
    </SlideLayout>
  );
};
