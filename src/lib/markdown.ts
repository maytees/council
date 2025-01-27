import fs from "fs";
import path from "path";

export async function getMarkdownContent(articlePath: string): Promise<string> {
    const fullPath = path.join(process.cwd(), "src/content/articles", articlePath);
    const fileContents = await fs.promises.readFile(fullPath, "utf8");
    return fileContents;
} 