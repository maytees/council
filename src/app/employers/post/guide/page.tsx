import { ArticleLayout } from "@/components/ui/article-layout";
import { getMarkdownContent } from "@/lib/markdown";

export default async function PostGuidePage() {
    const content = await getMarkdownContent("employers/post.md");
    return <ArticleLayout content={content} />;
} 