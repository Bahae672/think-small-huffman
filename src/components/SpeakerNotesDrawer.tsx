import React from 'react';
import { speakerNotesData } from '../data/speakerNotes';

interface SpeakerNotesDrawerProps {
  currentSlide: number;
  isOpen: boolean;
  onClose: () => void;
  onJumpToSlide: (slide: number) => void;
}

export const SpeakerNotesDrawer: React.FC<SpeakerNotesDrawerProps> = ({
  currentSlide,
  isOpen,
  onClose,
  onJumpToSlide,
}) => {
  if (!isOpen) return null;

  const currentNote = speakerNotesData.find((n) => n.slideNumber === currentSlide);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '460px',
        backgroundColor: '#FFFFFF',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', sans-serif",
        borderLeft: '1px solid #D5D5D5',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid #E5E5E5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FAFAFA',
        }}
      >
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#147D78', textTransform: 'uppercase' }}>
            Presenter Speaker Notes
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#202124', marginTop: '2px' }}>
            Slide {currentSlide} of 12
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '4px 10px',
            fontSize: '13px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #CCCCCC',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Close [S]
        </button>
      </div>

      {/* Target speaking duration */}
      <div
        style={{
          padding: '12px 20px',
          backgroundColor: '#F4FAF9',
          borderBottom: '1px solid #E0EFEF',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '13.5px',
        }}
      >
        <span>
          Slide Target Time: <strong>{currentNote?.durationMinutes}</strong> ({currentNote?.durationSeconds}s)
        </span>
        <span style={{ color: '#147D78', fontWeight: 600 }}>Total Course: ~15 mins</span>
      </div>

      {/* Note Script Content */}
      <div
        style={{
          flex: 1,
          padding: '24px 20px',
          overflowY: 'auto',
          fontSize: '15px',
          lineHeight: 1.7,
          color: '#333333',
        }}
      >
        <div style={{ fontWeight: 600, fontSize: '17px', color: '#202124', marginBottom: '14px' }}>
          {currentNote?.slideTitle}
        </div>

        {currentNote?.notes.map((paragraph, idx) => (
          <p key={idx} style={{ marginBottom: '16px' }}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* Slide Quick Jump Navigation */}
      <div
        style={{
          padding: '16px 20px',
          borderTop: '1px solid #E5E5E5',
          backgroundColor: '#FAFAFA',
        }}
      >
        <div style={{ fontSize: '12px', color: '#777777', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px' }}>
          Slide Navigation Jump
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
          {speakerNotesData.map((s) => (
            <button
              key={s.slideNumber}
              type="button"
              onClick={() => onJumpToSlide(s.slideNumber)}
              style={{
                padding: '6px 0',
                fontSize: '12px',
                fontWeight: currentSlide === s.slideNumber ? 700 : 500,
                backgroundColor: currentSlide === s.slideNumber ? '#147D78' : '#FFFFFF',
                color: currentSlide === s.slideNumber ? '#FFFFFF' : '#202124',
                border: '1px solid #CCCCCC',
                cursor: 'pointer',
              }}
            >
              {s.slideNumber}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '11px', color: '#888888', marginTop: '10px', textAlign: 'center' }}>
          Shortcuts: [Space / &rarr;] Next &bull; [&larr;] Prev &bull; [S] Notes &bull; [F] Fullscreen
        </div>
      </div>
    </div>
  );
};
