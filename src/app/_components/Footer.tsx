"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";

const Footer = () => {
  return (
    <footer className="w-full border-t border-accent bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              {/* <Image height={32} width={32} src="/icon.svg" alt="Logo" /> */}
              <Icon className="size-8" />
              <span className="text-lg font-bold">Council</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Connecting students with opportunities through AI-powered job
              matching and career resources.
            </p>
          </div>

          {/* Jobs */}
          <div>
            <h3 className="font-semibold">Jobs</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/jobs/browse"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Browse All Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/featured"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Featured Positions
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/search"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Search Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/students/apply"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  How to Apply
                </Link>
              </li>
              <li>
                <Link
                  href="/students/resume"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Resume Tips
                </Link>
              </li>
              <li>
                <Link
                  href="/students/interview"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Interview Prep
                </Link>
              </li>
              <li>
                <Link
                  href="/students/resources"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/employers/guidelines"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookies"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/accessibility"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-accent pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Council. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
