'use client';

import { useEffect, useState } from 'react';

export default function AnimatedText() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'I Love You';
  const [phase, setPhase] = useState<'typing' | 'complete'>('typing');

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 120;

    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
        if (currentIndex > fullText.length) {
          setPhase('complete');
        }
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="inline-block relative">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow">
          <span className="inline-block">{displayText}</span>
          {phase === 'typing' && <span className="animate-pulse">|</span>}
        </h1>
      </div>

      {phase === 'complete' && (
        <div className="flex justify-center gap-1 mt-6 animate-fadeInUp" style={{ animationDuration: '0.8s' }}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
