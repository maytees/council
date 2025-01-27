import { ArticleLayout } from "@/components/ui/article-layout";
import { getMarkdownContent } from "@/lib/markdown";

export default async function HowToApplyPage() {
    const content = await getMarkdownContent("students/apply.md");
    return <ArticleLayout content={content} />;
} 