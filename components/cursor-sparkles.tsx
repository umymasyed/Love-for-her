'use client';

import { useEffect, useRef } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export default function CursorSparkles() {
  const sparklesRef = useRef<Sparkle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const throttleRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle particle creation
      if (Date.now() - throttleRef.current < 30) return;
      throttleRef.current = Date.now();

      const sparkle: Sparkle = {
        id: idRef.current++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 1 + 0.8,
      };

      sparklesRef.current.push(sparkle);

      // Create sparkle element
      const sparkleEl = document.createElement('div');
      sparkleEl.className = 'fixed pointer-events-none z-40';
      sparkleEl.style.left = e.clientX + 'px';
      sparkleEl.style.top = e.clientY + 'px';
      sparkleEl.style.width = sparkle.size + 'px';
      sparkleEl.style.height = sparkle.size + 'px';
      sparkleEl.style.background = `radial-gradient(circle, rgba(236, 72, 153, 1), rgba(236, 72, 153, 0))`;
      sparkleEl.style.borderRadius = '50%';
      sparkleEl.style.boxShadow = `0 0 ${sparkle.size * 2}px rgba(236, 72, 153, 0.8)`;
      sparkleEl.style.animation = `cursor-sparkle ${sparkle.duration}s ease-out forwards`;
      sparkleEl.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
      sparkleEl.style.setProperty('--ty', (Math.random() - 0.5) * 100 + 'px');

      if (containerRef.current) {
        containerRef.current.appendChild(sparkleEl);

        // Remove element after animation
        setTimeout(() => {
          sparkleEl.remove();
          sparklesRef.current = sparklesRef.current.filter((s) => s.id !== sparkle.id);
        }, sparkle.duration * 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-40" />;
}
