import React from "react";

export function DevFlowIcon({ className = "w-7 h-7" }) {
  return (
    <svg
      className={`${className} transition-transform duration-200 hover:scale-105`}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Sharp Hexagon Outline */}
      <path
        d="M16 3L28 9.9282V23.7846L16 30.7128L4 23.7846V9.9282L16 3Z"
        stroke="#30363D"
        strokeWidth="1.5"
        fill="#161B22"
      />

      {/* Kinetic Node Path */}
      <path
        d="M11 13L16 10L21 13V19L16 22L11 19V13Z"
        stroke="#0969DA"
        strokeWidth="1.5"
        fill="#0D1117"
      />

      {/* Connection Node Point */}
      <circle cx="16" cy="16" r="2.5" fill="#38BDF8" />
    </svg>
  );
}

export default function DevFlowLogo({ size = "md", className = "" }) {
  const sizeMap = {
    sm: { icon: "w-6 h-6", text: "text-lg" },
    md: { icon: "w-7 h-7", text: "text-xl" },
    lg: { icon: "w-9 h-9", text: "text-2xl" },
  };

  const { icon, text } = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <DevFlowIcon className={icon} />
      <span className={`font-bold tracking-tight text-white ${text}`}>
        Dev<span className="text-slate-400 font-medium">Flow</span>
      </span>
    </div>
  );
}
