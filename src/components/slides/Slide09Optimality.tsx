import React from 'react';
import { SlideLayout } from '../SlideLayout';

interface Slide09OptimalityProps {
  step?: number;
}

export const Slide09Optimality: React.FC<Slide09OptimalityProps> = ({ step = 0 }) => {
  return (
    <SlideLayout
      slideNumber={9}
      totalSlides={14}
      title="Why Does the Greedy Algorithm Work?"
      subtitle="Mathematical Proof Structure of Global Optimality (CLRS Theorems 16.3 &amp; 16.4)"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: '6px 0',
        }}
      >
        <div style={{ fontSize: '27px', color: '#333333', lineHeight: 1.4 }}>
          In combinatorial optimization, greedy choices often get trapped in local minima. For Huffman Coding, global optimality is guaranteed by three structural lemmas:
        </div>

        {/* 3 Large Academic Argument Panels with Visual Proof Diagrams */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '32px',
            margin: '16px 0',
            flex: 1,
          }}
        >
          {/* 01: Greedy-Choice Property (Visual Exchange Argument) */}
          <div
            style={{
              padding: '28px 26px',
              backgroundColor: step === 0 ? '#F4FAF9' : '#FAFAFA',
              border: step === 0 ? '2.5px solid #147D78' : '2px solid #E2E2E2',
              borderTop: '6px solid #147D78',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: step === 0 ? '8px 8px 0px rgba(20, 125, 120, 0.14)' : 'none',
              animation: 'fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
              transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#147D78',
                  letterSpacing: '0.06em',
                  marginBottom: '10px',
                }}
              >
                01 — GREEDY CHOICE
              </div>
              <div
                style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#202124',
                  lineHeight: 1.3,
                  marginBottom: '12px',
                }}
              >
                The Exchange Argument
              </div>
              <div
                style={{
                  fontSize: '21px',
                  color: '#444444',
                  lineHeight: 1.45,
                }}
              >
                In any optimal tree <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>T</span>, swapping the two lowest-frequency leaves (<strong style={{ color: '#147D78' }}>x, y</strong>) into the deepest sibling positions (<strong style={{ color: '#555' }}>a, b</strong>) never increases total cost:
              </div>
            </div>

            {/* Visual Exchange Argument SVG Diagram */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #D8E8E6',
                borderRadius: '4px',
                padding: '10px 8px',
                margin: '12px 0',
              }}
            >
              <svg viewBox="0 0 380 155" style={{ width: '100%', height: '140px' }}>
                {/* Left Mini-Tree: Arbitrary Tree T */}
                <text x="85" y="18" textAnchor="middle" fontSize="13" fontWeight="800" fill="#666">
                  Arbitrary Tree T
                </text>
                <polygon points="85,28 35,105 135,105" fill="#F5F5F5" stroke="#888" strokeWidth="1.5" />
                {/* High-depth leaves a, b */}
                <line x1="108" y1="105" x2="92" y2="132" stroke="#202124" strokeWidth="2" />
                <line x1="108" y1="105" x2="124" y2="132" stroke="#202124" strokeWidth="2" />
                <circle cx="92" cy="135" r="14" fill="#FFFFFF" stroke="#202124" strokeWidth="2" />
                <text x="92" y="139" textAnchor="middle" fontSize="13" fontWeight="800">a</text>
                <circle cx="124" cy="135" r="14" fill="#FFFFFF" stroke="#202124" strokeWidth="2" />
                <text x="124" y="139" textAnchor="middle" fontSize="13" fontWeight="800">b</text>
                {/* Shallow lowest-freq nodes x, y */}
                <circle cx="52" cy="78" r="14" fill="#E6F4F3" stroke="#147D78" strokeWidth="2" />
                <text x="52" y="82" textAnchor="middle" fontSize="13" fontWeight="800" fill="#147D78">x</text>
                <circle cx="84" cy="84" r="14" fill="#E6F4F3" stroke="#147D78" strokeWidth="2" />
                <text x="84" y="88" textAnchor="middle" fontSize="13" fontWeight="800" fill="#147D78">y</text>

                {/* Curved Swap Arrow in Center */}
                <text x="190" y="72" textAnchor="middle" fontSize="13" fontWeight="800" fill="#147D78">
                  SWAP
                </text>
                <text x="190" y="94" textAnchor="middle" fontSize="24" fontWeight="800" fill="#147D78">
                  &rarr;
                </text>
                <text x="190" y="114" textAnchor="middle" fontSize="12" fontWeight="700" fill="#147D78">
                  x &harr; a, y &harr; b
                </text>

                {/* Right Mini-Tree: Swapped Tree T' */}
                <text x="295" y="18" textAnchor="middle" fontSize="13" fontWeight="800" fill="#147D78">
                  Swapped Tree T&apos;
                </text>
                <polygon points="295,28 245,105 345,105" fill="#F0F9F8" stroke="#147D78" strokeWidth="1.5" />
                <circle cx="262" cy="78" r="14" fill="#FFFFFF" stroke="#202124" strokeWidth="2" />
                <text x="262" y="82" textAnchor="middle" fontSize="13" fontWeight="800">a</text>
                <circle cx="294" cy="84" r="14" fill="#FFFFFF" stroke="#202124" strokeWidth="2" />
                <text x="294" y="88" textAnchor="middle" fontSize="13" fontWeight="800">b</text>
                {/* x, y now deepest sibling leaves! */}
                <line x1="318" y1="105" x2="302" y2="132" stroke="#147D78" strokeWidth="2.5" />
                <line x1="318" y1="105" x2="334" y2="132" stroke="#147D78" strokeWidth="2.5" />
                <circle cx="302" cy="135" r="14" fill="#147D78" />
                <text x="302" y="139" textAnchor="middle" fontSize="13" fontWeight="800" fill="#FFF">x</text>
                <circle cx="334" cy="135" r="14" fill="#147D78" />
                <text x="334" y="139" textAnchor="middle" fontSize="13" fontWeight="800" fill="#FFF">y</text>
              </svg>
            </div>

            <div
              style={{
                paddingTop: '10px',
                borderTop: '1px solid #E0E0E0',
                fontSize: '18px',
                color: '#147D78',
                fontWeight: 700,
                fontFamily: 'monospace',
              }}
            >
              Cost(T&apos;) &le; Cost(T) &rarr; Safe to merge x &amp; y!
            </div>
          </div>

          {/* 02: Reduction */}
          <div
            style={{
              padding: '28px 26px',
              backgroundColor: step === 1 ? '#F4FAF9' : '#FAFAFA',
              border: step === 1 ? '2.5px solid #147D78' : '2px solid #E2E2E2',
              borderTop: '6px solid #202124',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              opacity: step >= 1 ? 1 : 0.25,
              transform: step >= 1 ? 'translateY(0)' : 'translateY(14px)',
              boxShadow: step === 1 ? '8px 8px 0px rgba(20, 125, 120, 0.14)' : 'none',
              transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#202124',
                  letterSpacing: '0.06em',
                  marginBottom: '10px',
                }}
              >
                02 — REDUCTION
              </div>
              <div
                style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#202124',
                  lineHeight: 1.3,
                  marginBottom: '12px',
                }}
              >
                Problem Space Contraction
              </div>
              <div
                style={{
                  fontSize: '21px',
                  color: '#444444',
                  lineHeight: 1.45,
                }}
              >
                Fusing leaves <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>x</span> and <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>y</span> into composite symbol <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>z</span> reduces the alphabet size from <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>n</span> to <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>n &minus; 1</span>:
              </div>
            </div>

            {/* Visual Reduction Mini-Diagram */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #E0E0E0',
                borderRadius: '4px',
                padding: '10px 8px',
                margin: '12px 0',
              }}
            >
              <svg viewBox="0 0 380 155" style={{ width: '100%', height: '140px' }}>
                {/* Left: Parent with x, y */}
                <circle cx="95" cy="52" r="22" fill="#FAFAFA" stroke="#202124" strokeWidth="2" />
                <text x="95" y="57" textAnchor="middle" fontSize="14" fontWeight="800">x+y</text>
                <line x1="81" y1="70" x2="60" y2="112" stroke="#202124" strokeWidth="2" />
                <line x1="109" y1="70" x2="130" y2="112" stroke="#202124" strokeWidth="2" />
                <circle cx="60" cy="124" r="18" fill="#E6F4F3" stroke="#147D78" strokeWidth="2" />
                <text x="60" y="129" textAnchor="middle" fontSize="15" fontWeight="800" fill="#147D78">x</text>
                <circle cx="130" cy="124" r="18" fill="#E6F4F3" stroke="#147D78" strokeWidth="2" />
                <text x="130" y="129" textAnchor="middle" fontSize="15" fontWeight="800" fill="#147D78">y</text>

                {/* Arrow */}
                <text x="195" y="75" textAnchor="middle" fontSize="13" fontWeight="800" fill="#202124">
                  COLLAPSE
                </text>
                <text x="195" y="98" textAnchor="middle" fontSize="24" fontWeight="800" fill="#147D78">
                  &rarr;
                </text>
                <text x="195" y="118" textAnchor="middle" fontSize="12" fontWeight="700" fill="#666">
                  n &rarr; n &minus; 1
                </text>

                {/* Right: Single leaf z */}
                <circle cx="295" cy="88" r="28" fill="#147D78" />
                <text x="295" y="84" textAnchor="middle" fontSize="17" fontWeight="800" fill="#FFF">z</text>
                <text x="295" y="102" textAnchor="middle" fontSize="11" fontWeight="700" fill="#E0F2F1">f(x)+f(y)</text>
              </svg>
            </div>

            <div
              style={{
                paddingTop: '10px',
                borderTop: '1px solid #E0E0E0',
                fontSize: '18px',
                color: '#202124',
                fontWeight: 700,
                fontFamily: 'monospace',
              }}
            >
              Cost(T) = Cost(T&apos;) + f(x) + f(y)
            </div>
          </div>

          {/* 03: Optimal Substructure */}
          <div
            style={{
              padding: '28px 26px',
              backgroundColor: step === 2 ? '#F4FAF9' : '#FAFAFA',
              border: step === 2 ? '2.5px solid #147D78' : '2px solid #E2E2E2',
              borderTop: '6px solid #147D78',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              opacity: step >= 2 ? 1 : 0.25,
              transform: step >= 2 ? 'translateY(0)' : 'translateY(14px)',
              boxShadow: step === 2 ? '8px 8px 0px rgba(20, 125, 120, 0.14)' : 'none',
              transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#147D78',
                  letterSpacing: '0.06em',
                  marginBottom: '10px',
                }}
              >
                03 — OPTIMAL SUBSTRUCTURE
              </div>
              <div
                style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#202124',
                  lineHeight: 1.3,
                  marginBottom: '12px',
                }}
              >
                Inductive Extension
              </div>
              <div
                style={{
                  fontSize: '21px',
                  color: '#444444',
                  lineHeight: 1.45,
                }}
              >
                An optimal tree <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>T&apos;</span> for the reduced alphabet <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>C&apos;</span> expands into an optimal tree <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>T</span> for <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>C</span> by expanding leaf <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>z</span> back into children <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>x, y</span>:
              </div>
            </div>

            {/* Visual Substructure Expansion Mini-Diagram */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #D8E8E6',
                borderRadius: '4px',
                padding: '10px 8px',
                margin: '12px 0',
              }}
            >
              <svg viewBox="0 0 380 155" style={{ width: '100%', height: '140px' }}>
                <polygon points="85,22 35,95 135,95" fill="#F0F9F8" stroke="#147D78" strokeWidth="1.5" />
                <text x="85" y="65" textAnchor="middle" fontSize="14" fontWeight="800" fill="#147D78">Optimal T&apos;</text>
                <circle cx="105" cy="95" r="16" fill="#147D78" />
                <text x="105" y="100" textAnchor="middle" fontSize="14" fontWeight="800" fill="#FFF">z</text>

                <text x="190" y="72" textAnchor="middle" fontSize="13" fontWeight="800" fill="#147D78">
                  EXPAND
                </text>
                <text x="190" y="95" textAnchor="middle" fontSize="24" fontWeight="800" fill="#147D78">
                  &rarr;
                </text>

                <polygon points="295,22 245,95 345,95" fill="#F0F9F8" stroke="#147D78" strokeWidth="1.5" />
                <text x="295" y="65" textAnchor="middle" fontSize="14" fontWeight="800" fill="#147D78">Optimal T</text>
                <circle cx="315" cy="95" r="14" fill="#FFFFFF" stroke="#147D78" strokeWidth="2" />
                <text x="315" y="99" textAnchor="middle" fontSize="12" fontWeight="800" fill="#147D78">z</text>
                <line x1="307" y1="107" x2="295" y2="130" stroke="#147D78" strokeWidth="2" />
                <line x1="323" y1="107" x2="335" y2="130" stroke="#147D78" strokeWidth="2" />
                <circle cx="295" cy="136" r="13" fill="#147D78" />
                <text x="295" y="140" textAnchor="middle" fontSize="12" fontWeight="800" fill="#FFF">x</text>
                <circle cx="335" cy="136" r="13" fill="#147D78" />
                <text x="335" y="140" textAnchor="middle" fontSize="12" fontWeight="800" fill="#FFF">y</text>
              </svg>
            </div>

            <div
              style={{
                paddingTop: '10px',
                borderTop: '1px solid #E0E0E0',
                fontSize: '18px',
                color: '#147D78',
                fontWeight: 700,
                fontFamily: 'monospace',
              }}
            >
              By induction on n &rarr; Globally Optimal!
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            borderLeft: '8px solid #147D78',
            padding: '18px 32px',
            backgroundColor: '#F3F9F9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#147D78' }}>
            Result: Local greedy merges guarantee a globally optimal prefix-free code.
          </div>
          <div style={{ fontSize: '22px', color: '#555555', fontWeight: 600 }}>
            Theorem (Huffman, 1952)
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
