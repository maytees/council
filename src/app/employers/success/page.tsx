import { ArticleLayout } from "@/components/ui/article-layout";
import { getMarkdownContent } from "@/lib/markdown";

export default async function SuccessStoriesPage() {
    const content = await getMarkdownContent("employers/success.md");
    return <ArticleLayout content={content} />;
} 