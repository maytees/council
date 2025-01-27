import { ArticleLayout } from "@/components/ui/article-layout";
import { getMarkdownContent } from "@/lib/markdown";

export default async function PrivacyPolicyPage() {
    const content = await getMarkdownContent("legal/privacy.md");
    return <ArticleLayout content={content} />;
} 