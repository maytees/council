import "@/styles/globals.css";
import { Toaster } from "sonner";

import { type Metadata } from "next";
import { Sofia_Sans } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";
import { auth } from "@/server/auth";
import { TRPCReactProvider } from "@/trpc/react";
import Footer from "./_components/Footer";
import { Navbar } from "./_components/Navbar";

export const metadata: Metadata = {
  title: "Council - Career Guidance Platform",
  description: "A platform connecting students with career counselors and job opportunities",
  icons: [
    { rel: "icon", url: "/icon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/icon.svg" }
  ],
};

const sofia = Sofia_Sans({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en" className={`${sofia.className}`} suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <Navbar session={session} />
            {children}
            <Footer />
            <Toaster richColors closeButton position="top-right" />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
