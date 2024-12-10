"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export function Navbar() {
  return (
    <div className="w-full bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image height={40} src="/icon.svg" alt="Logo" width={40} />
          <p className="text-xl font-bold">Council</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">
              {/* Jobs */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Jobs</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4">
                    <ListItem href="/jobs/browse" title="Browse All Jobs">
                      Explore all available job opportunities
                    </ListItem>
                    <ListItem href="/jobs/featured" title="Featured Positions">
                      View highlighted opportunities
                    </ListItem>
                    <ListItem href="/jobs/search" title="Search Jobs">
                      Find specific positions using filters
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Employers */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>For Employers</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4">
                    <ListItem href="/employers/post" title="Post a Job">
                      Submit new job listings
                    </ListItem>
                    <ListItem href="/employers/manage" title="Manage Postings">
                      Review your current listings
                    </ListItem>
                    <ListItem href="/employers/guidelines" title="Guidelines">
                      Posting requirements and best practices
                    </ListItem>
                    <ListItem href="/employers/success" title="Success Stories">
                      See successful hiring stories
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Students */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>For Students</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4">
                    <ListItem href="/students/apply" title="How to Apply">
                      Application guide and tips
                    </ListItem>
                    <ListItem href="/students/resume" title="Resume Tips">
                      Create an effective resume
                    </ListItem>
                    <ListItem href="/students/interview" title="Interview Prep">
                      Interview preparation resources
                    </ListItem>
                    <ListItem href="/students/resources" title="Resources">
                      Career development tools
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About - No dropdown */}
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Pricing - No dropdown */}
              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <Accordion type="single" collapsible className="w-full">
                  {/* Jobs */}
                  <AccordionItem value="jobs">
                    <AccordionTrigger>Jobs</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        <Link
                          href="/jobs/browse"
                          className="py-2 hover:underline"
                        >
                          Browse All Jobs
                        </Link>
                        <Link
                          href="/jobs/featured"
                          className="py-2 hover:underline"
                        >
                          Featured Positions
                        </Link>
                        <Link
                          href="/jobs/search"
                          className="py-2 hover:underline"
                        >
                          Search Jobs
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Employers */}
                  <AccordionItem value="employers">
                    <AccordionTrigger>For Employers</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        <Link
                          href="/employers/post"
                          className="py-2 hover:underline"
                        >
                          Post a Job
                        </Link>
                        <Link
                          href="/employers/manage"
                          className="py-2 hover:underline"
                        >
                          Manage Postings
                        </Link>
                        <Link
                          href="/employers/guidelines"
                          className="py-2 hover:underline"
                        >
                          Guidelines
                        </Link>
                        <Link
                          href="/employers/success"
                          className="py-2 hover:underline"
                        >
                          Success Stories
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Students */}
                  <AccordionItem value="students">
                    <AccordionTrigger>For Students</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        <Link
                          href="/students/apply"
                          className="py-2 hover:underline"
                        >
                          How to Apply
                        </Link>
                        <Link
                          href="/students/resume"
                          className="py-2 hover:underline"
                        >
                          Resume Tips
                        </Link>
                        <Link
                          href="/students/interview"
                          className="py-2 hover:underline"
                        >
                          Interview Prep
                        </Link>
                        <Link
                          href="/students/resources"
                          className="py-2 hover:underline"
                        >
                          Resources
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Non-dropdown items */}
                <div className="mt-4 flex flex-col space-y-2">
                  <Link href="/about" className="py-2 hover:underline">
                    About
                  </Link>
                  <Link href="/pricing" className="py-2 hover:underline">
                    Pricing
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="mt-1 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
