import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide10ComparisonProps {
  step?: number;
}

export const Slide10Comparison: React.FC<Slide10ComparisonProps> = ({ step = 0 }) => {
  // Step 0: Show the 13-pixel message visually (5×A, 2×B, 2×C, 2×D, 2×E)
  // Step 1: Animate Fixed-Length (uniform 3-bit blocks = 39 bits)
  // Step 2: Animate Shannon-Fano (top-down split traps A in 2 bits = 30 bits)
  // Step 3: Animate Huffman (bottom-up greedy gives A 1 bit = 29 bits, optimal!)
  const currentStep = Math.min(3, Math.max(0, step));

  // The 13-symbol message stream
  const stream = ['A', 'A', 'A', 'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E'];

  const strategies = [
    {
      id: 1,
      name: '1. Fixed-Length Coding',
      badge: 'Uniform Baseline',
      badgeBg: '#EEEEEE',
      badgeColor: '#555555',
      accentColor: '#777777',
      borderColor: '#CCCCCC',
      howItWorks: 'Ignores frequency: gives every symbol the exact same 3-bit length.',
      aBitNote: 'A gets 3 bits ("000")',
      codes: { A: '000', B: '001', C: '010', D: '011', E: '100' } as Record<string, string>,
      totalBits: 39,
      avgBits: '3.00',
      isOptimal: false,
    },
    {
      id: 2,
      name: '2. Shannon-Fano',
      badge: 'Top-Down Split',
      badgeBg: '#FDE8E8',
      badgeColor: '#C53030',
      accentColor: '#D9534F',
      borderColor: '#E5A0A0',
      howItWorks: 'Splits alphabet from the top down: {A,B}=7 vs {C,D,E}=6. Traps A with B at depth 2.',
      aBitNote: 'A gets 2 bits ("00")',
      codes: { A: '00', B: '01', C: '10', D: '110', E: '111' } as Record<string, string>,
      totalBits: 30,
      avgBits: '2.31',
      isOptimal: false,
    },
    {
      id: 3,
      name: '3. Huffman Coding',
      badge: 'Bottom-Up Greedy (Optimal)',
      badgeBg: '#147D78',
      badgeColor: '#FFFFFF',
      accentColor: '#147D78',
      borderColor: '#147D78',
      howItWorks: 'Merges rarest symbols at the bottom first (D+E, B+C), leaving frequent A at depth 1!',
      aBitNote: 'A gets 1 bit ("0")!',
      codes: { A: '0', B: '100', C: '101', D: '110', E: '111' } as Record<string, string>,
      totalBits: 29,
      avgBits: '2.23',
      isOptimal: true,
    },
  ];

  return (
    <SlideLayout
      slideNumber={10}
      totalSlides={14}
      title="Why Huffman Beats Other Approaches"
      subtitle="Visual Bitstream Comparison on the Same 13-Pixel Message"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* 1. TOP VISUAL INPUT STREAM: 13 Pixels */}
        <div
          style={{
            backgroundColor: '#FAFAFA',
            border: '2px solid #202124',
            padding: '16px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            animation: 'fadeUp 0.5s ease both',
          }}
        >
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#202124' }}>
              Input Data Stream (13 Symbols)
            </div>
            <div style={{ fontSize: '17px', color: '#555555', marginTop: '2px' }}>
              Symbol <strong style={{ color: '#147D78' }}>A appears 5 times (38.5%)</strong>; rare symbols B, C, D, E appear 2 times each.
            </div>
          </div>

          {/* 13 Visual Symbol Tiles */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {stream.map((sym, idx) => {
              const isA = sym === 'A';
              return (
                <div
                  key={idx}
                  style={{
                    width: '46px',
                    height: '46px',
                    backgroundColor: isA ? '#147D78' : '#FFFFFF',
                    color: isA ? '#FFFFFF' : '#202124',
                    border: isA ? '2px solid #147D78' : '2px solid #202124',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 800,
                    animation: `scaleIn 0.35s ease ${idx * 0.03}s both`,
                  }}
                >
                  {sym}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. THREE VISUAL STRATEGY TRACKS (Physical bit blocks show exact length difference!) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {strategies.map((strat) => {
            const isVisible = currentStep >= strat.id;
            const isCurrent = currentStep === strat.id;

            return (
              <div
                key={strat.id}
                style={{
                  border: strat.isOptimal ? '3px solid #147D78' : `2px solid ${strat.borderColor}`,
                  backgroundColor: strat.isOptimal ? '#F4FAF9' : '#FFFFFF',
                  padding: '18px 28px',
                  display: 'grid',
                  gridTemplateColumns: '370px 1fr 220px',
                  alignItems: 'center',
                  gap: '28px',
                  opacity: isVisible ? 1 : 0.18,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-16px)',
                  boxShadow:
                    isCurrent || (strat.isOptimal && isVisible)
                      ? '8px 8px 0px rgba(20, 125, 120, 0.15)'
                      : 'none',
                  transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {/* Left: Strategy Name & Simple Visual Explanation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        fontSize: '23px',
                        fontWeight: 800,
                        color: strat.isOptimal ? '#147D78' : '#202124',
                      }}
                    >
                      {strat.name}
                    </span>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 800,
                        backgroundColor: strat.badgeBg,
                        color: strat.badgeColor,
                        padding: '3px 9px',
                        borderRadius: '3px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {strat.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '16px', color: '#444444', lineHeight: 1.35 }}>
                    {strat.howItWorks}
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: 800,
                      color: strat.accentColor,
                      fontFamily: 'monospace',
                    }}
                  >
                    &rarr; {strat.aBitNote}
                  </div>
                </div>

                {/* Middle: Physical Proportional Bitstream Blocks (19px per bit) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      height: '46px',
                    }}
                  >
                    {stream.map((sym, idx) => {
                      const code = strat.codes[sym];
                      const bitLen = code.length;
                      const isA = sym === 'A';
                      // Physical width directly proportional to number of bits!
                      const blockWidth = bitLen * 21;

                      return (
                        <div
                          key={idx}
                          style={{
                            width: isVisible ? `${blockWidth}px` : '0px',
                            height: '44px',
                            backgroundColor: isA ? strat.accentColor : '#F3F4F6',
                            color: isA ? '#FFFFFF' : '#202124',
                            border: isA ? `1.5px solid ${strat.accentColor}` : '1.5px solid #BDBDBD',
                            borderRadius: '3px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            transition: `width 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.025}s`,
                          }}
                        >
                          <span style={{ fontSize: '11px', fontWeight: 700, opacity: 0.85 }}>
                            {sym}
                          </span>
                          <span
                            style={{
                              fontFamily: 'monospace',
                              fontSize: '13px',
                              fontWeight: 800,
                              letterSpacing: '-0.03em',
                            }}
                          >
                            {code}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Proportional Total Bit Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: isVisible ? `${(strat.totalBits / 39) * 100}%` : '0%',
                        maxWidth: '855px',
                        height: '10px',
                        backgroundColor: strat.accentColor,
                        borderRadius: '5px',
                        transition: 'width 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.15s',
                      }}
                    />
                  </div>
                </div>

                {/* Right: Clear Bit Count & Average Score */}
                <div
                  style={{
                    textAlign: 'right',
                    borderLeft: '2px solid #E5E5E5',
                    paddingLeft: '20px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '36px',
                      fontWeight: 800,
                      color: strat.accentColor,
                      fontFamily: 'monospace',
                      lineHeight: 1.1,
                    }}
                  >
                    {strat.totalBits} <span style={{ fontSize: '20px' }}>bits</span>
                  </div>
                  <div
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#555555',
                      marginTop: '4px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {strat.avgBits} bits/symbol
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. BOTTOM KEY TAKEAWAY */}
        <div
          style={{
            borderLeft: '6px solid #147D78',
            backgroundColor: '#F4FAF9',
            padding: '16px 28px',
            fontSize: '23px',
            color: '#202124',
            fontWeight: 600,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>
            <strong style={{ color: '#147D78' }}>Why Bottom-Up Wins:</strong> By merging rare symbols first, Huffman frees frequent symbol <strong>A</strong> to use just <strong>1 bit</strong>—producing the shortest possible bitstream.
          </span>
          <span
            style={{
              fontSize: '17px',
              fontFamily: 'monospace',
              fontWeight: 800,
              color: '#147D78',
              backgroundColor: '#E0F2F1',
              padding: '6px 14px',
              borderRadius: '4px',
              flexShrink: 0,
            }}
          >
            Step {currentStep} / 3
          </span>
        </div>
      </div>
    </SlideLayout>
  );
};
