'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Leaf } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const PARTICLE_COUNT = 300;
const INTERACTION_RADIUS = 80;
const REPULSION_STRENGTH = 0.02; // For CO2 particles
const ATTRACTION_STRENGTH = 0.01; // For O2 particles

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
  const mousePosition = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

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
        setParticles(prevParticles => {
            const containerRect = container?.getBoundingClientRect();
            const mouseX = mousePosition.current.x;
            const mouseY = mousePosition.current.y;
            
            return prevParticles.map(p => {
                let newVx = p.vx;
                let newVy = p.vy;

                if (mouseX !== null && mouseY !== null && containerRect) {
                    const particlePxX = (p.x / 100) * containerRect.width;
                    const particlePxY = (p.y / 100) * containerRect.height;
                    const dx = particlePxX - mouseX;
                    const dy = particlePxY - mouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < INTERACTION_RADIUS) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (INTERACTION_RADIUS - distance) / INTERACTION_RADIUS;

                        if (p.state === 'co2') { // Repel red particles
                            newVx += forceDirectionX * force * REPULSION_STRENGTH;
                            newVy += forceDirectionY * force * REPULSION_STRENGTH;
                        } else { // Attract green particles
                            newVx -= forceDirectionX * force * ATTRACTION_STRENGTH;
                            newVy -= forceDirectionY * force * ATTRACTION_STRENGTH;
                        }
                    }
                }
                
                let newX = p.x + newVx;
                let newY = p.y + newVy;

                if (newX <= 0 || newX >= 100) newVx = -newVx * 0.8;
                if (newY <= 0 || newY >= 100) newVy = -newVy * 0.8;
                
                // Clamp position
                newX = Math.max(0, Math.min(100, newX));
                newY = Math.max(0, Math.min(100, newY));

                // Apply some damping
                newVx *= 0.99;
                newVy *= 0.99;

                return { ...p, x: newX, y: newY, vx: newVx, vy: newVy };
            });
        });
        animationFrameId.current = requestAnimationFrame(animateParticles);
    };

    animationFrameId.current = requestAnimationFrame(animateParticles);

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mousePosition.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      setParticles(prevParticles =>
        prevParticles.map(p => {
          if (!mousePosition.current.x || !mousePosition.current.y) return p;
          const dx = (p.x / 100) * rect.width - mousePosition.current.x;
          const dy = (p.y / 100) * rect.height - mousePosition.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < INTERACTION_RADIUS) {
            return { ...p, state: 'o2' };
          }
          return p;
        })
      );
    };
    
    const handleMouseLeave = () => {
        mousePosition.current = { x: null, y: null };
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
