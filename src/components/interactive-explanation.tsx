'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

const PARTICLE_COUNT = 150;
const REPULSION_RADIUS = 100;
const REPULSION_STRENGTH = 1.5;

interface Particle {
  id: number;
  x: number;
  y: number;
  ref: React.RefObject<HTMLDivElement>;
}

export function InteractiveExplanation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const newParticles: Particle[] = Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        ref: React.createRef<HTMLDivElement>(),
    }));
    setParticles(newParticles);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      newParticles.forEach((p) => {
        if (!p.ref.current) return;

        const particleRect = p.ref.current.getBoundingClientRect();
        const particleX = particleRect.left - rect.left + particleRect.width / 2;
        const particleY = particleRect.top - rect.top + particleRect.height / 2;

        const dx = particleX - mouseX;
        const dy = particleY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < REPULSION_RADIUS) {
          const force = (REPULSION_RADIUS - distance) / REPULSION_RADIUS;
          const moveX = (dx / distance) * force * REPULSION_STRENGTH * 50;
          const moveY = (dy / distance) * force * REPULSION_STRENGTH * 50;
          
          p.ref.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
          p.ref.current.style.opacity = '0';
        } else {
          p.ref.current.style.transform = 'translate(0, 0)';
           p.ref.current.style.opacity = '1';
        }
      });
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
             {particles.map((particle) => (
              <div
                key={particle.id}
                ref={particle.ref}
                className="absolute h-1.5 w-1.5 rounded-full bg-muted-foreground/50 transition-transform duration-300 ease-out group-hover:transition-opacity"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  transitionProperty: 'transform, opacity',
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
