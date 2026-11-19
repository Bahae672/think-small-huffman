import React, { useState } from 'react';

export const UniversityLogo: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const logoPath = '/assets/njupt-wide-title-logo.png';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80px',
        margin: '0 auto 40px auto',
      }}
    >
      {!imageError ? (
        <img
          src={logoPath}
          alt="Nanjing University of Posts and Telecommunications"
          onError={() => setImageError(true)}
          style={{
            maxHeight: '75px',
            maxWidth: '520px',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      ) : (
        <div
          style={{
            border: '1px solid #D0D0D0',
            padding: '12px 28px',
            borderRadius: '2px',
            textAlign: 'center',
            backgroundColor: '#FAFAFA',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#202124',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Nanjing University of Posts and Telecommunications
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#888888',
              letterSpacing: '0.05em',
              marginTop: '4px',
            }}
          >
            Asset slot: <code>public/assets/njupt-wide-title-logo.png</code>
          </div>
        </div>
      )}
    </div>
  );
};
