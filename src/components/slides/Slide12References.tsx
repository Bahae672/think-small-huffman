import React from 'react';
import { SlideLayout } from '../SlideLayout';

export const Slide12References: React.FC = () => {
  const references = [
    {
      num: '[1]',
      authors: 'Huffman, D. A.',
      year: '1952',
      title: 'A Method for the Construction of Minimum-Redundancy Codes.',
      venue: 'Proceedings of the IRE',
      details: 'vol. 40, no. 9, pp. 1098–1101.',
      note: 'Foundational paper introducing the greedy binary tree construction algorithm for optimal prefix-free codes.',
    },
    {
      num: '[2]',
      authors: 'World Wide Web Consortium (W3C)',
      year: '2025',
      title: 'Portable Network Graphics (PNG) Specification, Third Edition.',
      venue: 'W3C Recommendation',
      details: 'Available online at w3.org/TR/png-3/',
      note: 'Specifies the standard lossless raster image container format, chunk layout, and compression architecture.',
    },
    {
      num: '[3]',
      authors: 'Deutsch, P.',
      year: '1996',
      title: 'DEFLATE Compressed Data Format Specification version 1.3.',
      venue: 'Internet Engineering Task Force (IETF)',
      details: 'RFC 1951.',
      note: 'Formal specification of the compression standard coupling LZ77 dictionary coding with Huffman entropy encoding.',
    },
    {
      num: '[4]',
      authors: 'Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C.',
      year: '2009',
      title: 'Introduction to Algorithms, Third Edition.',
      venue: 'The MIT Press',
      details: 'Cambridge, MA, Chapter 16: Greedy Algorithms (pp. 428–436).',
      note: 'Primary theoretical course reference for Algorithm 1 pseudocode, greedy-choice property, and optimality induction.',
    },
  ];

  return (
    <SlideLayout
      slideNumber={12}
      title="References"
      subtitle="Foundational Literature &amp; Technical Standards"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: '10px 40px',
        }}
      >
        <div style={{ fontSize: '16px', color: '#666666', marginBottom: '16px' }}>
          Academic citations and specifications referenced throughout this analysis:
        </div>

        {/* Bibliography List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            flex: 1,
          }}
        >
          {references.map((ref, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '20px',
                padding: '18px 24px',
                backgroundColor: '#FAFAFA',
                border: '1px solid #E5E5E5',
              }}
            >
              <div
                style={{
                  fontSize: '17px',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  color: '#147D78',
                  minWidth: '35px',
                }}
              >
                {ref.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '18px', color: '#202124', lineHeight: 1.4 }}>
                  <strong>{ref.authors}</strong> ({ref.year}). {ref.title}{' '}
                  <span style={{ fontStyle: 'italic', color: '#444444' }}>{ref.venue}</span>, {ref.details}
                </div>
                <div style={{ fontSize: '14px', color: '#777777', marginTop: '6px' }}>
                  {ref.note}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course Acknowledgement Footer */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid #ECECEC',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
            color: '#777777',
          }}
        >
          <span>Nanjing University of Posts and Telecommunications — Analysis of Algorithms</span>
          <span>Academic Presentation &bull; November 2026</span>
        </div>
      </div>
    </SlideLayout>
  );
};
