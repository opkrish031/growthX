import { getAllPosts, getFeaturedPost, searchPosts, getPostsByTag, SanityPost } from "@/lib/sanity";
import BlogCard from "@/components/blog/BlogCard";
import SearchBar from "@/components/blog/SearchBar";
import TagFilter from "@/components/blog/TagFilter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";

export const metadata = {
  title: 'Blog — GrowthX Media | Digital Marketing Insights',
  description: 'Expert tips on social media, SEO, paid ads, and growing your brand in India.',
}

const STATIC_TAGS = ['All','Social Media','SEO','Paid Ads','Reels','E-commerce','Growth Tips','Case Study'];

interface BlogPageProps {
  searchParams: Promise<{ q?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const activeTag = resolvedParams.tag || "All";

  let posts: SanityPost[] = [];
  let featuredPost: SanityPost | null = null;

  // Data Fetching Logic
  if (query) {
    posts = await searchPosts(query);
  } else if (activeTag !== "All") {
    posts = await getPostsByTag(activeTag);
  } else {
    posts = await getAllPosts();
    featuredPost = await getFeaturedPost();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080810] pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative pt-16 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(108,99,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#8B83FF] text-sm font-bold mb-6 animate-fade-in">
              <span>📝</span> INSIGHTS & STRATEGIES
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-[#F8F8FF] mb-6 font-syne leading-tight">
              The Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#22D3EE]">Blog</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-[#94A3B8] text-lg md:text-xl mb-12">
              Expert insights on social media, SEO, and scaling your brand in India.
            </p>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="container mx-auto px-4 mb-16 relative z-20">
          <div className="space-y-8">
            <SearchBar />
            <TagFilter tags={STATIC_TAGS} activeTag={activeTag} />
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && !query && activeTag === "All" && (
          <section className="container mx-auto px-4 mb-16">
            <Link href={`/blog/${featuredPost.slug.current}`} className="group block">
              <div className="relative aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden border border-[#6C63FF]/20 group-hover:border-[#6C63FF]/50 transition-all duration-500 shadow-2xl">
                {featuredPost.coverImage ? (
                  <Image
                    src={urlFor(featuredPost.coverImage).width(1600).url()}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#6C63FF]/20 to-[#A78BFA]/20 flex items-center justify-center">
                    <span className="font-black text-8xl text-[#6C63FF]/20">GX</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-[#080810]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                  <div className="bg-[#6C63FF] text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">FEATURED</div>
                  <h2 className="text-2xl md:text-4xl font-black text-[#F8F8FF] font-syne mb-4 max-w-2xl group-hover:text-[#8B83FF] transition-colors">{featuredPost.title}</h2>
                  <p className="text-[#94A3B8] text-sm md:text-base max-w-xl line-clamp-2 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-6 text-[#94A3B8] text-xs font-medium">
                    <span>{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Posts Grid */}
        <section className="container mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.filter(p => p._id !== featuredPost?._id).map((post, index) => (
                <BlogCard key={post._id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-[#0E0E1A] rounded-3xl border border-[#6C63FF]/10">
              <div className="text-6xl mb-6">😟</div>
              <h3 className="text-2xl font-bold text-[#F8F8FF] mb-2 font-syne">No articles found</h3>
              <p className="text-[#94A3B8] mb-8">Try a different search or check back soon.</p>
              <Link href="/blog" className="inline-flex items-center gap-2 bg-[#6C63FF] text-white px-8 py-3 rounded-xl font-bold transition-all hover:bg-[#5A52E5]">Clear Filters</Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
