import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Tag, Zap, Phone } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "GhostWorkersCompInsurance.com",
      url: "https://ghostworkerscompinsurance.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <header className="hero-gradient py-14">
          <div className="container-wide max-w-4xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium mb-6" style={{ color: "#16a34a" }}>
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#dcfce7", color: "#15803d" }}>
                <Tag size={10} />
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-sm" style={{ color: "#6b7280" }}>
                <Calendar size={12} />
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1 text-sm" style={{ color: "#6b7280" }}>
                <Clock size={12} />
                {post.readingTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: "#111827", lineHeight: 1.2 }}>
              {post.title}
            </h1>
            <p className="text-lg" style={{ color: "#374151" }}>{post.description}</p>
            <div className="mt-4 text-sm" style={{ color: "#6b7280" }}>By {post.author}</div>
          </div>
        </header>

        <div className="container-wide max-w-4xl py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Article body */}
            <article className="lg:col-span-2 prose prose-lg max-w-none"
              style={{
                "--tw-prose-headings": "#111827",
                "--tw-prose-body": "#374151",
                "--tw-prose-links": "#16a34a",
              } as React.CSSProperties}
            >
              <MDXRemote source={post.content} />
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 flex flex-col gap-6">
                {/* CTA */}
                <div className="rounded-2xl p-6 border" style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)", borderColor: "#bbf7d0" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={16} style={{ color: "#16a34a" }} />
                    <span className="font-bold text-sm" style={{ color: "#111827" }}>Get Covered Today</span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "#374151" }}>
                    Get your ghost WC quote in 90 seconds. Same-day certificates available.
                  </p>
                  <Link href="/quote" className="btn-primary w-full justify-center text-sm mb-3">
                    Free Quote
                  </Link>
                  <a href="tel:8449675247" className="flex items-center justify-center gap-1 text-sm font-semibold" style={{ color: "#16a34a" }}>
                    <Phone size={13} /> 844-967-5247
                  </a>
                </div>

                {/* Related coverage */}
                <div className="rounded-2xl p-6 border bg-white" style={{ borderColor: "#d1fae5" }}>
                  <h3 className="font-bold mb-4 text-sm" style={{ color: "#111827" }}>Coverage Options</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { href: "/services/ghost-wc-policy", label: "Ghost WC Policy" },
                      { href: "/services/same-day-coverage", label: "Same-Day Coverage" },
                      { href: "/services/employer-audit-defense", label: "Audit Defense" },
                      { href: "/services/instant-certificates", label: "Instant Certificates" },
                    ].map((link) => (
                      <Link key={link.href} href={link.href} className="text-sm font-medium hover:underline" style={{ color: "#16a34a" }}>
                        → {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="py-14" style={{ background: "#f0fdf4" }}>
          <div className="container-wide text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#111827" }}>
              Ready for Instant Ghost WC Coverage?
            </h2>
            <p className="mb-6" style={{ color: "#374151" }}>Quote in 90 seconds. Certificate today.</p>
            <Link href="/quote" className="btn-primary">
              <Zap size={18} /> Get My Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
