import { ArticleLayout } from "@/components/ui/article-layout";
import { getMarkdownContent } from "@/lib/markdown";

export default async function TermsOfServicePage() {
    const content = await getMarkdownContent("legal/terms.md");
    return <ArticleLayout content={content} />;
} 