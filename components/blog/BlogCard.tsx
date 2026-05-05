'use client'

import { SanityPost, urlFor } from "@/lib/sanity";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import Image from "next/image";

interface BlogCardProps {
  post: SanityPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/blog/${post.slug.current}`} className="block h-full">
        <div className="bg-[#0E0E1A] border border-[#6C63FF]/15 rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col hover:border-[#6C63FF]/45 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(108,99,255,0.15)] cursor-pointer group">
          {/* Cover Image */}
          <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-[#6C63FF]/20 to-[#A78BFA]/20 flex items-center justify-center">
            {post.coverImage ? (
              <Image
                src={urlFor(post.coverImage).width(600).url()}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <span className="font-black text-4xl text-[#6C63FF]/30 select-none">GX</span>
            )}
            {post.featured && (
              <div className="absolute top-3 left-3 bg-[#6C63FF] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider z-10">
                Featured
              </div>
            )}
          </div>

          {/* Card Body */}
          <div className="p-5 flex flex-col flex-1">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-[#6C63FF]/10 text-[#8B83FF] text-[10px] uppercase tracking-wider font-semibold rounded-full px-2.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-[#F8F8FF] font-bold text-lg leading-snug mb-2 group-hover:text-[#8B83FF] transition-colors line-clamp-2 font-syne">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-[#94A3B8] text-sm leading-relaxed line-clamp-3 flex-1">
              {post.excerpt}
            </p>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-[#6C63FF]/10 flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-[#94A3B8] text-[10px]">
                <Calendar className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#94A3B8] text-[10px]">
                <Clock className="w-3 h-3 text-[#22D3EE]" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
