import { ArticleLayout } from "@/components/ui/article-layout";
import { getMarkdownContent } from "@/lib/markdown";

export default async function GuidelinesPage() {
    const content = await getMarkdownContent("employers/guidelines.md");
    return <ArticleLayout content={content} />;
} 