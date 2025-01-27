import { ArticleLayout } from "@/components/ui/article-layout";
import { getMarkdownContent } from "@/lib/markdown";

export default async function AboutPage() {
    const content = await getMarkdownContent("about.md");
    return <ArticleLayout content={content} />;
} 