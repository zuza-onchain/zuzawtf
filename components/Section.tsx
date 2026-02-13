import * as React from "react";

export function Section({
  id,
  eyebrow,
  title,
  children
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-12">
      <div className="mb-6">
        <div className="font-mono text-xs tracking-[0.22em] text-ink-3/80">
          {eyebrow}
        </div>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink-4">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

