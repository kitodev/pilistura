// @ts-nocheck
import React from "react";

export default function TopoLines({ className = "", opacity = 0.08 }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 400 Q200 350 400 380 T800 360 T1200 400"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity={opacity}
      />
      <path
        d="M0 300 Q300 250 500 280 T900 260 T1200 300"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity={opacity * 0.8}
      />
      <path
        d="M0 500 Q250 470 450 490 T850 470 T1200 500"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity={opacity * 0.8}
      />
      <path
        d="M0 200 Q350 160 550 190 T950 170 T1200 200"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity={opacity * 0.6}
      />
      <path
        d="M0 600 Q200 580 400 590 T800 575 T1200 600"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity={opacity * 0.6}
      />
      <path
        d="M0 150 Q400 110 600 140 T1000 120 T1200 150"
        stroke="currentColor"
        strokeWidth="0.4"
        opacity={opacity * 0.4}
      />
      <path
        d="M0 680 Q300 660 500 670 T900 655 T1200 680"
        stroke="currentColor"
        strokeWidth="0.4"
        opacity={opacity * 0.4}
      />
    </svg>
  );
}
