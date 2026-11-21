import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide10ComparisonProps {
  step?: number;
}

export const Slide10Comparison: React.FC<Slide10ComparisonProps> = ({ step = 0 }) => {
  // Step 0: Distribution overview
  // Step 1: Fixed-Length baseline
  // Step 2: Shannon-Fano (Top-Down heuristic)
  // Step 3: Huffman (Bottom-Up Greedy)
  // Step 4: Large comparison bar chart (~60% height) with optimality callout
  const currentStep = Math.min(4, Math.max(0, step));

  const symbols = [
    { sym: 'A', freq: 5, prob: '5/13', pct: '38.5%' },
    { sym: 'B', freq: 2, prob: '2/13', pct: '15.4%' },
    { sym: 'C', freq: 2, prob: '2/13', pct: '15.4%' },
    { sym: 'D', freq: 2, prob: '2/13', pct: '15.4%' },
    { sym: 'E', freq: 2, prob: '2/13', pct: '15.4%' },
  ];

  return (
    <SlideLayout
      slideNumber={10}
      totalSlides={14}
      title="Huffman Coding vs. Alternative Approaches"
      subtitle="Comparative Algorithmic Analysis on Integer Frequency Distribution (Total N = 13)"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        {currentStep < 4 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {/* Input Frequency Distribution Card */}
            <div
              style={{
                backgroundColor: '#FAFAFA',
                border: '2px solid #202124',
                padding: '24px 32px',
                boxShadow: '6px 6px 0px rgba(0,0,0,0.06)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <div style={{ fontSize: '26px', fontWeight: 700, color: '#202124' }}>
                  Test Distribution:{' '}
                  <span style={{ fontWeight: 500, color: '#555' }}>
                    Alphabet &Sigma; = {'{ A, B, C, D, E }'}, Total Count N = 13
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '18px',
                    backgroundColor: '#EBF7F6',
                    color: '#147D78',
                    padding: '6px 14px',
                    fontWeight: 700,
                    borderRadius: '4px',
                  }}
                >
                  Integer Frequency Benchmark
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                {symbols.map((s) => (
                  <div
                    key={s.sym}
                    style={{
                      border: s.sym === 'A' ? '2px solid #147D78' : '1px solid #D0D0D0',
                      backgroundColor: s.sym === 'A' ? '#F4FAF9' : '#FFFFFF',
                      padding: '16px',
                      textAlign: 'center',
                      borderRadius: '4px',
                    }}
                  >
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#202124' }}>{s.sym}</div>
                    <div style={{ fontSize: '22px', fontWeight: 600, color: '#147D78', margin: '4px 0' }}>
                      freq = {s.freq}
                    </div>
                    <div style={{ fontSize: '16px', color: '#666' }}>p = {s.prob} ({s.pct})</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Approach Comparison Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {/* 1. Fixed-Length */}
              <div
                style={{
                  border: '2px solid #202124',
                  backgroundColor: currentStep >= 1 ? '#FFFFFF' : '#F9F9F9',
                  padding: '24px',
                  opacity: currentStep >= 1 ? 1 : 0.35,
                  transition: 'opacity 0.3s ease',
                  boxShadow: currentStep === 1 ? '6px 6px 0px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800 }}>1. Fixed-Length</div>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      backgroundColor: '#EEEEEE',
                      color: '#666666',
                      padding: '4px 10px',
                      borderRadius: '3px',
                    }}
                  >
                    Naive Baseline
                  </span>
                </div>
                <div style={{ fontSize: '18px', color: '#666', margin: '10px 0 16px 0', minHeight: '44px' }}>
                  Uniform allocation: &lceil;log₂ 5&rceil; = 3 bits for every symbol.
                </div>
                <div
                  style={{
                    backgroundColor: '#FAFAFA',
                    padding: '12px',
                    fontFamily: 'monospace',
                    fontSize: '16px',
                    border: '1px solid #E0E0E0',
                    marginBottom: '16px',
                  }}
                >
                  <div>A: 000 (3b) &bull; B: 001 (3b)</div>
                  <div>C: 010 (3b) &bull; D: 011 (3b)</div>
                  <div>E: 100 (3b)</div>
                </div>
                <div style={{ borderTop: '2px dashed #DDD', paddingTop: '12px' }}>
                  <div style={{ fontSize: '18px', color: '#555' }}>Total Bits: <strong>39 bits</strong></div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#202124', marginTop: '4px' }}>
                    3.00 <span style={{ fontSize: '16px', fontWeight: 500 }}>b/sym</span>
                  </div>
                </div>
              </div>

              {/* 2. Shannon-Fano */}
              <div
                style={{
                  border: '2px solid #202124',
                  backgroundColor: currentStep >= 2 ? '#FFFFFF' : '#F9F9F9',
                  padding: '24px',
                  opacity: currentStep >= 2 ? 1 : 0.35,
                  transition: 'opacity 0.3s ease',
                  boxShadow: currentStep === 2 ? '6px 6px 0px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800 }}>2. Shannon-Fano</div>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      backgroundColor: '#FDE8E8',
                      color: '#C53030',
                      padding: '4px 10px',
                      borderRadius: '3px',
                    }}
                  >
                    Top-Down Greedy
                  </span>
                </div>
                <div style={{ fontSize: '18px', color: '#666', margin: '10px 0 16px 0', minHeight: '44px' }}>
                  Top split: {'{A,B}'} (7) vs {'{C,D,E}'} (6). Forces A into 2 bits.
                </div>
                <div
                  style={{
                    backgroundColor: '#FAFAFA',
                    padding: '12px',
                    fontFamily: 'monospace',
                    fontSize: '16px',
                    border: '1px solid #E0E0E0',
                    marginBottom: '16px',
                  }}
                >
                  <div>A: 00 (2b) &bull; B: 01 (2b)</div>
                  <div>C: 10 (2b) &bull; D: 110 (3b)</div>
                  <div>E: 111 (3b)</div>
                </div>
                <div style={{ borderTop: '2px dashed #DDD', paddingTop: '12px' }}>
                  <div style={{ fontSize: '18px', color: '#555' }}>
                    Total Bits: 10+4+4+6+6 = <strong>30 bits</strong>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#C53030', marginTop: '4px' }}>
                    2.31 <span style={{ fontSize: '16px', fontWeight: 500 }}>b/sym</span>
                  </div>
                </div>
              </div>

              {/* 3. Huffman */}
              <div
                style={{
                  border: '3px solid #147D78',
                  backgroundColor: currentStep >= 3 ? '#F7FCFB' : '#F9F9F9',
                  padding: '24px',
                  opacity: currentStep >= 3 ? 1 : 0.35,
                  transition: 'opacity 0.3s ease',
                  boxShadow: currentStep === 3 ? '6px 6px 0px rgba(20,125,120,0.2)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#147D78' }}>3. Huffman Coding</div>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      backgroundColor: '#147D78',
                      color: '#FFFFFF',
                      padding: '4px 10px',
                      borderRadius: '3px',
                    }}
                  >
                    Bottom-Up Optimal
                  </span>
                </div>
                <div style={{ fontSize: '18px', color: '#555', margin: '10px 0 16px 0', minHeight: '44px' }}>
                  Merge D+E=4, B+C=4, 4+4=8, 5+8=13. A gets 1 bit!
                </div>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '12px',
                    fontFamily: 'monospace',
                    fontSize: '16px',
                    border: '1px solid #B8E2DF',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#147D78' }}>A: 0 (1 bit)</div>
                  <div>B: 100 (3b) &bull; C: 101 (3b)</div>
                  <div>D: 110 (3b) &bull; E: 111 (3b)</div>
                </div>
                <div style={{ borderTop: '2px dashed #B8E2DF', paddingTop: '12px' }}>
                  <div style={{ fontSize: '18px', color: '#555' }}>
                    Total Bits: 5+6+6+6+6 = <strong>29 bits</strong>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#147D78', marginTop: '4px' }}>
                    2.23 <span style={{ fontSize: '16px', fontWeight: 500 }}>b/sym (-25.6%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Step 4: Large Comparison Bar Chart (~60% of slide) */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'fadeUp 0.5s cubic-bezier(0.2, 1, 0.3, 1) both',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '1350px',
                backgroundColor: '#FAFAFA',
                border: '2px solid #202124',
                padding: '40px 60px',
                boxShadow: '10px 10px 0px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#202124' }}>
                  Average Codeword Length (L̄) Comparison
                </div>
                <div style={{ fontSize: '20px', color: '#666' }}>
                  Evaluation on N = 13 symbols (A:5, B:2, C:2, D:2, E:2)
                </div>
              </div>

              {/* Bar 1: Fixed-Length */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '22px',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: '#444',
                  }}
                >
                  <span>1. Fixed-Length Coding (&lceil;log₂ 5&rceil; = 3 bits)</span>
                  <span style={{ fontFamily: 'monospace' }}>3.00 bits/symbol &bull; 39 total bits (100% baseline)</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '46px',
                    backgroundColor: '#E5E5E5',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#888888',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '16px',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '18px',
                    }}
                  >
                    3.00 b/sym
                  </div>
                </div>
              </div>

              {/* Bar 2: Shannon-Fano */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '22px',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: '#C53030',
                  }}
                >
                  <span>2. Shannon-Fano Top-Down Partitioning</span>
                  <span style={{ fontFamily: 'monospace' }}>2.31 bits/symbol &bull; 30 total bits (-23.1%)</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '46px',
                    backgroundColor: '#E5E5E5',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${(2.31 / 3.0) * 100}%`,
                      height: '100%',
                      backgroundColor: '#D9534F',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '16px',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '18px',
                    }}
                  >
                    2.31 b/sym
                  </div>
                </div>
              </div>

              {/* Bar 3: Huffman */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '24px',
                    fontWeight: 800,
                    marginBottom: '8px',
                    color: '#147D78',
                  }}
                >
                  <span>3. Huffman Bottom-Up Greedy Coding (Optimal)</span>
                  <span style={{ fontFamily: 'monospace' }}>2.23 bits/symbol &bull; 29 total bits (-25.6%)</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '52px',
                    backgroundColor: '#E5E5E5',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: '2px solid #147D78',
                  }}
                >
                  <div
                    style={{
                      width: `${(2.23 / 3.0) * 100}%`,
                      height: '100%',
                      backgroundColor: '#147D78',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '16px',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '20px',
                    }}
                  >
                    2.23 b/sym (Minimum Possible Length)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Prominent Scientific Statement */}
        <div
          style={{
            borderLeft: '6px solid #147D78',
            backgroundColor: '#F4FAF9',
            padding: '20px 28px',
            fontSize: '26px',
            color: '#202124',
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          <strong style={{ color: '#147D78' }}>Algorithmic Finding:</strong>{' '}
          Huffman Coding achieves the minimum average code length among binary prefix-free codes.
        </div>
      </div>
    </SlideLayout>
  );
};
