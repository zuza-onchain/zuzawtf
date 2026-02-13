"use client";

import * as React from "react";

export function PointerHalo() {
  React.useEffect(() => {
    function setVars(e: PointerEvent) {
      const x = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      const y = Math.max(0, Math.min(1, e.clientY / window.innerHeight));
      const root = document.documentElement;
      root.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
      root.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
    }

    window.addEventListener("pointermove", setVars, { passive: true });
    return () => window.removeEventListener("pointermove", setVars);
  }, []);

  return null;
}

