"use client";

import { ChevronDown, ChevronUp, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
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

  useEffect(() => {
    // Get saved theme color from localStorage
    const savedThemeColor = localStorage.getItem("theme-color") || "theme-zinc";
    setThemeColor(savedThemeColor);

    // Remove all theme classes
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

    // Add the saved theme color class
    document.documentElement.classList.add(savedThemeColor);
  }, []);

  const handleThemeColorChange = (color: string) => {
    // Remove current theme color class
    document.documentElement.classList.remove(themeColor);
    // Add new theme color class
    document.documentElement.classList.add(color);
    // Save to localStorage
    localStorage.setItem("theme-color", color);
    setThemeColor(color);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          Theme
          {open ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
  );
}
