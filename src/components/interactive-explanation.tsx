'use client';

import { useRef, useEffect } from 'react';
import { Leaf } from 'lucide-react';

export function InteractiveExplanation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm text-accent-foreground">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary font-headline">
              See The Purification Process
            </h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              GREON uses microalgae to actively capture and convert CO₂ into pure oxygen. Move your cursor over
              the area below to see a simulation of how our technology cleans the air around you, particle by particle.
            </p>
          </div>
        </div>
        <div className="relative mt-12">
          <div
            ref={containerRef}
            className="group relative h-[400px] w-full overflow-hidden rounded-xl border-2 border-primary/20 bg-background p-4 [mask-image:linear-gradient(to_bottom,white,white)]"
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), hsla(var(--primary), 0.1), transparent 80%)',
              }}
            />
            <div
              className="absolute inset-0 bg-dot-pattern opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center text-lg text-muted-foreground transition-opacity duration-500 group-hover:opacity-0">
                  <Leaf className="mr-2 h-5 w-5" />
                  Move your cursor here to start purifying
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const DotPattern = () => (
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="dot-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.5" className="fill-muted-foreground/60" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
);
