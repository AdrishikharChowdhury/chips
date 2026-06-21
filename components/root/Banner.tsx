"use client";

import { useState, useEffect, useCallback } from "react";
import ComponentOverview from "./ComponentOverview";
import { sampleComponents } from "@/constants";

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const total = sampleComponents.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="w-full h-max">
      <ComponentOverview {...sampleComponents[current]} />
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="flex size-10 items-center justify-center rounded-full border-2 border-midnight-ink/20 text-midnight-ink transition-colors hover:border-cobalt-blue hover:text-cobalt-blue"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 12L6 8L10 4" />
          </svg>
        </button>
        <div className="flex gap-2">
          {sampleComponents.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`size-2.5 rounded-full transition-colors ${
                i === current ? "bg-cobalt-blue" : "bg-midnight-ink/20"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="flex size-10 items-center justify-center rounded-full border-2 border-midnight-ink/20 text-midnight-ink transition-colors hover:border-cobalt-blue hover:text-cobalt-blue"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 4L10 8L6 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
