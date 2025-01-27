"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <article className="max-w-4xl mx-auto">
      <div className={cn(
        "prose dark:prose-invert max-w-none",
        "bg-card p-8 rounded-lg shadow-md border border-border",
        "prose-headings:border-b prose-headings:border-border prose-headings:pb-2 prose-headings:mb-4",
        "prose-h1:text-4xl prose-h1:font-bold prose-h1:text-primary prose-h1:border-none",
        "prose-h2:text-2xl prose-h2:font-semibold prose-h2:text-foreground/90 prose-h2:mt-8",
        "prose-h3:text-xl prose-h3:font-medium prose-h3:text-foreground/80",
        "prose-p:text-foreground/70 prose-p:leading-7",
        "prose-li:text-foreground/70",
        "prose-strong:text-foreground/90 prose-strong:font-semibold",
        "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-accent/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg",
        "prose-blockquote:not-italic prose-blockquote:text-foreground/75",
        "prose-ul:list-disc prose-ul:pl-6",
        "prose-ol:list-decimal prose-ol:pl-6",
        className
      )}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </article>
  );
} 