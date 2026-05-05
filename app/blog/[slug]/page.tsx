import { getPostBySlug, getAllPosts, getRelatedPosts, urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, MessageCircle, Globe, Share } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogContent } from "@/lib/portableText";
import Image from "next/image";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} — GrowthX Media Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [urlFor(post.coverImage).width(1200).url()] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug.current, post.tags || []);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(post.publishedAt));

  const shareUrl = `https://growthxmedia.vercel.app/blog/${post.slug.current}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080810] pt-32 pb-20 overflow-x-hidden">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#6C63FF] transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Blog</span>
          </Link>

          {/* Post Header */}
          <header className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {post.tags?.map((tag) => (
                <span 
                  key={tag}
                  className="bg-[#6C63FF]/10 text-[#8B83FF] rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-[#F8F8FF] mb-8 font-syne leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-6 text-[#94A3B8] text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#6C63FF]" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#22D3EE]" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6C63FF]/20 to-transparent mt-8" />
          </header>

          {/* Cover Image */}
          <div className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden border border-[#6C63FF]/20 shadow-2xl relative aspect-video">
            {post.coverImage ? (
              <Image 
                src={urlFor(post.coverImage).width(1200).url()} 
                alt={post.title} 
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#6C63FF]/20 to-[#A78BFA]/20 flex items-center justify-center">
                <span className="font-black text-8xl text-[#6C63FF]/20">GX</span>
              </div>
            )}
          </div>

          {/* Content */}
          <article className="max-w-3xl mx-auto">
            <BlogContent value={post.body || []} />
            
            {/* Share Section */}
            <div className="mt-16 pt-8 border-t border-[#6C63FF]/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <span className="text-[#94A3B8] text-sm font-medium">Share this article:</span>
              <div className="flex gap-4">
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#25D366]/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/5 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition-all"
                >
                  <Globe className="w-4 h-4" /> Twitter
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#0077B5]/20 transition-all"
                >
                  <Share className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>

            {/* CTA Card */}
            <div className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#6C63FF]/20 to-[#A78BFA]/5 border border-[#6C63FF]/30 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C63FF]/10 blur-3xl -mr-32 -mt-32 transition-transform duration-500 group-hover:scale-110" />
              
              <h3 className="text-2xl md:text-3xl font-black text-[#F8F8FF] mb-4 font-syne relative z-10">
                Want results like these for your brand?
              </h3>
              <p className="text-[#94A3B8] mb-8 max-w-xl mx-auto relative z-10">
                GrowthX Media helps Indian businesses grow on social media, Google, and beyond with data-driven strategies.
              </p>
              <Link 
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#6C63FF] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:bg-[#5A52E5] hover:shadow-[0_10px_30px_rgba(108,99,255,0.4)] relative z-10"
              >
                Get a Free Audit →
              </Link>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-32">
              <h2 className="text-3xl md:text-4xl font-black text-[#F8F8FF] font-syne mb-12">More Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((p, i) => (
                  <BlogCard key={p._id} post={p} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
