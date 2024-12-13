"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [themeColor, setThemeColor] = useState("theme-zinc");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedThemeColor = localStorage.getItem("theme-color") ?? "theme-zinc";
    setThemeColor(savedThemeColor);

    document.documentElement.classList.remove(
      "theme-zinc",
      "theme-red",
      "theme-rose",
      "theme-orange",
      "theme-yellow",
      "theme-green",
      "theme-blue",
      "theme-violet",
    );

    document.documentElement.classList.add(savedThemeColor);
  }, []);

  const handleThemeColorChange = (color: string) => {
    document.documentElement.classList.remove(themeColor);
    document.documentElement.classList.add(color);
    localStorage.setItem("theme-color", color);
    setThemeColor(color);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? (
                  <Moon className="h-6 w-6" />
                ) : (
                  <Sun className="h-6 w-6" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top" className="mb-2">
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className="flex items-center gap-2"
          >
            <Sun className="h-4 w-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className="flex items-center gap-2"
          >
            <Moon className="h-4 w-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className="flex items-center gap-2"
          >
            <Monitor className="h-4 w-4" />
            System
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleThemeColorChange("theme-zinc")}
            className="flex items-center gap-2"
          >
            <div className="h-3 w-3 rounded-full bg-zinc-500" />
            Zinc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleThemeColorChange("theme-red")}
            className="flex items-center gap-2"
          >
            <div className="h-3 w-3 rounded-full bg-red-500" />
            Red
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleThemeColorChange("theme-rose")}
            className="flex items-center gap-2"
          >
            <div className="h-3 w-3 rounded-full bg-rose-500" />
            Rose
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleThemeColorChange("theme-orange")}
            className="flex items-center gap-2"
          >
            <div className="h-3 w-3 rounded-full bg-orange-500" />
            Orange
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleThemeColorChange("theme-yellow")}
            className="flex items-center gap-2"
          >
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            Yellow
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleThemeColorChange("theme-green")}
            className="flex items-center gap-2"
          >
            <div className="h-3 w-3 rounded-full bg-green-500" />
            Green
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleThemeColorChange("theme-blue")}
            className="flex items-center gap-2"
          >
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            Blue
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleThemeColorChange("theme-violet")}
            className="flex items-center gap-2"
          >
            <div className="h-3 w-3 rounded-full bg-violet-500" />
            Violet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
