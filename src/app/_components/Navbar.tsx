"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ModeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Menu } from "lucide-react";
import { type Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Icon from "./Icon";

export function Navbar({ session }: { session: Session | null }) {
  const { data: user } = api.profile.get.useQuery(undefined, {
    enabled: !!session
  });

  return (
    <div className="z-50 w-full border-b border-accent bg-background">
      <div className="z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="z-50 flex items-center gap-2">
          <Icon />
          <p className="text-xl font-bold">Council</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="z-50 hidden lg:block">
          <NavigationMenu className="z-50">
            <NavigationMenuList className="z-50 flex gap-2">
              {/* Jobs */}
              <NavigationMenuItem className="z-50">
                <NavigationMenuTrigger className="z-50">
                  Jobs
                </NavigationMenuTrigger>
                <NavigationMenuContent className="z-50">
                  <ul className="z-50 grid w-[400px] gap-2 p-4">
                    <ListItem href="/dashboard" title="Browse All Jobs">
                      Explore all available job opportunities
                    </ListItem>
                    <ListItem
                      href="/dashboard?filter=featured"
                      title="Featured Positions"
                    >
                      View highlighted opportunities
                    </ListItem>
                    <ListItem
                      href="/dashboard?focus=search"
                      title="Search Jobs"
                    >
                      Find specific positions using filters
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Employers - Show if user is COMPANY or not logged in */}
              {(!session || user?.userType === "COMPANY") && (
                <NavigationMenuItem className="z-50">
                  <NavigationMenuTrigger className="z-50">
                    For Employers
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-50">
                    <ul className="z-50 grid w-[400px] gap-2 p-4">
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
              )}

              {/* Students - Show if user is STUDENT or not logged in */}
              {(!session || user?.userType === "STUDENT") && (
                <NavigationMenuItem className="z-50">
                  <NavigationMenuTrigger className="z-50">
                    For Students
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-50">
                    <ul className="z-50 grid w-[400px] gap-2 p-4">
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
              )}

              {/* Counselors - Show if user is COUNSELOR or not logged in */}
              {(!session || user?.userType === "COUNSELOR") && (
                <NavigationMenuItem className="z-50">
                  <NavigationMenuTrigger className="z-50">
                    For Counselors
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-50">
                    <ul className="z-50 grid w-[400px] gap-2 p-4">
                      <ListItem href="/counselor/jobs" title="Manage Postings">
                        Review and approve job postings
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}

              {/* About - No dropdown */}
              <NavigationMenuItem className="z-50">
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Pricing - No dropdown */}
              <NavigationMenuItem className="z-50">
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Theme Toggle */}
              <NavigationMenuItem className="z-50">
                <ModeToggle />
              </NavigationMenuItem>

              {/* User Profile or Get Started */}
              <NavigationMenuItem className="z-50">
                {session ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="outline-none focus:outline-none"
                      >
                        <Image
                          width={30}
                          height={30}
                          src={session.user.image ?? "/defaulticon.jpg"}
                          alt={session.user.name ?? "Avatar"}
                          className="rounded-full outline-none"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/auth/signout">Logout</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button asChild>
                    <Link href="/auth/signin">Get Started</Link>
                  </Button>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="z-50 flex items-center gap-2 lg:hidden">
          <ModeToggle />
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Image
                    width={30}
                    height={30}
                    src={session.user.image ?? "/defaulticon.jpg"}
                    alt={session.user.name ?? "Avatar"}
                    className="rounded-full outline-none"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/auth/signout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/auth/signin">Get Started</Link>
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="z-50">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="z-50">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <Accordion type="single" collapsible className="z-50 w-full">
                  {/* Jobs */}
                  <AccordionItem value="jobs" className="z-50">
                    <AccordionTrigger>Jobs</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        <Link
                          href="/dashboard"
                          className="py-2 hover:underline"
                        >
                          Browse All Jobs
                        </Link>
                        <Link
                          href="/dashboard?filter=featured"
                          className="py-2 hover:underline"
                        >
                          Featured Positions
                        </Link>
                        <Link
                          href="/dashboard?focus=search"
                          className="py-2 hover:underline"
                        >
                          Search Jobs
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Employers - Show if user is COMPANY or not logged in */}
                  {(!session || user?.userType === "COMPANY") && (
                    <AccordionItem value="employers" className="z-50">
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
                  )}

                  {/* Students - Show if user is STUDENT or not logged in */}
                  {(!session || user?.userType === "STUDENT") && (
                    <AccordionItem value="students" className="z-50">
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
                  )}

                  {/* Counselors - Show if user is COUNSELOR or not logged in */}
                  {(!session || user?.userType === "COUNSELOR") && (
                    <AccordionItem value="counselors" className="z-50">
                      <AccordionTrigger>For Counselors</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-2">
                          <Link
                            href="/counselor/jobs"
                            className="py-2 hover:underline"
                          >
                            Manage Postings
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
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
    <li className="z-50">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "z-50 block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
