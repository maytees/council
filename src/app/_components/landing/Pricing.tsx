"use client";

import { Button } from "@/components/ui/button";
import Ripple from "@/components/ui/ripple";
import SlideText from "@/components/ui/slide-text";
import SlideWrapper from "@/components/ui/slide-wrapper";
import { Check } from "lucide-react";
import Link from "next/link";

const Pricing = () => {
    const freeFeatures = [
        "Limited job postings (5/month)",
        "Basic job matching",
        "Student resources library",
        "Basic analytics",
        "Email support"
    ];

    const proFeatures = [
        "Unlimited job postings",
        "AI-powered job matching",
        "Premium resources library",
        "Advanced analytics dashboard",
        "Priority support",
        "Custom school branding",
        "Employer verification",
        "Mobile-friendly interface",
        "API access"
    ];

    return (
        <div className="relative mx-auto max-w-5xl px-6 py-36">
            <Ripple
                className="opacity-90"
                mainCircleSize={300}
                mainCircleOpacity={0.15}
                numCircles={6}
            />
            <div className="mb-12 text-center">
                <SlideText
                    text="Simple, transparent pricing"
                    className="text-3xl font-bold tracking-tight"
                    delay={0.5}
                />
                <SlideText
                    text="Choose the plan that's right for your school"
                    className="mt-4 text-lg text-muted-foreground"
                    delay={0.8}
                    direction="right"
                />
            </div>

            <SlideWrapper delay={0.8}>
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="relative flex flex-col rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-8 shadow-lg">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold">Free</h3>
                            <div className="mt-4 flex items-baseline justify-center">
                                <span className="text-4xl font-bold">$0</span>
                                <span className="ml-1 text-muted-foreground">/month</span>
                            </div>
                        </div>

                        <ul className="mt-8 space-y-4 flex-grow">
                            {freeFeatures.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                    <Check className="mr-3 h-4 w-4 text-primary" />
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 text-center">
                            <Button size="lg" className="w-full" asChild>
                                <Link href="/auth/signin">
                                    Get Started
                                </Link>
                            </Button>
                            <p className="mt-3 text-xs text-muted-foreground">
                                No credit card required
                            </p>
                        </div>
                    </div>

                    <div className="relative flex flex-col rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-8 shadow-lg">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                            <span className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-white">
                                RECOMMENDED
                            </span>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold">Pro</h3>
                            <div className="mt-4 flex items-baseline justify-center">
                                <span className="text-4xl font-bold">$99</span>
                                <span className="ml-1 text-muted-foreground">/month</span>
                            </div>
                        </div>

                        <ul className="mt-8 space-y-4 flex-grow">
                            {proFeatures.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                    <Check className="mr-3 h-4 w-4 text-primary" />
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 text-center">
                            <Button
                                size="lg"
                                className="w-full bg-primary hover:bg-primary/90"
                                asChild
                            >
                                <Link href="/auth/signin">
                                    Upgrade to Pro
                                </Link>
                            </Button>
                            <p className="mt-3 text-xs text-muted-foreground">
                                14-day free trial included
                            </p>
                        </div>
                    </div>
                </div>
            </SlideWrapper>
        </div>
    );
};

export default Pricing;
