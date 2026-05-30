"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass =
    delay > 0 ? `reveal-delay-${Math.min(delay, 4)}` : "";

  return (
    <div
      ref={ref}
      className={`reveal ${delayClass} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay * 0.1}s` } : undefined}
    >
      {children}
    </div>
  );
}
