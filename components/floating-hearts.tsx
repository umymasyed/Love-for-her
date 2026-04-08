'use client';

import { useEffect, useRef } from 'react';

interface Heart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

// Seeded pseudo-random function for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate hearts with deterministic values based on ID
  const hearts: Heart[] = [];
  for (let i = 0; i < 8; i++) {
    hearts.push({
      id: i,
      left: seededRandom(i * 1.23) * 100,
      delay: seededRandom(i * 2.45) * 3,
      duration: seededRandom(i * 3.67) * 15 + 20,
      size: seededRandom(i * 4.89) * 40 + 30,
    });
  }

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
      type: 'heart' | 'star' | 'sparkle';
      rotation: number;
      rotationSpeed: number;
    }

    const particles: Particle[] = [];

    function drawHeart(x: number, y: number, size: number, rotation: number, opacity: number) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(rotation);
      ctx!.fillStyle = `rgba(236, 72, 153, ${opacity})`;
      ctx!.globalAlpha = opacity;

      const s = size;
      ctx!.beginPath();
      ctx!.moveTo(0, s);
      ctx!.bezierCurveTo(-s, 0, -s, -s, -s / 2, -s);
      ctx!.bezierCurveTo(0, -s * 1.3, s / 2, -s, s, -s);
      ctx!.bezierCurveTo(s, 0, 0, s, 0, s);
      ctx!.closePath();
      ctx!.fill();

      ctx!.restore();
    }

    function drawStar(x: number, y: number, size: number, rotation: number, opacity: number) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(rotation);
      ctx!.fillStyle = `rgba(200, 100, 255, ${opacity})`;
      ctx!.globalAlpha = opacity;

      ctx!.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = Math.cos(angle) * size;
        const y = Math.sin(angle) * size;
        if (i === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.closePath();
      ctx!.fill();
      ctx!.restore();
    }

    function drawSparkle(x: number, y: number, size: number, opacity: number) {
      ctx!.fillStyle = `rgba(255, 200, 150, ${opacity})`;
      ctx!.globalAlpha = opacity;
      ctx!.beginPath();
      ctx!.arc(x, y, size, 0, Math.PI * 2);
      ctx!.fill();
    }

    function createParticle(x: number, y: number) {
      const types: Array<'heart' | 'star' | 'sparkle'> = ['heart', 'star', 'sparkle'];
      const type = types[Math.floor(Math.random() * types.length)];
      const size = Math.random() * 15 + 5;

      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2 - 1,
        life: 1,
        size: size,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
      });
    }

    function animate() {
      // Clear canvas with semi-transparent background for trail effect
      ctx!.fillStyle = 'rgba(18, 7, 31, 0.1)';
      ctx!.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.vy *= 0.99; // Air resistance
        p.rotation += p.rotationSpeed;
        p.life *= 0.98;

        // Draw based on type
        if (p.type === 'heart') {
          drawHeart(p.x, p.y, p.size, p.rotation, p.life);
        } else if (p.type === 'star') {
          drawStar(p.x, p.y, p.size / 2, p.rotation, p.life);
        } else {
          drawSparkle(p.x, p.y, p.size / 3, p.life);
        }

        // Remove dead particles
        if (p.life < 0.01) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    // Emit particles from heart positions
    const interval = setInterval(() => {
      hearts.forEach((heart) => {
        const element = document.getElementById(`heart-${heart.id}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          for (let i = 0; i < Math.random() * 3 + 1; i++) {
            createParticle(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }
        }
      });
    }, 800);

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [hearts]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-5 pointer-events-none"
        style={{ filter: 'blur(0.5px)' }}
      />

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          id={`heart-${heart.id}`}
          className="fixed pointer-events-none z-5 animate-float-heart"
          style={{
            left: `${heart.left}%`,
            bottom: '-100px',
            fontSize: `${heart.size}px`,
            animation: `float-heart ${heart.duration}s linear forwards`,
            animationDelay: `${heart.delay}s`,
            opacity: 0.7,
            filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.6))',
          }}
        >
          ❤️
        </div>
      ))}
    </>
  );
}
