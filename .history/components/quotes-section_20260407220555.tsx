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
          <div className="text-center max-w-3xl mx-auto mt-6">


          I don’t even know where to start, but I just know this feeling inside me keeps growing every single day… the way I love you isn’t something small or temporary, it’s deep, soft, and endless 🤍🕊️ You’ve become such a special part of my life that even my simplest moments feel incomplete without you… the way you talk, the way you make me smile without trying, the way you stay on my mind all the time — it all means more to me than I can ever fully explain 💋✨

Sometimes I catch myself thinking about you for no reason at all, and I just smile… because having you, even like this, feels so warm and comforting 😚💞 You make my heart feel safe, loved, and understood in a way I didn’t even know I needed… and honestly, I don’t ever want to lose this feeling. It’s like you’ve become my habit, my comfort, my little happiness in everything 🤍💫

I love you in the quiet moments, in the loud ones, in every thought that randomly turns into you… I love you in ways that don’t need big words, because even silence with you feels enough 🕊️❤️ And no matter what happens, just know this one thing — my feelings for you are real, constant, and something I hold very close to my heart 🔐💋

You’re not just someone I like… you’re someone I truly, deeply care about. And maybe I don’t say it perfectly every time, but I feel it in every heartbeat — I love you, more than you know, and maybe even more than I can ever explain 🤍✨💞
          </>
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


