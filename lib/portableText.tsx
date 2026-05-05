import { PortableText } from '@portabletext/react'
import { urlFor } from './sanity'
import Image from 'next/image'

const components = {
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-black text-[#F8F8FF] font-syne mt-12 mb-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-black text-[#F8F8FF] font-syne mt-10 mb-5 border-bottom border-[#6C63FF]/10 pb-2">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold text-[#F8F8FF] font-syne mt-8 mb-4">{children}</h3>,
    normal: ({ children }: any) => <p className="text-[#94A3B8] leading-relaxed mb-6 text-lg">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#6C63FF] bg-[#6C63FF]/5 px-8 py-6 my-10 italic text-[#A78BFA] text-xl rounded-r-2xl">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="text-[#F8F8FF] font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-[#A78BFA]">{children}</em>,
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-[#6C63FF] underline hover:text-[#8B83FF] transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-12">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#6C63FF]/20">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || 'Blog Image'}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="text-center text-[#94A3B8] text-sm mt-4 font-medium italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
}

export function BlogContent({ value }: { value: any[] }) {
  if (!value) return null
  return (
    <div className="prose-growthx">
      <PortableText value={value} components={components} />
    </div>
  )
}
