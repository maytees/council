import { ArticleLayout } from "@/components/ui/article-layout";
import { getMarkdownContent } from "@/lib/markdown";

export default async function CookiePolicyPage() {
    const content = await getMarkdownContent("legal/cookies.md");
    return <ArticleLayout content={content} />;
} 