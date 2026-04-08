'use client';

import { useState } from 'react';

interface LoveButtonProps {
  onTrigger: () => void;
}

export default function LoveButton({ onTrigger }: LoveButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create particles
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: centerX + Math.random() * 100 - 50,
      y: centerY + Math.random() * 100 - 50,
    }));

    setParticles(newParticles);
    setIsClicked(true);

    // Trigger surprise message
    setTimeout(() => {
      onTrigger();
    }, 300);

    // Clear particles after animation
    setTimeout(() => {
      setParticles([]);
      setIsClicked(false);
    }, 1000);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        className={`relative px-12 py-4 rounded-full text-xl font-bold text-white overflow-hidden group transition-all duration-300 ${
          isClicked ? 'scale-95' : 'scale-100 hover:scale-105'
        }`}
        style={{
          background: 'linear-gradient(135deg, #ec4899, #dc2626)',
          boxShadow: isClicked
            ? '0 0 40px rgba(236, 72, 153, 1)'
            : '0 0 20px rgba(236, 72, 153, 0.6)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Glowing border animation */}
        <div className="absolute inset-0 rounded-full" style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          animation: 'shimmer 2s infinite',
        }}></div>

        <span className="relative flex items-center gap-2">
          <span className="text-2xl animate-pulse">💕</span>
          {isClicked ? 'Unleashing Love...' : 'Tap for Love'}
        </span>
      </button>

      {/* Animated particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none text-2xl z-40"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            animation: 'float-up 1s ease-out forwards',
          }}
        >
          💖
        </div>
      ))}

      <style>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) scale(0.5);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </div>
  );
}
