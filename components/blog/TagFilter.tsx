'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

interface TagFilterProps {
  tags: string[]
  activeTag: string
}

export default function TagFilter({ tags, activeTag }: TagFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (tag === 'All') {
      params.delete('tag')
    } else {
      params.set('tag', tag)
    }
    router.replace(`/blog?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide px-4 md:px-0 justify-center">
      {tags.map((tag) => (
        <motion.button
          key={tag}
          onClick={() => handleTagClick(tag)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
            activeTag === tag
              ? 'bg-[#6C63FF] text-white border-[#6C63FF] shadow-[0_10px_20px_rgba(108,99,255,0.3)]'
              : 'bg-[#0E0E1A] text-[#94A3B8] border-[#6C63FF]/20 hover:border-[#6C63FF]/45 hover:text-[#F8F8FF]'
          }`}
        >
          {tag}
        </motion.button>
      ))}
    </div>
  )
}
