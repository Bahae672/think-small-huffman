import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide04GreedyStrategyProps {
  step?: number;
}

export const Slide04GreedyStrategy: React.FC<Slide04GreedyStrategyProps> = ({ step = 0 }) => {
  const symbols = [
    { symbol: 'A', freq: 45, isMin: false },
    { symbol: 'B', freq: 13, isMin: false },
    { symbol: 'C', freq: 12, isMin: false },
    { symbol: 'D', freq: 16, isMin: false },
    { symbol: 'E', freq: 9, isMin: true },
    { symbol: 'F', freq: 5, isMin: true },
  ];

  return (
    <SlideLayout
      slideNumber={4}
      title="The Greedy Choice"
      subtitle="Local Selection Rule for Optimal Prefix Codes"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        {/* Central Bold Statement Banner */}
        <div
          style={{
            borderLeft: '8px solid #147D78',
            padding: '20px 32px',
            backgroundColor: '#F5FAF9',
          }}
        >
          <div
            style={{
              fontSize: '22px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#147D78',
              letterSpacing: '0.06em',
            }}
          >
            The Fundamental Greedy Decision
          </div>
          <div
            style={{
              fontSize: '44px',
              fontWeight: 700,
              color: '#202124',
              marginTop: '6px',
              letterSpacing: '-0.02em',
            }}
          >
            Combine the two least frequent symbols.
          </div>
        </div>

        {/* Two-column layout: Frequency Distribution vs Algorithmic Cycle */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1fr',
            gap: '64px',
            alignItems: 'center',
            margin: '20px 0',
          }}
        >
          {/* Left: Example Frequency Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontSize: '24px', color: '#555555', fontWeight: 700, textTransform: 'uppercase' }}>
              6-Symbol Distribution (Total = 100)
            </div>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '26px',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '3px solid #202124' }}>
                  <th style={{ padding: '12px 18px', fontWeight: 700 }}>Symbol</th>
                  <th style={{ padding: '12px 18px', textAlign: 'right', fontWeight: 700 }}>Frequency</th>
                  <th style={{ padding: '12px 18px', fontWeight: 700 }}>Evaluation</th>
                </tr>
              </thead>
              <tbody>
                {symbols.map((item, idx) => {
                  const isHighlighted = step >= 1 && item.isMin;
                  return (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid #EBEBEB',
                        backgroundColor: isHighlighted ? '#E6F4F3' : 'transparent',
                        fontWeight: isHighlighted ? 700 : 500,
                        transition: 'background-color 0.3s ease',
                      }}
                    >
                      <td style={{ padding: '12px 18px', color: isHighlighted ? '#147D78' : '#202124' }}>
                        {item.symbol}
                      </td>
                      <td
                        style={{
                          padding: '12px 18px',
                          textAlign: 'right',
                          fontFamily: 'monospace',
                          color: isHighlighted ? '#147D78' : '#202124',
                        }}
                      >
                        {item.freq}
                      </td>
                      <td style={{ padding: '12px 18px', fontSize: '22px', color: isHighlighted ? '#147D78' : '#888888' }}>
                        {isHighlighted ? 'Smallest in Q (Extract-Min)' : 'Retained in priority queue'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Merge Callout */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '18px 24px',
                backgroundColor: '#FAFAFA',
                border: '2px solid #E0E0E0',
                borderLeft: '6px solid #147D78',
                opacity: step >= 1 ? 1 : 0.3,
                transition: 'opacity 0.4s ease',
              }}
            >
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#202124' }}>
                First Fusion:
              </div>
              <div
                style={{
                  fontSize: '30px',
                  fontFamily: 'monospace',
                  color: '#147D78',
                  fontWeight: 800,
                }}
              >
                F (5) + E (9) = 14
              </div>
              <div style={{ fontSize: '22px', color: '#666666' }}>
                &rarr; Allocates parent node (14)
              </div>
            </div>
          </div>

          {/* Right: The 4-step Greedy Loop */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontSize: '24px', color: '#555555', fontWeight: 700, textTransform: 'uppercase' }}>
              The Min-Heap Execution Cycle
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { stepNum: '01', title: 'SELECT TWO SMALLEST', desc: 'Call EXTRACT-MIN(Q) twice to get least frequent leaves x and y.' },
                { stepNum: '02', title: 'COMBINE', desc: 'Allocate parent node z with z.freq := x.freq + y.freq.' },
                { stepNum: '03', title: 'REINSERT', desc: 'Insert composite node z back into min-priority queue Q.' },
                { stepNum: '04', title: 'REPEAT', desc: 'Iterate n − 1 times until exactly one root node remains.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '16px 22px',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #E0E0E0',
                    borderLeft: idx === 0 ? '6px solid #147D78' : '2px solid #E0E0E0',
                  }}
                >
                  <div
                    style={{
                      fontSize: '26px',
                      fontWeight: 800,
                      color: idx === 0 ? '#147D78' : '#777777',
                      fontFamily: 'monospace',
                    }}
                  >
                    {item.stepNum}
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#202124' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '20px', color: '#555555', marginTop: '4px' }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Guiding Question at Bottom */}
        <div
          style={{
            borderTop: '2px solid #ECECEC',
            paddingTop: '20px',
            textAlign: 'center',
            fontSize: '30px',
            fontStyle: 'italic',
            color: '#333333',
          }}
        >
          "How can we assign variable-length prefix-free binary codes to minimize the total encoding cost?"
        </div>
      </div>
    </SlideLayout>
  );
};
