"use client";

import { useEffect, useState, useCallback } from "react";

interface Mascot {
  id: string;
  char: string;
  color: string;
  delay: number;
  duration: number;
  left: number;
  top: number;
  fontSize: number;
  zIndex: number;
}

const MASCOTS: Mascot[] = [
  { id: "panda-1", char: "🐼", color: "#ffffff", delay: 0, duration: 7, left: 5, top: 20, fontSize: 40, zIndex: 40 },
  { id: "tomato-1", char: "🍅", color: "#fb7185", delay: 1, duration: 9, left: 20, top: 120, fontSize: 36, zIndex: 40 },
  { id: "potato-1", char: "🥔", color: "#fbcfe8", delay: 2, duration: 11, left: 40, top: 200, fontSize: 32, zIndex: 40 },
  { id: "panda-2", char: "🐼", color: "#ffffff", delay: 3, duration: 8, left: 60, top: 150, fontSize: 38, zIndex: 40 },
  { id: "tomato-2", char: "🍅", color: "#fb7185", delay: 0.5, duration: 7, left: 70, top: 50, fontSize: 34, zIndex: 40 },
  { id: "potato-2", char: "🥔", color: "#fbcfe8", delay: 4, duration: 9, left: 85, top: 180, fontSize: 30, zIndex: 40 },
  { id: "panda-3", char: "🐼", color: "#ffffff", delay: 1.5, duration: 9, left: 90, top: 30, fontSize: 42, zIndex: 40 },
  { id: "tomato-3", char: "🍅", color: "#fb7185", delay: 5, duration: 8, left: 5, top: 220, fontSize: 32, zIndex: 40 },
];

export default function FloatingMascots() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMascot = useCallback(
    (id: string) => {
      const messages: Record<string, string> = {
        tomato: "You clicked the tomato! 🍅 Hey cutie.",
        potato: "You clicked the potato! 🥔 I loaf you.",
        panda: "You clicked the panda! 🐼 Rawr!",
      };
      alert(messages[id] || "Hi!");
    },
    []
  );

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
      {MASCOTS.map((m) => (
        <div
          key={m.id}
          onClick={() => toggleMascot(m.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter") toggleMascot(m.id);
          }}
          role="button"
          tabIndex={0}
          className="absolute cursor-pointer select-none user-select-none focus:outline-none"
          style={{
            left: m.left,
            top: m.top,
            fontSize: m.fontSize,
            animation: `float ${m.duration}s ease-in-out infinite`,
            animationDelay: `${m.delay}s`,
            color: m.color,
            zIndex: m.zIndex,
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.5))",
          }}
          aria-label={m.id.includes("tomato") ? "Floating tomato mascot" : m.id.includes("potato") ? "Floating potato mascot" : "Floating panda mascot"}
        >
          {m.char}
        </div>
      ))}
    </div>
  );
}
