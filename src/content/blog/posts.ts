import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { getFrontmatter } from "next-mdx-remote-client/utils";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog/posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  keywords: string[];
  readingMinutes: number;
  cluster?: string;
}

type Frontmatter = Omit<PostMeta, "slug">;

/** All posts' metadata (frontmatter only), newest-first. Memoized per render pass. */
export const getAllPostsMeta = cache(async (): Promise<PostMeta[]> => {
  const entries = await fs.readdir(POSTS_DIR);
  const files = entries.filter((f) => f.endsWith(".mdx"));
  const metas = await Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
      const { frontmatter } = getFrontmatter<Frontmatter>(source);
      return { slug: file.replace(/\.mdx$/, ""), ...frontmatter };
    }),
  );
  return metas.sort((a, b) => (a.date < b.date ? 1 : -1));
});

/** Raw MDX source for one slug, or null if it does not exist. */
export async function getPostSource(slug: string): Promise<string | null> {
  try {
    return await fs.readFile(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
  } catch {
    return null;
  }
}
