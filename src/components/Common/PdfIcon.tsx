import React from 'react';

const PdfIcon: React.FC<{ size?: number }> = ({ size = 16 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Document shape */}
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        fill="#E53E3E"
        stroke="#E53E3E"
        strokeWidth="1"
      />
      {/* Folded corner */}
      <path
        d="M14 2v6h6"
        fill="none"
        stroke="#B91C1C"
        strokeWidth="1"
      />
      {/* PDF text */}
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="white"
        fontSize="6"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        PDF
      </text>
    </svg>
  );
};

export default PdfIcon;