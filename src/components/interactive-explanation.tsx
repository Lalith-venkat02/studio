'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Leaf } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const PARTICLE_COUNT = 300;
const INTERACTION_RADIUS = 80;

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  state: 'co2' | 'o2';
}

export function InteractiveExplanation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const purificationImage = PlaceHolderImages.find(p => p.id === 'purification-cycle');
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initialParticles: Particle[] = Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      state: 'co2',
    }));
    setParticles(initialParticles);

    const animateParticles = () => {
        setParticles(prevParticles => 
            prevParticles.map(p => {
                let newX = p.x + p.vx;
                let newY = p.y + p.vy;
                let newVx = p.vx;
                let newVy = p.vy;

                if (newX <= 0 || newX >= 100) newVx = -newVx;
                if (newY <= 0 || newY >= 100) newVy = -newVy;

                return { ...p, x: newX, y: newY, vx: newVx, vy: newVy };
            })
        );
        animationFrameId.current = requestAnimationFrame(animateParticles);
    };

    animationFrameId.current = requestAnimationFrame(animateParticles);

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setParticles(prevParticles =>
        prevParticles.map(p => {
          const dx = (p.x / 100) * rect.width - mouseX;
          const dy = (p.y / 100) * rect.height - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < INTERACTION_RADIUS) {
            return { ...p, state: 'o2' };
          }
          return { ...p, state: 'co2' };
        })
      );
    };
    
    const handleMouseLeave = () => {
        setParticles(prev => prev.map(p => ({ ...p, state: 'co2' })));
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
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
            {purificationImage && (
              <Image
                src={purificationImage.imageUrl}
                alt={purificationImage.description}
                data-ai-hint={purificationImage.imageHint}
                fill
                className="object-contain object-center opacity-10"
              />
            )}
            {particles.map(particle => (
              <div
                key={particle.id}
                id={`particle-${particle.id}`}
                className={cn(
                  'absolute h-1 w-1 rounded-full transition-colors duration-200',
                   particle.state === 'co2' ? 'bg-destructive/70' : 'bg-primary/80'
                )}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  transform: 'translate(-50%, -50%)',
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
