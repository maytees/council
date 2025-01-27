import { ArticleLayout } from "@/components/ui/article-layout";
import { getMarkdownContent } from "@/lib/markdown";

export default async function ResourcesPage() {
    const content = await getMarkdownContent("students/resources.md");
    return <ArticleLayout content={content} />;
} 