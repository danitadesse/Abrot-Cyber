"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { l: string; n: string };

// Extracts the leading number from a stat like "120+" or "15 min"
// and animates it counting up. Non-numeric stats render as-is.
function parseStat(n: string): { value: number; suffix: string } | null {
  const m = n.match(/^([0-9.]+)(.*)$/);
  if (!m) return null;
  return { value: parseFloat(m[1]), suffix: m[2] };
}

function AnimatedNumber({ n }: { n: string }) {
  const parsed = parseStat(n);
  const [display, setDisplay] = useState(parsed ? "0" + parsed.suffix : n);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!parsed) return;
    const start = performance.now();
    const duration = 1100;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic for a natural slowdown
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(parsed.value * eased);
      setDisplay(String(v) + parsed.suffix);
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  return <div className="n">{display}</div>;
}

export default function AnimatedStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid-4">
      {stats.map((s) => (
        <div className="stat" key={s.l}>
          <div className="l">{s.l}</div>
          <AnimatedNumber n={s.n} />
        </div>
      ))}
    </div>
  );
}
