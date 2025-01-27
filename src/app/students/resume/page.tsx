import { ArticleLayout } from "@/components/ui/article-layout";
import { getMarkdownContent } from "@/lib/markdown";

export default async function ResumeTipsPage() {
    const content = await getMarkdownContent("students/resume.md");
    return <ArticleLayout content={content} />;
} 