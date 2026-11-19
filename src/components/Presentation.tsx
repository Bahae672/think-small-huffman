import React, { useState, useEffect, useCallback } from 'react';
import { Slide01Title } from './slides/Slide01Title';
import { Slide02Problem } from './slides/Slide02Problem';
import { Slide03PNG } from './slides/Slide03PNG';
import { Slide04GreedyStrategy } from './slides/Slide04GreedyStrategy';
import { Slide05Pseudocode } from './slides/Slide05Pseudocode';
import { Slide06TreeConstruction } from './slides/Slide06TreeConstruction';
import { Slide07MathematicalFormulation } from './slides/Slide07MathematicalFormulation';
import { Slide08Optimality } from './slides/Slide08Optimality';
import { Slide09Complexity } from './slides/Slide09Complexity';
import { Slide10InteractiveDemo } from './slides/Slide10InteractiveDemo';
import { Slide11Conclusion } from './slides/Slide11Conclusion';
import { Slide12References } from './slides/Slide12References';
import { SpeakerNotesDrawer } from './SpeakerNotesDrawer';

export const Presentation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const totalSlides = 12;

  // Viewport scaling for 1920 x 1080 logical resolution
  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      setScale(Math.min(scaleX, scaleY));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((curr) => Math.min(totalSlides, curr + 1));
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((curr) => Math.max(1, curr - 1));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when typing in text inputs or file dialogs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 's' || e.key === 'S' || e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(totalSlides);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, toggleFullscreen, totalSlides]);

  // Click on background advances slide
  const handleSlideClick = (e: React.MouseEvent) => {
    // If click originated from interactive elements (buttons, inputs, links, canvas), don't advance
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'INPUT' ||
      target.tagName === 'CANVAS' ||
      target.tagName === 'A' ||
      target.closest('button') ||
      target.closest('input') ||
      target.closest('.interactive-control')
    ) {
      return;
    }
    goToNextSlide();
  };

  const renderSlideContent = () => {
    switch (currentSlide) {
      case 1:
        return <Slide01Title />;
      case 2:
        return <Slide02Problem />;
      case 3:
        return <Slide03PNG />;
      case 4:
        return <Slide04GreedyStrategy />;
      case 5:
        return <Slide05Pseudocode />;
      case 6:
        return <Slide06TreeConstruction />;
      case 7:
        return <Slide07MathematicalFormulation />;
      case 8:
        return <Slide08Optimality />;
      case 9:
        return <Slide09Complexity />;
      case 10:
        return <Slide10InteractiveDemo />;
      case 11:
        return <Slide11Conclusion />;
      case 12:
        return <Slide12References />;
      default:
        return <Slide01Title />;
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 1920x1080 Scaled Logical Presentation Container */}
      <div
        onClick={handleSlideClick}
        style={{
          width: '1920px',
          height: '1080px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          cursor: currentSlide < totalSlides ? 'pointer' : 'default',
        }}
      >
        {renderSlideContent()}
      </div>

      {/* Discrete Corner Floating Pill for Presenter Notes & Fullscreen toggle */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          bottom: '12px',
          right: '16px',
          display: 'flex',
          gap: '8px',
          opacity: 0.35,
          transition: 'opacity 0.2s ease',
          zIndex: 9999,
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.35')}
      >
        <button
          type="button"
          onClick={() => setShowNotes(!showNotes)}
          title="Toggle Speaker Notes [S]"
          style={{
            padding: '5px 10px',
            fontSize: '12px',
            backgroundColor: 'rgba(32, 33, 36, 0.85)',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '3px',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Notes [S]
        </button>
        <button
          type="button"
          onClick={toggleFullscreen}
          title="Toggle Fullscreen [F]"
          style={{
            padding: '5px 10px',
            fontSize: '12px',
            backgroundColor: 'rgba(32, 33, 36, 0.85)',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '3px',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Fullscreen [F]
        </button>
      </div>

      {/* Presenter Speaker Notes Drawer */}
      <SpeakerNotesDrawer
        currentSlide={currentSlide}
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        onJumpToSlide={(slideNum) => {
          setCurrentSlide(slideNum);
        }}
      />
    </div>
  );
};
