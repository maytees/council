"use client";

import { MarkdownContent } from "./markdown-content";

interface ArticleLayoutProps {
    content: string;
}

export function ArticleLayout({ content }: ArticleLayoutProps) {
    return (
        <main className="min-h-screen bg-background/95 py-12 px-4 sm:px-6 lg:px-8">
            <div className="relative">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 pointer-events-none" />

                {/* Content */}
                <div className="relative">
                    <MarkdownContent
                        content={content}
                        className="backdrop-blur-sm"
                    />
                </div>
            </div>
        </main>
    );
} 