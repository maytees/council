import { ArticleLayout } from "@/components/ui/article-layout";
import { getMarkdownContent } from "@/lib/markdown";

export default async function InterviewPrepPage() {
    const content = await getMarkdownContent("students/interview.md");
    return <ArticleLayout content={content} />;
} 