'use client';

import { useEffect, useRef, useState } from 'react';

const loveQuotes = [
  {
    quote: "I don’t need perfect, I just need you — because with you, everything feels right🦢❤️",
    author: "",
  },
  {
    quote: "In your smile, I found a little piece of heaven I never want to lose🫂❤️",
    author: "",
  },
  {
    quote: "I don’t know how it happened, but you slowly became my favorite feeling🫠❤️",
    author: "",
  },
  {
    quote: "You’re not just in my heart… you are my heart🔐❤️",
    author: "",
  },
  {
    quote: "Your happiness feels like my own, and your sadness touches my soul🥲❤️",
    author: "",
  },
  {
    quote: "Every time I think of you, my heart whispers — ‘that’s my person’🌊❤️",
    author: "",
  },
  {
    quote: "You make my world softer, warmer, and a little more magical💋❤️",
    author: "",
  },
  {
    quote: "If forever exists, I just want it to be with you 💍❤️",
    author: "",
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
       <h2 className="relative text-5xl sm:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x">
  Words of Love

  {/* glow effect */}
  <span className="absolute inset-0 text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent blur-lg opacity-30 animate-gradient-x"></span>
</h2>

<div className="py-20 flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 relative mb-20">
  <TypingText
    text={`I don’t even know where to start🫠💌, but I just know this feeling inside me keeps growing every single day… the way I love you isn’t something small or temporary, it’s deep, soft, and endless<3🫀 You’ve become such a special part of my life that even my simplest moments feel incomplete without youuuu❤️💌🫂🦢🌙 the way you talk, the way you make me smile without trying, the way you stay on my mind all the time — it all means more to me than I can ever fully explain🧠💋❤️

Sometimes I catch myself thinking about you for no reason at all, and I just smile… because having you, even like this, feels so warm and comforting 🫠💕 You make my heart feel safe, loved, and understood in a way I didn’t even know I needed… and honestly, I don’t ever want to lose this feeling ❤️🫂🦢 It’s like you’ve become my habit, my comfort, my little happiness in everything 🌙💞

I love you in the quiet moments, in the loud ones, in every thought that randomly turns into you… I love you in ways that don’t need big words, because even silence with you feels enough ❤️🌊 And no matter what happens, just know this one thing — my feelings for you are real, constant, and something I hold very close to my heart 🔐🫀💌

You’re not just someone I like… you’re someone I truly, deeply care about👀💞 And maybe I don’t say it perfectly every time, but I feel it in every heartbeat — I love you, more than you know, and maybe even more than I can ever explain 😘💋💕`}
  />
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
           ❤️ These aren’t just words… they’re pieces of my heart, quietly expressing everything I feel for you, in ways I sometimes can’t say out loud❤️
          </p>
        </div>
      </div>
    </section>
  );
}


function TypingText({ text }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const speed = 40;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <>
      <p
        className="text-lg sm:text-xl text-foreground/90 font-normal leading-relaxed whitespace-pre-line text-center max-w-3xl tracking-wide animate-shadowGlow"
        style={{ fontFamily: "'Kalam', cursive" }}
      >
        {displayedText}
        <span className="ml-1 inline-block animate-pulse">|</span>
      </p>

      <style jsx global>{`
        @keyframes shadowGlow {
          0% {
            text-shadow: 0 0 5px rgba(255, 182, 193, 0.2);
          }
          50% {
            text-shadow: 0 0 15px rgba(255, 105, 180, 0.5);
          }
          100% {
            text-shadow: 0 0 5px rgba(255, 182, 193, 0.2);
          }
        }

        .animate-shadowGlow {
          animation: shadowGlow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
