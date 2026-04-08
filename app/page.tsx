'use client';

import { useEffect, useRef, useState } from 'react';
import FloatingHearts from '@/components/floating-hearts';
import AnimatedText from '@/components/animated-text';
import LoveButton from '@/components/love-button';
import QuotesSection from '@/components/quotes-section';
import CursorSparkles from '@/components/cursor-sparkles';
import MusicPlayer from '@/components/music-player';

export default function Home() {
  const [showSurprise, setShowSurprise] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-[#1a0b1f] to-[#2d0a2d]"
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0">
        {/* Glowing orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-pulse-glow"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl opacity-20 animate-pulse-glow" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-secondary/15 rounded-full filter blur-3xl opacity-20 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating hearts background */}
      <FloatingHearts />

      {/* Cursor sparkles */}
      <CursorSparkles />

      {/* Music player */}
      <MusicPlayer />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl animate-fadeInUp" style={{ animationDuration: '1s' }}>
            {/* Main heading with animated text */}
            <div className="space-y-6">
              <AnimatedText />

              {/* Subtitle with glassmorphism */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:bg-white/8 transition-all duration-300">
                <p className="text-xl sm:text-2xl text-secondary/90 font-light leading-relaxed">
                 With you, even silence feels like music, every second turns into something I never want to end, and somewhere between all these feelings, I realized… my heart doesn’t just care for you — it belongs to you, I love you ❤️
                </p>
              </div>
            </div>

            {/* Interactive Love Button */}
            <LoveButton onTrigger={() => setShowSurprise(true)} />

            {/* Surprise message */}
            {showSurprise && (
              <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                <div className="backdrop-blur-md bg-black/40 fixed inset-0 z-40 pointer-events-auto" onClick={() => setShowSurprise(false)}></div>
                <div className="relative z-50 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl border border-primary/50 rounded-3xl p-12 max-w-2xl mx-4 shadow-2xl pointer-events-auto">
                  <button
                    onClick={() => setShowSurprise(false)}
                    className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="space-y-6">
                    <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-center mb-4">
                      You Are My Everything
                    </p>
                    <SurpriseMessage />
                  </div>
                </div>
              </div>
            )}

            {/* Scroll indicator */}
            <div className="mt-12 animate-float">
              <svg className="w-8 h-8 text-primary/60 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Quotes Section */}
        <QuotesSection />

        {/* Footer */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
  <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-12 max-w-2xl text-center space-y-8 shadow-[0_0_60px_rgba(255,0,150,0.15)]">

    {/* soft glow background */}
    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-40"></div>

    <div className="relative space-y-4">
      <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
        Forever Yours
      </h2>

      <div className="h-1 w-24 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full"></div>
    </div>

    {/* message */}
    <p className="relative text-lg sm:text-xl text-foreground/80 leading-relaxed font-light tracking-wide">
     There’s nothing extraordinary here… just simple feelings that became a little more special because of you 💞
    </p>

    {/* button */}
    <div className="relative flex justify-center pt-6">
      <button className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold overflow-hidden shadow-lg hover:scale-105 transition-all duration-300">

        {/* hover glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* ripple glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-accent/40 blur-xl opacity-0 group-hover:opacity-60 transition duration-500"></div>

        <span className="relative flex items-center gap-2 text-lg">
          <span className="animate-pulse">💌</span> Share Your Love
        </span>
      </button>
    </div>

  </div>
</section>

      </div>
    </div>
  );
}

function SurpriseMessage() {
  const message = "In your eyes, I found my home. In your heart, I found my soulmate. In every moment with you, I find the reason to believe in forever. You are my greatest love story, my sweetest dream, and my forever answer.";
  const words = message.split(' ');

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block text-foreground text-base sm:text-lg font-light animate-letter-appear"
          style={{
            animationDelay: `${i * 0.05}s`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
