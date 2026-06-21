import Link from "next/link";
import { Clock, Calendar, Tag, ArrowRight, Zap } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Ghost Workers Comp Resources",
  description:
    "Guides, tips, and expert advice on ghost workers compensation policies, contractor licensing, and coverage requirements.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="hero-gradient py-16 text-center">
          <div className="container-wide">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "#dcfce7", color: "#15803d" }}>
              <Zap size={14} />
              Resources & Guides
            </div>
            <h1 className="section-title mb-4">Ghost WC Insurance Blog</h1>
            <p className="section-subtitle mx-auto" style={{ color: "#374151" }}>
              Expert guides on ghost workers comp policies, contractor licensing requirements, and coverage tips.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p style={{ color: "#6b7280" }}>No posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block bg-white rounded-2xl border overflow-hidden card-hover"
                    style={{ borderColor: "#d1fae5" }}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "#dcfce7", color: "#15803d" }}>
                          <Tag size={10} />
                          {post.category}
                        </span>
                      </div>
                      <h2 className="font-bold text-lg mb-3 leading-snug" style={{ color: "#111827" }}>
                        {post.title}
                      </h2>
                      <p className="text-sm mb-4 line-clamp-3" style={{ color: "#6b7280" }}>
                        {post.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs" style={{ color: "#9ca3af" }}>
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {post.readingTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-4 text-sm font-semibold" style={{ color: "#16a34a" }}>
                        Read article <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16" style={{ background: "#f0fdf4" }}>
          <div className="container-wide text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#111827" }}>Ready to Get Covered?</h2>
            <p className="mb-6" style={{ color: "#374151" }}>
              Get your ghost workers comp quote in under 90 seconds.
            </p>
            <Link href="/quote" className="btn-primary">
              <Zap size={18} /> Start Free Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
