'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('q') || '')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set('q', value)
      } else {
        params.delete('q')
      }
      router.replace(`/blog?${params.toString()}`)
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [value, router, searchParams])

  const handleClear = () => {
    setValue('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')
    router.replace(`/blog?${params.toString()}`)
  }

  return (
    <div className="relative flex items-center w-full max-w-2xl mx-auto">
      <Search className="absolute left-4 text-[#94A3B8] w-4 h-4" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search articles..."
        className="w-full bg-[#0E0E1A] border border-[#6C63FF]/20 rounded-xl px-12 py-3.5 text-[#F8F8FF] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all duration-300"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-4 text-[#94A3B8] hover:text-[#F8F8FF] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
