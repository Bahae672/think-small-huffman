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
import { SpeakerNotesDrawer } from './SpeakerNotesDrawer';

// Max animation steps per slide (0-indexed)
const MAX_STEPS: { [slideNumber: number]: number } = {
  1: 0,
  2: 1,
  3: 1,
  4: 1,
  5: 2,
  6: 6, // Step 0 (Initial 6 nodes) through Step 6 (Codes table)
  7: 2,
  8: 2,
  9: 2,
  10: 0, // Autonomous continuous 8-stage image transformation
  11: 1,
};

export const Presentation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [slideStep, setSlideStep] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const totalSlides = 11;

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

  const advanceStepOrSlide = useCallback(() => {
    const maxStep = MAX_STEPS[currentSlide] || 0;
    if (slideStep < maxStep) {
      setSlideStep((s) => s + 1);
    } else if (currentSlide < totalSlides) {
      setCurrentSlide((c) => c + 1);
      setSlideStep(0);
    }
  }, [currentSlide, slideStep, totalSlides]);

  const retreatStepOrSlide = useCallback(() => {
    if (slideStep > 0) {
      setSlideStep((s) => s - 1);
    } else if (currentSlide > 1) {
      const prevSlide = currentSlide - 1;
      const prevMaxStep = MAX_STEPS[prevSlide] || 0;
      setCurrentSlide(prevSlide);
      setSlideStep(prevMaxStep);
    }
  }, [currentSlide, slideStep]);

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
        advanceStepOrSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        retreatStepOrSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 's' || e.key === 'S' || e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(1);
        setSlideStep(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(totalSlides);
        setSlideStep(MAX_STEPS[totalSlides] || 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [advanceStepOrSlide, retreatStepOrSlide, toggleFullscreen, totalSlides]);

  // Click on background advances animation step or slide
  const handleSlideClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'INPUT' ||
      target.tagName === 'CANVAS' ||
      target.tagName === 'A' ||
      target.closest('button') ||
      target.closest('input')
    ) {
      return;
    }
    advanceStepOrSlide();
  };

  const renderSlideContent = () => {
    switch (currentSlide) {
      case 1:
        return <Slide01Title step={slideStep} />;
      case 2:
        return <Slide02Problem step={slideStep} />;
      case 3:
        return <Slide03PNG step={slideStep} />;
      case 4:
        return <Slide04GreedyStrategy step={slideStep} />;
      case 5:
        return <Slide05Pseudocode step={slideStep} />;
      case 6:
        return <Slide06TreeConstruction step={slideStep} />;
      case 7:
        return <Slide07MathematicalFormulation step={slideStep} />;
      case 8:
        return <Slide08Optimality step={slideStep} />;
      case 9:
        return <Slide09Complexity step={slideStep} />;
      case 10:
        return <Slide10InteractiveDemo />;
      case 11:
        return <Slide11Conclusion step={slideStep} />;
      default:
        return <Slide01Title step={slideStep} />;
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
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          cursor: currentSlide < totalSlides || slideStep < (MAX_STEPS[currentSlide] || 0) ? 'pointer' : 'default',
        }}
      >
        {renderSlideContent()}
      </div>

      {/* Speaker Notes Drawer (Zero visible control bars on screen, toggled via 'S' or 'N' key) */}
      <SpeakerNotesDrawer
        currentSlide={currentSlide}
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        onJumpToSlide={(slideNum) => {
          setCurrentSlide(slideNum);
          setSlideStep(0);
        }}
      />
    </div>
  );
};
