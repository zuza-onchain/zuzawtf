"use client";

import * as React from "react";

type Props = {
  value: string;
  label?: string;
  className?: string;
};

export function CopyButton({ value, label = "Copy", className }: Props) {
  const [state, setState] = React.useState<"idle" | "copied" | "error">("idle");

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
      window.setTimeout(() => setState("idle"), 1100);
    } catch {
      setState("error");
      window.setTimeout(() => setState("idle"), 1100);
    }
  }

  const text = state === "copied" ? "Copied" : state === "error" ? "Nope" : label;

  return (
    <button
      type="button"
      onClick={onCopy}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-ink-4/90 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
      }
      aria-label={`Copy ${value}`}
    >
      <span className="font-mono text-xs tracking-wide">{text}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80"
      >
        <path
          d="M8 8V6.6C8 5.72 8.72 5 9.6 5H18.4C19.28 5 20 5.72 20 6.6V15.4C20 16.28 19.28 17 18.4 17H17"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M6.6 8H15.4C16.28 8 17 8.72 17 9.6V18.4C17 19.28 16.28 20 15.4 20H6.6C5.72 20 5 19.28 5 18.4V9.6C5 8.72 5.72 8 6.6 8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

