"use client";
import { Button } from "@/components/ui/button";
import DotPattern from "@/components/ui/dot-pattern";
import SlideText from "@/components/ui/slide-text";
import SlideWrapper from "@/components/ui/slide-wrapper";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-[calc(95vh-65px)] w-full flex-col items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-gradient-radial absolute inset-0 from-transparent via-transparent to-background" />
        <DotPattern
          width={16}
          height={16}
          cx={1}
          cy={1}
          cr={1}
          className="-z-50"
          radial={true}
          fadeOut={true}
        />
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1 px-6 text-center">
        {/* Animated 404 Text */}
        <div className="flex items-baseline">
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: -50 }}
            transition={{
              type: "spring",
              stiffness: 500,
              delay: 0.5,
              duration: 0.1,
            }}
            className="inline-block origin-bottom text-8xl font-bold tracking-tighter text-primary md:text-9xl"
          >
            4
          </motion.span>
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: 15 }}
            transition={{
              type: "spring",
              stiffness: 600,
              delay: 0.6,
              duration: 0.1,
            }}
            className="inline-block origin-bottom text-8xl font-bold tracking-tighter text-primary md:text-9xl"
          >
            0
          </motion.span>
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: 25 }}
            transition={{
              type: "spring",
              stiffness: 900,
              delay: 1,
              duration: 0.1,
            }}
            className="inline-block origin-bottom text-8xl font-bold tracking-tighter text-primary md:text-9xl"
          >
            4
          </motion.span>
        </div>
        {/* Main Heading */}
        <SlideText
          text="Page Not Found"
          className="text-4xl font-bold tracking-tight md:text-5xl"
          delay={0.4}
        />
        {/* Description */}
        <SlideText
          text="The page you're looking for doesn't exist or has been moved."
          className="max-w-md text-muted-foreground"
          delay={0.6}
        />
        {/* Button */}
        <SlideWrapper delay={0.8}>
          <Button asChild size="lg" className="mt-4">
            <Link href="/" className="gap-2">
              Back to Home
            </Link>
          </Button>
        </SlideWrapper>
      </div>
    </div>
  );
}
