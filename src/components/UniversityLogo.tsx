import React, { useState } from 'react';

interface UniversityLogoProps {
  size?: number;
}

export const UniversityLogo: React.FC<UniversityLogoProps> = ({ size = 150 }) => {
  const [imageError, setImageError] = useState(false);
  const logoPath = '/assets/njupt-square-emblem.png';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
      }}
    >
      {!imageError ? (
        <img
          src={logoPath}
          alt="NJUPT Square Emblem"
          onError={() => setImageError(true)}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '2px solid #147D78',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F7FCFC',
            padding: '12px',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#147D78',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.05em',
            }}
          >
            NJUPT
          </div>
          <div
            style={{
              fontSize: '11px',
              color: '#777777',
              marginTop: '4px',
              lineHeight: 1.2,
            }}
          >
            Square Emblem Slot<br />
            <code>njupt-square-emblem.png</code>
          </div>
        </div>
      )}
    </div>
  );
};
