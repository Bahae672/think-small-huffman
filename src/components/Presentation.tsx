import React, { useState, useEffect, useCallback } from 'react';
import { Slide01Title } from './slides/Slide01Title';
import { Slide02Problem } from './slides/Slide02Problem';
import { Slide03FundamentalQuestion } from './slides/Slide03FundamentalQuestion';
import { Slide04PNG } from './slides/Slide04PNG';
import { Slide05GreedyStrategy } from './slides/Slide05GreedyStrategy';
import { Slide06Pseudocode } from './slides/Slide06Pseudocode';
import { Slide07TreeConstruction } from './slides/Slide07TreeConstruction';
import { Slide08MathematicalFormulation } from './slides/Slide08MathematicalFormulation';
import { Slide09Optimality } from './slides/Slide09Optimality';
import { Slide10Comparison } from './slides/Slide10Comparison';
import { Slide11ComplexityBigO } from './slides/Slide11ComplexityBigO';
import { Slide12ComplexityGraph } from './slides/Slide12ComplexityGraph';
import { Slide13InteractiveDemo } from './slides/Slide13InteractiveDemo';
import { Slide14ThankYou } from './slides/Slide14ThankYou';
import { SpeakerNotesDrawer } from './SpeakerNotesDrawer';

// Max animation steps per slide (0-indexed)
const MAX_STEPS: { [slideNumber: number]: number } = {
  1: 0,
  2: 0,
  3: 0,
  4: 1,
  5: 1,
  6: 2,
  7: 6, // Step 0 (Queue) -> Step 1 (Align leaves) -> Steps 2..6 (5 greedy merges & final codes)
  8: 0, // Single boxed equation + 4 formal definitions
  9: 2, // 3 proof cards (0, 1, 2)
  10: 3, // Step 0: 13-Symbol Stream -> Step 1: Fixed-Length -> Step 2: Shannon-Fano -> Step 3: Huffman Optimal
  11: 2, // Step 0: 3-Stage Pipeline -> Step 1: Total Time -> Step 2: Extra Memory
  12: 1, // Step 0: Animated Growth Curves -> Step 1: 32x Faster Gap Bracket
  13: 6, // Steps 0..6: Image -> Pixels -> Values -> Frequencies -> Huffman Tree -> Binary Bits -> Reconstructed PNG
  14: 0, // Thank You
};

// Inject global keyframes once at module level
const GLOBAL_CSS = `
  @keyframes slideEntrance {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.94); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes barGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes drawCurve {
    from { stroke-dashoffset: 1600; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes drawLine {
    from { stroke-dashoffset: 240; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes drawEdgeUp {
    from { stroke-dashoffset: var(--edge-len, 180); opacity: 0.25; }
    to   { stroke-dashoffset: 0; opacity: 1; }
  }
  @keyframes nodePopIn {
    0%   { opacity: 0; transform: scale(0.55); }
    70%  { opacity: 1; transform: scale(1.06); }
    100% { opacity: 1; transform: scale(1); }
  }
`;

if (typeof document !== 'undefined') {
  const existing = document.getElementById('agy-anim-css');
  if (existing) {
    existing.textContent = GLOBAL_CSS;
  } else {
    const style = document.createElement('style');
    style.id = 'agy-anim-css';
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
  }
}

export const Presentation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [slideStep, setSlideStep] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const totalSlides = 14;

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
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if ((e.key === 'ArrowRight' && e.shiftKey) || e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentSlide < totalSlides) {
          setCurrentSlide((c) => c + 1);
          setSlideStep(0);
        }
      } else if ((e.key === 'ArrowLeft' && e.shiftKey) || e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentSlide > 1) {
          setCurrentSlide((c) => c - 1);
          setSlideStep(0);
        }
      } else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
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
        return <Slide03FundamentalQuestion step={slideStep} />;
      case 4:
        return <Slide04PNG step={slideStep} />;
      case 5:
        return <Slide05GreedyStrategy step={slideStep} />;
      case 6:
        return <Slide06Pseudocode step={slideStep} />;
      case 7:
        return <Slide07TreeConstruction step={slideStep} />;
      case 8:
        return <Slide08MathematicalFormulation step={slideStep} />;
      case 9:
        return <Slide09Optimality step={slideStep} />;
      case 10:
        return <Slide10Comparison step={slideStep} />;
      case 11:
        return <Slide11ComplexityBigO step={slideStep} />;
      case 12:
        return <Slide12ComplexityGraph step={slideStep} />;
      case 13:
        return <Slide13InteractiveDemo step={slideStep} onStepChange={setSlideStep} />;
      case 14:
        return <Slide14ThankYou step={slideStep} />;
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
          overflow: 'hidden',
          cursor: currentSlide < totalSlides || slideStep < (MAX_STEPS[currentSlide] || 0) ? 'pointer' : 'default',
        }}
      >
        <div
          key={`slide-${currentSlide}`}
          style={{
            width: '100%',
            height: '100%',
            animation: 'slideEntrance 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
          }}
        >
          {renderSlideContent()}
        </div>

        {/* Persistent Bottom Progress Hairline (Smoothly advances across slides & sub-steps) */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '5px',
            backgroundColor: '#EFEFEF',
            zIndex: 50,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: `${Math.min(
                100,
                Math.max(
                  0,
                  (((currentSlide - 1) + (slideStep + 1) / ((MAX_STEPS[currentSlide] || 0) + 1)) /
                    totalSlides) *
                    100
                )
              )}%`,
              height: '100%',
              backgroundColor: '#147D78',
              transition: 'width 0.48s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </div>
      </div>

      {/* Speaker Notes Drawer (Toggled via 'S' or 'N' key) */}
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
