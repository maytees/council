import { ArticleLayout } from "@/components/ui/article-layout";
import { getMarkdownContent } from "@/lib/markdown";

export default async function ManageGuidePage() {
    const content = await getMarkdownContent("employers/manage.md");
    return <ArticleLayout content={content} />;
} 