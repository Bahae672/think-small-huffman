import React from 'react';

export type DemoStage =
  | 'upload'
  | 'pixels'
  | 'values'
  | 'frequencies'
  | 'tree'
  | 'encoding'
  | 'reconstruction'
  | 'results';

interface StageIndicatorProps {
  currentStage: DemoStage;
  onSelectStage: (stage: DemoStage) => void;
  isImageLoaded: boolean;
}

const STAGES: { id: DemoStage; label: string; stepNum: string }[] = [
  { id: 'upload', label: '1. Image', stepNum: '01' },
  { id: 'pixels', label: '2. Pixels', stepNum: '02' },
  { id: 'values', label: '3. RGBA Values', stepNum: '03' },
  { id: 'frequencies', label: '4. Frequencies', stepNum: '04' },
  { id: 'tree', label: '5. Greedy Tree', stepNum: '05' },
  { id: 'encoding', label: '6. Encoding', stepNum: '06' },
  { id: 'reconstruction', label: '7. Reconstruction', stepNum: '07' },
  { id: 'results', label: '8. Results', stepNum: '08' },
];

export const StageIndicator: React.FC<StageIndicatorProps> = ({
  currentStage,
  onSelectStage,
  isImageLoaded,
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#FAFAFA',
        border: '1px solid #E2E2E2',
        padding: '6px 12px',
        marginBottom: '16px',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
        {STAGES.map((s, idx) => {
          const isActive = currentStage === s.id;
          const stageIndex = STAGES.findIndex((st) => st.id === currentStage);
          const isPassed = idx < stageIndex;

          return (
            <React.Fragment key={s.id}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isImageLoaded || s.id === 'upload') {
                    onSelectStage(s.id);
                  }
                }}
                disabled={!isImageLoaded && s.id !== 'upload'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  border: 'none',
                  backgroundColor: isActive ? '#147D78' : isPassed ? '#EAF3F2' : 'transparent',
                  color: isActive ? '#FFFFFF' : isPassed ? '#147D78' : '#777777',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '13px',
                  cursor: !isImageLoaded && s.id !== 'upload' ? 'not-allowed' : 'pointer',
                  borderRadius: '2px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    opacity: isActive ? 0.9 : 0.6,
                    fontFamily: 'monospace',
                  }}
                >
                  {s.stepNum}
                </span>
                <span>{s.label}</span>
              </button>
              {idx < STAGES.length - 1 && (
                <span style={{ color: '#D0D0D0', fontSize: '11px', padding: '0 2px' }}>
                  &rarr;
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
