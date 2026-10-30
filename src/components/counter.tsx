"use client";

import { useEffect, useState } from "react";
import { computeCounter, formatCounter } from "@/lib/date";

export default function RelationshipCounter() {
  const [counter, setCounter] = useState(computeCounter());

  useEffect(() => {
    const id = setInterval(() => setCounter(computeCounter()), 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = counter;

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div className="flex items-baseline gap-1">
        <span className="font-display text-5xl font-bold text-white md:text-7xl lg:text-8xl">{days}</span>
        <span className="text-sm font-mono text-gray-500 font-bold">d</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-xl font-bold text-gray-300">{String(hours).padStart(2, "0")}</span>
        <span className="text-xs font-mono text-gray-500 font-bold">h</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-xl font-bold text-gray-300">{String(minutes).padStart(2, "0")}</span>
        <span className="text-xs font-mono text-gray-500 font-bold">m</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-xl font-bold text-gray-300">{String(seconds).padStart(2, "0")}</span>
        <span className="text-xs font-mono text-gray-500 font-bold">s</span>
      </div>
      <p className="text-xs text-gray-500 mt-2 tracking-widest uppercase">
        since July 20, 2026
      </p>
      <p className="text-sm text-gray-400 font-display italic">{formatCounter(counter)}</p>
    </div>
  );
}
