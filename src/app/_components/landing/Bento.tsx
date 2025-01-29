"use client";

import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import DotPattern from "@/components/ui/dot-pattern";
import FlickeringGrid from "@/components/ui/flickering-grid";
import Ripple from "@/components/ui/ripple";
import SlideText from "@/components/ui/slide-text";
import SlideWrapper from "@/components/ui/slide-wrapper";
import { cn } from "@/lib/utils";
import { BookOpen, Building2, GraduationCap, Network } from "lucide-react";

const Bento = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-36">
      <div className="mb-12 text-center">
        <SlideText
          text="Connecting Students with Opportunities"
          className="text-3xl font-bold tracking-tight"
          delay={0.2}
        />
        <SlideText
          text="A platform built by students, for students at South Lakes High School"
          className="mt-4 text-lg text-muted-foreground"
          delay={0.4}
          direction="right"
        />
      </div>

      <SlideWrapper delay={0.5}>
        <BentoGrid>
          <BentoCard
            name="Job Listings"
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
            Icon={Building2}
            description="Browse and apply to local job opportunities posted by employers and approved by your school counselors."
            href="/dashboard"
            cta="View Jobs"
          />

          <BentoCard
            name="Career Resources"
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
            Icon={BookOpen}
            description="Access resume writing tips, interview preparation guides, and career development resources."
            href="/students/resources"
            cta="Explore Resources"
          />

          <BentoCard
            name="Student Success"
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
            description="Read success stories from fellow students who found opportunities through our platform."
            href="/employers/success"
            cta="Read Stories"
          />

          <BentoCard
            name="School Network"
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
            description="A collaborative platform where students, counselors, and employers work together to create opportunities."
            href="/about"
            cta="Learn More"
          />
        </BentoGrid>
      </SlideWrapper>
      <h1 id="pricing"></h1>
    </div>
  );
};

export default Bento;
