'use client';

import React from 'react';

interface RadarChartProps {
  data: {
    label: string;
    value: number; // 0-100
  }[];
  size?: number;
  color?: string;
  showLabels?: boolean;
}

export default function RadarChart({
  data,
  size = 200,
  color = '#3D80F8',
  showLabels = true,
}: RadarChartProps) {
  const center = size / 2;
  const radius = (size - 60) / 2; // Leave room for labels
  const angleStep = (2 * Math.PI) / data.length;

  // Generate polygon points for the data
  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2; // Start from top
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Generate polygon points string
  const polygonPoints = data
    .map((d, i) => {
      const point = getPoint(i, d.value);
      return `${point.x},${point.y}`;
    })
    .join(' ');

  // Generate grid lines
  const gridLevels = [25, 50, 75, 100];

  return (
    <div className="relative inline-block">
      <svg width={size} height={size}>
        {/* Grid circles */}
        {gridLevels.map((level) => {
          const gridPoints = data
            .map((_, i) => {
              const point = getPoint(i, level);
              return `${point.x},${point.y}`;
            })
            .join(' ');
          return (
            <polygon
              key={level}
              points={gridPoints}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis lines */}
        {data.map((_, i) => {
          const point = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill={`${color}20`}
          stroke={color}
          strokeWidth="2"
        />

        {/* Data points */}
        {data.map((d, i) => {
          const point = getPoint(i, d.value);
          return (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={color}
            />
          );
        })}
      </svg>

      {/* Labels */}
      {showLabels &&
        data.map((d, i) => {
          const angle = angleStep * i - Math.PI / 2;
          const labelRadius = radius + 25;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);

          return (
            <div
              key={i}
              className="absolute text-xs text-[#676767] whitespace-nowrap"
              style={{
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {d.label}
            </div>
          );
        })}

      {/* Center value */}
      <div
        className="absolute text-xl font-bold text-[#1A1A1A]"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {Math.round(data.reduce((acc, d) => acc + d.value, 0) / data.length)}%
      </div>
    </div>
  );
}
