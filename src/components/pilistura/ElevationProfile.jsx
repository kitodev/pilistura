import React from "react";

const PROFILES = {
  easy: [20, 30, 45, 35, 50, 40, 30, 25, 20],
  moderate: [15, 40, 65, 50, 75, 55, 70, 40, 20],
  hard: [10, 55, 80, 60, 90, 70, 85, 45, 15],
  extreme: [10, 70, 95, 55, 100, 65, 90, 80, 20],
};

export default function ElevationProfile({ difficulty = "moderate", className = "" }) {
  const points = PROFILES[difficulty] || PROFILES.moderate;
  const width = 160;
  const height = 50;
  const stepX = width / (points.length - 1);

  const pathData = points
    .map((y, i) => {
      const px = i * stepX;
      const py = height - (y / 100) * height;
      return i === 0 ? `M${px},${py}` : `L${px},${py}`;
    })
    .join(" ");

  const areaPath = `${pathData} L${width},${height} L0,${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`elGrad-${difficulty}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#elGrad-${difficulty})`} />
      <path d={pathData} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
