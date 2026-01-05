import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import GreonLogo from '@/components/greon-logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Waves, Leaf, Wind } from 'lucide-react';
import { InteractiveExplanation } from '@/components/interactive-explanation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  const howItWorksSteps = [
    {
      icon: Waves,
      title: '1. Air Intake',
      description: 'GREON units draw in ambient air from the room, capturing pollutants, dust, and excess CO₂.',
    },
    {
      icon: Leaf,
      title: '2. Algae Photosynthesis',
      description: 'Inside the unit, our proprietary microalgae bio-reactor uses photosynthesis to metabolize CO₂ and other contaminants, just like plants in nature.',
    },
    {
      icon: Wind,
      title: '3. Oxygen Release',
      description: 'The system releases purified, oxygen-rich air back into your space, creating a healthier and more refreshing environment.',
    },
  ];


  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm">
        <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
          <GreonLogo className="h-8 w-auto text-primary" />
          <span className="text-xl font-bold text-primary font-headline">GREON</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
               <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                    GREON: Nature's Green Gold
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl">
                    A revolutionary microalgae air purification system. Monitor your impact, manage your units, and breathe cleaner air.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/login">
                      User Portal
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/admin/login">
                      Admin Portal
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  width={600}
                  height={400}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-lg"
                />
              )}
            </div>
          </div>
        </section>
        <InteractiveExplanation />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary font-headline">
                The Science Behind GREON
              </h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our system harnesses the power of nature, simplified into three core steps.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <Card key={step.title} className="bg-card">
                  <CardHeader className="items-center text-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-muted-foreground">
                    <p>{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 GREON Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
