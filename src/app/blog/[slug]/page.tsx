import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SocialIcons from "@/components/layout/SocialIcons";
import JsonLd from "@/components/seo/JsonLd";
import { posts } from "@/content/blog/posts";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Post Not Found", robots: { index: false, follow: false } };
  }
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@id": `${SITE_URL}/#person`, name: SITE_NAME },
    publisher: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
    inLanguage: "en",
  };

  return (
    <main className="min-h-screen">
      <JsonLd data={articleLd} />
      <Navbar />
      <SocialIcons />
      <article className="pt-28 pb-20 px-8 md:px-16 max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="font-mono text-xs text-gray-500 hover:text-white transition-colors duration-300"
        >
          &larr; All posts
        </Link>

        <p className="font-mono text-xs text-gray-500 mt-8 mb-3">
          {formatDate(post.date)} &middot; {post.readingMinutes} min read
        </p>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-8">
          {post.title}
        </h1>

        <div className="[&>p]:text-gray-300 [&>p]:leading-[1.8] [&>p]:mb-6 [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2 [&>ul>li]:text-gray-300 [&>ul>li]:leading-[1.7] [&_strong]:text-white [&_em]:text-gray-200">
          {post.body}
        </div>

        <div className="mt-14 pt-8 border-t border-border-subtle">
          <p className="text-gray-400 text-sm mb-5">
            Working on something like this? Let&apos;s talk.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black font-mono text-sm tracking-wider rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            Start a project
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </article>
    </main>
  );
}
