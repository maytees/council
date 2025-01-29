import { ArticleLayout } from "@/components/ui/article-layout";
import { getMarkdownContent } from "@/lib/markdown";

export default async function TrademarksPage() {
    const content = await getMarkdownContent("legal/trademarks.md");
    return <ArticleLayout content={content} />;
} 