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
            quoteElements.forEach((_, index) => {
              const delayMs = index * 500;
              setTimeout(() => {
                setQuotes((prev) =>
                  prev.map((q, i) =>
                    i === index ? { ...q, isVisible: true } : q
                  )
                );
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
            hhhhgjjjggjjgjjjghgjjgh
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotes.map((item, index) => (
            <div
              key={index}
              data-quote-index={index}
              className={`group relative transition-all duration-700 ${
                item.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ animationDuration: '0.8s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 h-full hover:bg-white/8 transition-all duration-300 hover:border-primary/30">
                <div className="text-6xl text-primary/30 mb-4 group-hover:text-primary/50 transition-colors duration-300">
                  "
                </div>

                <p className="text-lg sm:text-xl text-foreground/90 font-light leading-relaxed mb-6">
                  {item.quote}
                </p>

                <p className="text-sm text-secondary/70 font-medium">— {item.author}</p>

                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-300 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-xl text-foreground/70 font-light">
            ✨ These words remind us that love is the most beautiful force in the universe ✨
          </p>
        </div>
      </div>
    </section>
  );
}


