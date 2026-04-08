'use client';

import { useEffect, useRef, useState } from 'react';

const loveQuotes = [
  {
    quote: "Love is not about finding the right person, but about being the right person for someone.",
    author: "J. Mark Comerford",
  },
  {
    quote: "In your smile, I see something more beautiful than stars.",
    author: "Unknown",
  },
  {
    quote: "I love you without knowing how, or when, or from where.",
    author: "Pablo Neruda",
  },
  {
    quote: "You are my heart, my soul, my truth, my everything.",
    author: "Unknown",
  },
  {
    quote: "Love is when the other person's happiness is more important than your own.",
    author: "H. Jackson Brown Jr.",
  },
  {
    quote: "The heart wants what it wants.",
    author: "Woody Allen",
  },
  {
    quote: "You make my heart skip a beat.",
    author: "Unknown",
  },
  {
    quote: "Forever is a long time, but I wouldn't mind spending it by your side.",
    author: "Unknown",
  },
];

interface Quote {
  quote: string;
  author: string;
  isVisible: boolean;
}

export default function QuotesSection() {
  const [quotes, setQuotes] = useState<Quote[]>(
    loveQuotes.map((q) => ({ ...q, isVisible: false }))
  );
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const quoteElements = entry.target.querySelectorAll('[data-quote-index]');
            quoteElements.forEach((el, index) => {
              const delayMs = index * 500;
              setTimeout(() => {
                el.classList.add('animate-fadeInUp');
              }, delayMs);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
    >
      <div className="max-w-5xl w-full">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Words of Love
          </h2>
          
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto rounded-full">
            
          </div>
        </div>

      

        {/* Inspirational footer */}
        <div className="mt-20 text-center">
          <p className="text-xl text-foreground/70 font-light">
            ✨ These words remind us that love is the most beautiful force in the universe ✨
          </p>
        </div>
      </div>
    </section>
  );
}
