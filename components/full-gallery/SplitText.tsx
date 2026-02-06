
import React from 'react';

const SplitText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span key={i} className="char-span inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
