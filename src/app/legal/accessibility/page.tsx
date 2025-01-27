import { ArticleLayout } from "@/components/ui/article-layout";
import { getMarkdownContent } from "@/lib/markdown";

export default async function AccessibilityPage() {
    const content = await getMarkdownContent("legal/accessibility.md");
    return <ArticleLayout content={content} />;
} 