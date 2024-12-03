// src/components/Loader.tsx
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="spinner-border"
        role="status"
        style={{ color: 'green' }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
