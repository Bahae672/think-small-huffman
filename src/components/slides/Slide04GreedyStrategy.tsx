import React from 'react';
import { SlideLayout } from '../SlideLayout';

export const Slide04GreedyStrategy: React.FC = () => {
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
            borderLeft: '5px solid #147D78',
            padding: '16px 24px',
            backgroundColor: '#F5FAF9',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: '#147D78',
              letterSpacing: '0.06em',
            }}
          >
            The Fundamental Greedy Decision
          </div>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#202124',
              marginTop: '4px',
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
            gridTemplateColumns: '1fr 1.1fr',
            gap: '64px',
            alignItems: 'center',
            margin: '20px 0',
          }}
        >
          {/* Left: Example Frequency Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '15px', color: '#555555', fontWeight: 600, textTransform: 'uppercase' }}>
              Illustrative 6-Symbol Distribution (Total = 100)
            </div>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '18px',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '2px solid #202124' }}>
                  <th style={{ padding: '10px 16px', fontWeight: 600 }}>Symbol</th>
                  <th style={{ padding: '10px 16px', textAlign: 'right', fontWeight: 600 }}>Frequency</th>
                  <th style={{ padding: '10px 16px', fontWeight: 600 }}>Greedy Evaluation</th>
                </tr>
              </thead>
              <tbody>
                {symbols.map((item, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid #EBEBEB',
                      backgroundColor: item.isMin ? '#EBF7F6' : 'transparent',
                      fontWeight: item.isMin ? 600 : 400,
                    }}
                  >
                    <td style={{ padding: '10px 16px', color: item.isMin ? '#147D78' : '#202124' }}>
                      {item.symbol}
                    </td>
                    <td
                      style={{
                        padding: '10px 16px',
                        textAlign: 'right',
                        fontFamily: 'monospace',
                        color: item.isMin ? '#147D78' : '#202124',
                      }}
                    >
                      {item.freq}
                    </td>
                    <td style={{ padding: '10px 16px', fontSize: '14px', color: item.isMin ? '#147D78' : '#888888' }}>
                      {item.isMin ? 'Minimum frequency node' : 'Retained in priority queue'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Merge Callout */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 18px',
                backgroundColor: '#FAFAFA',
                border: '1px solid #E0E0E0',
              }}
            >
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#202124' }}>
                First Greedy Fusion:
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontFamily: 'monospace',
                  color: '#147D78',
                  fontWeight: 700,
                }}
              >
                F (5) + E (9) = 14
              </div>
              <div style={{ fontSize: '14px', color: '#666666' }}>
                → Allocates composite node (14)
              </div>
            </div>
          </div>

          {/* Right: The 4-step Greedy Loop */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontSize: '15px', color: '#555555', fontWeight: 600, textTransform: 'uppercase' }}>
              The Min-Heap Greedy Execution Cycle
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {[
                { step: '01', title: 'SELECT TWO SMALLEST', desc: 'Call EXTRACT-MIN(Q) twice to get leaves x and y.' },
                { step: '02', title: 'COMBINE', desc: 'Allocate parent node z with z.freq := x.freq + y.freq.' },
                { step: '03', title: 'REINSERT', desc: 'Insert parent node z back into min-priority queue Q.' },
                { step: '04', title: 'REPEAT', desc: 'Iterate n - 1 times until exactly one root node remains.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    padding: '14px 18px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E0E0E0',
                    borderLeft: idx === 0 ? '4px solid #147D78' : '1px solid #E0E0E0',
                  }}
                >
                  <div
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: idx === 0 ? '#147D78' : '#777777',
                      fontFamily: 'monospace',
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#202124' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '13px', color: '#666666', marginTop: '2px' }}>
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
            borderTop: '1px solid #ECECEC',
            paddingTop: '16px',
            textAlign: 'center',
            fontSize: '19px',
            fontStyle: 'italic',
            color: '#444444',
          }}
        >
          "How can we assign variable-length prefix-free binary codes to minimize the total encoding cost?"
        </div>
      </div>
    </SlideLayout>
  );
};
