import React from 'react';
import { SlideLayout } from '../SlideLayout';
import { DemoVisualizer } from '../demo/DemoVisualizer';

export const Slide10InteractiveDemo: React.FC = () => {
  return (
    <SlideLayout
      slideNumber={10}
      title="Interactive Live Demonstration"
      subtitle="Client-Side Huffman Decomposition &amp; Reconstruction"
    >
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <DemoVisualizer />
      </div>
    </SlideLayout>
  );
};
