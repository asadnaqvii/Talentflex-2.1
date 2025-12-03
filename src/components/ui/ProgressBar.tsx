'use client';

import React from 'react';

interface ProgressBarProps {
  value: number;
  label?: string;
  showValue?: boolean;
  color?: string;
  height?: number;
}

export default function ProgressBar({
  value,
  label,
  showValue = true,
  color = '#3D80F8',
  height = 8,
}: ProgressBarProps) {
  // Color coding based on value
  const getColor = () => {
    if (color !== '#3D80F8') return color;
    if (value >= 80) return '#22C55E';
    if (value >= 60) return '#3D80F8';
    if (value >= 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-[#676767]">{label}</span>}
          {showValue && <span className="text-sm font-medium text-[#1A1A1A]">{value}%</span>}
        </div>
      )}
      <div
        className="w-full bg-[#E5E7EB] rounded-full overflow-hidden"
        style={{ height }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${value}%`,
            backgroundColor: getColor(),
          }}
        />
      </div>
    </div>
  );
}
