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
        width: '520px',
        backgroundColor: '#FFFFFF',
        boxShadow: '-6px 0 30px rgba(0,0,0,0.2)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', sans-serif",
        borderLeft: '2px solid #147D78',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '2px solid #E5E5E5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FAFAFA',
        }}
      >
        <div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#147D78', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Presenter Lecture Script
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#202124', marginTop: '2px' }}>
            Slide {currentSlide} of {speakerNotesData.length}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '6px 14px',
            fontSize: '14px',
            backgroundColor: '#FFFFFF',
            border: '2px solid #CCCCCC',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          Close [S]
        </button>
      </div>

      {/* Target speaking duration */}
      <div
        style={{
          padding: '14px 24px',
          backgroundColor: '#F4FAF9',
          borderBottom: '1px solid #E0EFEF',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '16px',
        }}
      >
        <span>
          Target Duration: <strong>{currentNote?.durationMinutes}</strong> ({currentNote?.durationSeconds}s)
        </span>
        <span style={{ color: '#147D78', fontWeight: 700 }}>Total: ~15 mins</span>
      </div>

      {/* Note Script Content */}
      <div
        style={{
          flex: 1,
          padding: '28px 24px',
          overflowY: 'auto',
          fontSize: '18px',
          lineHeight: 1.7,
          color: '#333333',
        }}
      >
        <div style={{ fontWeight: 800, fontSize: '22px', color: '#202124', marginBottom: '18px' }}>
          {currentNote?.slideTitle}
        </div>

        {currentNote?.notes.map((paragraph, idx) => (
          <p key={idx} style={{ marginBottom: '18px' }}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* Slide Quick Jump Navigation */}
      <div
        style={{
          padding: '20px 24px',
          borderTop: '2px solid #E5E5E5',
          backgroundColor: '#FAFAFA',
        }}
      >
        <div style={{ fontSize: '14px', color: '#777777', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>
          Slide Navigation Matrix (1–11)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
          {speakerNotesData.map((s) => (
            <button
              key={s.slideNumber}
              type="button"
              onClick={() => onJumpToSlide(s.slideNumber)}
              style={{
                padding: '8px 0',
                fontSize: '15px',
                fontWeight: currentSlide === s.slideNumber ? 800 : 600,
                backgroundColor: currentSlide === s.slideNumber ? '#147D78' : '#FFFFFF',
                color: currentSlide === s.slideNumber ? '#FFFFFF' : '#202124',
                border: '2px solid #CCCCCC',
                cursor: 'pointer',
              }}
            >
              {s.slideNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
