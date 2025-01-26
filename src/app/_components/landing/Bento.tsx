"use client";

import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import DotPattern from "@/components/ui/dot-pattern";
import FlickeringGrid from "@/components/ui/flickering-grid";
import Ripple from "@/components/ui/ripple";
import SlideText from "@/components/ui/slide-text";
import SlideWrapper from "@/components/ui/slide-wrapper";
import { cn } from "@/lib/utils";
import { BrainCircuit, Building2, GraduationCap, Network } from "lucide-react";

const Bento = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-36">
      <div className="mb-12 text-center">
        <SlideText
          text="Everything you need to succeed"
          className="text-3xl font-bold tracking-tight"
          delay={0.2}
        />
        <SlideText
          text="A comprehensive platform designed to connect students with opportunities"
          className="mt-4 text-lg text-muted-foreground"
          delay={0.4}
          direction="right"
        />
      </div>

      <SlideWrapper delay={0.5}>
        <BentoGrid>
          <BentoCard
            name="Smart Job Matching"
            className="md:col-span-2"
            background={
              <AnimatedGridPattern
                maxOpacity={0.08}
                className={cn(
                  "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                  "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 bg-gradient-to-br from-indigo-500/10 via-primary/10 to-accent/10",
                )}
              />
            }
            Icon={BrainCircuit}
            description="AI-powered matching connects students with relevant opportunities based on their skills and interests."
            href="/features/matching"
            cta="Learn about our AI"
          />

          <BentoCard
            name="Admin Dashboard"
            className="md:col-span-1"
            background={
              <FlickeringGrid
                className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-sky-500/5 opacity-50"
                squareSize={4}
                gridGap={4}
                flickerChance={0.1}
                maxOpacity={0.1}
                color="rgb(var(--foreground))"
              />
            }
            Icon={Building2}
            description="Powerful admin panel for guidance counselors to review, approve, and manage job postings from employers."
            href="/features/admin"
            cta="View admin features"
          />

          <BentoCard
            name="Student Resources"
            className="md:col-span-1"
            background={
              <DotPattern
                className="animate-spin-slow absolute inset-0 h-full w-full bg-gradient-to-tr from-violet-500/5 via-secondary/10 to-rose-500/10 dark:opacity-20"
                width={32}
                height={32}
                cx={16}
                cy={16}
                cr={1.5}
                fadeOut
              />
            }
            Icon={GraduationCap}
            description="Access comprehensive career guidance materials, resume building tools, and interview preparation resources."
            href="/features/resources"
            cta="Explore resources"
          />

          <BentoCard
            name="Growing Network"
            className="md:col-span-2"
            background={
              <Ripple
                className="absolute bottom-0 right-0 bg-gradient-to-bl from-cyan-500/5 via-primary/5 to-amber-500/5"
                mainCircleSize={100}
                mainCircleOpacity={0.15}
                numCircles={6}
              />
            }
            Icon={Network}
            description="Connect with local employers and join a community of schools while accessing opportunities."
            href="/features/network"
            cta="Join our network"
          />
        </BentoGrid>
      </SlideWrapper>
      <h1 id="pricing"></h1>
    </div>
  );
};

export default Bento;
