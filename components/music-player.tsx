'use client';

import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 🔥 auto play try on load
  useEffect(() => {
    const tryPlay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          // autoplay blocked 😅
          console.log("Autoplay blocked");
        }
      }
    };

    tryPlay();
  }, []);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.log("Audio error:", err);
    }
  };

  return (
    <>
      {/* muted trick for better autoplay chance */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
      />

      <button
        onClick={togglePlayPause}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-2xl hover:scale-110 transition-all duration-300"
      >
        {isPlaying ? "⏸️" : "▶️"}
      </button>
    </>
  );
}
