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
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
