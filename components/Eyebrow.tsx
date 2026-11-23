import React from 'react';

// Section label: "01 —— The experience"
const Eyebrow: React.FC<{ n: string; label: string; light?: boolean }> = ({ n, label, light }) => (
  <span className={`flex items-center gap-3 text-sm font-medium ${light ? 'text-white/60' : 'text-navy/60'}`}>
    <span className={`tabular-nums ${light ? 'text-gold' : 'text-golddeep'}`}>{n}</span>
    <span className={`w-8 h-px ${light ? 'bg-white/30' : 'bg-navy/20'}`} />
    {label}
  </span>
);

export default Eyebrow;
