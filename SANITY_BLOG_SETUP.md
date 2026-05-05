# SANITY_BLOG_SETUP.md — GrowthX Media Blog System
### Sanity CMS + Next.js 14 | Zero Backend | Client-Editable | Free Forever
> Paste SESSION STARTER from GROWTHX_MASTER.md first, then this file into Gemini CLI

---

## WHY SANITY (not Hashnode, not Notion)

```
Hashnode  → Community guidelines, account verification headache
Notion    → Unofficial API, breaks randomly, not made for this
Sanity    → Made exactly for this. Free. Clean editor. Never breaks.
```

Client ka experience:
→ Opens Sanity Studio (a website, no app download)
→ Sees a clean editor — type karo, image daalo, publish karo
→ Website pe 60 seconds mein live
→ Done. No developer needed ever again.

---

## PHASE 1 — SANITY SETUP (One Time, You Do This)

### Step 1: Sanity Account
```bash
# Install Sanity CLI
npm install -g sanity@latest

# Login
sanity login
# Opens browser → sign in with Google
```

### Step 2: Create Sanity Project Inside Your Next.js Folder
```bash
# Inside your growthx-media folder
cd growthx-media
npm create sanity@latest -- --project growthx-blog --dataset production --template clean

# It will ask:
# Project name: growthx-blog
# Dataset: production
# Add files to current folder? YES
# Package manager: npm
```

### Step 3: Get Your Project Credentials
```bash
# After creation, it shows your Project ID
# Also go to: sanity.io/manage → your project → API → Project ID

# Copy these two things:
# Project ID:  xxxxxxxx  (8 character code)
# Dataset:     production
```

### Step 4: Create API Token (for fetching data)
```
1. sanity.io/manage → your project
2. API → Tokens → Add API Token
3. Name: "Next.js Read Token"
4. Permissions: Viewer
5. Save token — copy it NOW (shown only once)
```

### Step 5: Add to .env.local
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_viewer_token
```

### Step 6: Install Sanity Client in Next.js
```bash
npm install next-sanity @sanity/image-url
```

---

## PHASE 2 — GIVE THIS PROMPT TO GEMINI CLI

```
Add a complete blog system to the existing GrowthX Media Next.js 14 site.
Use Sanity CMS as the content source — no Hashnode, no Notion.
Client writes posts in Sanity Studio, website auto-fetches and displays them.

TECH ALREADY IN PROJECT:
- Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion
- next-sanity and @sanity/image-url are already installed

ENVIRONMENT VARIABLES (already in .env.local):
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET  
- SANITY_API_TOKEN

BRAND COLORS (keep consistent with main site):
Background: #080810, Card: #0E0E1A, Blue: #6C63FF,
Violet: #A78BFA, Cyan: #22D3EE, White: #F8F8FF, Gray: #94A3B8

BUILD THESE FILES IN ORDER:

━━━ FILE 1: sanity/schemaTypes/post.ts ━━━
Blog post schema for Sanity Studio.

export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'excerpt',
      title: 'Short Description',
      description: 'Shown on the blog listing page (max 200 characters)',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(200)
    },
    {
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' }
          ]
        }
      ]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Social Media', value: 'Social Media' },
          { title: 'SEO', value: 'SEO' },
          { title: 'Paid Ads', value: 'Paid Ads' },
          { title: 'Reels', value: 'Reels' },
          { title: 'E-commerce', value: 'E-commerce' },
          { title: 'Growth Tips', value: 'Growth Tips' },
          { title: 'Case Study', value: 'Case Study' },
          { title: 'Google Ads', value: 'Google Ads' },
        ]
      }
    },
    {
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number'
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'featured',
      title: 'Featured Post?',
      description: 'Show this post at the top of the blog',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'publishedAt'
    }
  },
  orderings: [
    {
      title: 'Published Date, Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    }
  ]
}

━━━ FILE 2: sanity/schemaTypes/index.ts ━━━
import post from './post'
export const schemaTypes = [post]

━━━ FILE 3: sanity.config.ts ━━━
(in project root, for Sanity Studio)

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'growthx-studio',
  title: 'GrowthX Media Blog',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})

━━━ FILE 4: app/studio/[[...tool]]/page.tsx ━━━
Embeds Sanity Studio at /studio route.

'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}

Also create app/studio/[[...tool]]/loading.tsx:
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#080810]">
      <div className="text-[#6C63FF] font-bold text-xl">Loading Studio...</div>
    </div>
  )
}

━━━ FILE 5: lib/sanity.ts ━━━
Sanity client setup + all query functions + TypeScript types.

import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}

TypeScript interfaces to export:
export interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  coverImage?: any
  excerpt?: string
  body?: any[]
  tags?: string[]
  readTime?: number
  publishedAt: string
  featured?: boolean
}

GROQ Query functions (all use next: { revalidate: 60 }):

1. getAllPosts(): Promise<SanityPost[]>
GROQ: *[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, coverImage, excerpt, tags, readTime, publishedAt, featured
}

2. getFeaturedPost(): Promise<SanityPost | null>
GROQ: *[_type == "post" && featured == true] | order(publishedAt desc)[0] {
  _id, title, slug, coverImage, excerpt, tags, readTime, publishedAt
}

3. getPostBySlug(slug: string): Promise<SanityPost | null>
GROQ: *[_type == "post" && slug.current == $slug][0] {
  _id, title, slug, coverImage, excerpt, body, tags, readTime, publishedAt, featured
}

4. getPostsByTag(tag: string): Promise<SanityPost[]>
GROQ: *[_type == "post" && $tag in tags] | order(publishedAt desc) {
  _id, title, slug, coverImage, excerpt, tags, readTime, publishedAt
}

5. getRelatedPosts(slug: string, tags: string[]): Promise<SanityPost[]>
GROQ: *[_type == "post" && slug.current != $slug && count(tags[@ in $tags]) > 0] 
| order(publishedAt desc)[0...3] {
  _id, title, slug, coverImage, excerpt, tags, readTime, publishedAt
}

6. searchPosts(query: string): Promise<SanityPost[]>
GROQ: *[_type == "post" && (title match $query || excerpt match $query)] 
| order(publishedAt desc) {
  _id, title, slug, coverImage, excerpt, tags, readTime, publishedAt
}

━━━ FILE 6: lib/portableText.tsx ━━━
Custom renderer for Sanity's Portable Text (rich text body).

import { PortableText } from '@portabletext/react'
Install first: npm install @portabletext/react

Custom components:
- block.h1, h2, h3: Syne font, white, proper sizes
- block.normal: text-[#94A3B8] leading-relaxed
- block.blockquote: blue left border, bg-[#6C63FF]/05, italic
- marks.strong: text-[#F8F8FF] font-bold
- marks.em: italic text-[#A78BFA]
- marks.link: text-[#6C63FF] underline hover:text-[#8B83FF]
- types.image: full width, rounded-2xl, border border-[#6C63FF]/20
  Use urlFor() from lib/sanity to get image URL
  Show caption below if exists: text-[#94A3B8] text-sm text-center mt-2

Export a BlogContent component:
export function BlogContent({ value }: { value: any[] }) {
  return (
    <div className="prose-growthx">
      <PortableText value={value} components={components} />
    </div>
  )
}

━━━ FILE 7: app/blog/page.tsx ━━━
Server component — Blog listing page.

Fetch getAllPosts() and getFeaturedPost() on server.
Parse searchParams for q (search) and tag filter.

METADATA:
title: 'Blog — GrowthX Media | Digital Marketing Insights'
description: 'Expert tips on social media, SEO, paid ads, and growing your brand in India.'

PAGE STRUCTURE:

HERO (same style as main site):
- bg-grid overlay + glow blobs
- Badge: "📝 INSIGHTS & STRATEGIES"
- Title: "The Growth" (white) + " Blog" (.text-gradient) — Syne font-black text-6xl md:text-8xl
- Sub: "Expert insights on social media, SEO, and scaling your brand in India."
- Entry animation: fade + slide up

SEARCH BAR (client component SearchBar):
- max-w-2xl mx-auto mt-8
- bg-[#0E0E1A] border border-[#6C63FF]/20 rounded-xl
- Search icon left, input, clear X right
- On type: updates ?q= param in URL (debounced 400ms)

TAG FILTER (client component TagFilter):
- Tags: All, Social Media, SEO, Paid Ads, Reels, E-commerce, Growth Tips, Case Study
- Horizontal scroll, pill buttons
- Active: bg-[#6C63FF] text-white
- Updates ?tag= param in URL

FEATURED POST (if exists and no search/tag filter active):
- Large hero card, full width
- Cover image: aspect-video, rounded-2xl
- "FEATURED" badge top-left
- Title: text-3xl Syne font-black
- Excerpt, read time, date
- "Read Article →" CTA

POSTS GRID:
- grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8
- BlogCard component for each post
- If posts empty: empty state
  "No articles found" + sad emoji
  "Try a different search or check back soon"
  Button: "Clear Filters" resets to /blog

━━━ FILE 8: app/blog/[slug]/page.tsx ━━━
Server component — Individual post page.

generateStaticParams: fetch all post slugs for static generation
generateMetadata: use post.title + post.excerpt for meta tags

If post not found: notFound()

PAGE LAYOUT (max-w-3xl mx-auto px-4):

BACK LINK:
← Back to Blog | href="/blog"
text-[#94A3B8] hover:text-[#6C63FF] flex items-center gap-2 mt-8 mb-12

POST HEADER:
- Tags row: colored pills (bg-[#6C63FF]/10 text-[#8B83FF] text-xs rounded-full)
- Title: Syne font-black text-4xl md:text-6xl text-[#F8F8FF] mt-4 leading-tight
- Meta: flex gap-6 text-[#94A3B8] text-sm mt-4 items-center
  - Calendar icon + formatted date (e.g. "May 5, 2026")
  - Clock icon + readTime + " min read"
- Divider: border-t border-[#6C63FF]/20 mt-6

COVER IMAGE:
If coverImage exists:
  <img> from urlFor(post.coverImage).width(1200).url()
  className: w-full aspect-video object-cover rounded-2xl border border-[#6C63FF]/20 my-8
If no cover:
  Gradient placeholder: bg-gradient-to-br from-[#6C63FF]/20 to-[#A78BFA]/20
  aspect-video rounded-2xl flex items-center justify-center
  Large "GX" text in Syne font-black text-8xl text-[#6C63FF]/20

POST CONTENT:
<BlogContent value={post.body} /> from lib/portableText.tsx

SHARE SECTION (mt-16 pt-8 border-t border-[#6C63FF]/20):
"Share this article" text-[#94A3B8] text-sm mb-4
Three share buttons:
- WhatsApp: bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366]
  href: https://wa.me/?text={encoded title + URL}
- Twitter/X: bg-white/5 border border-white/20 text-white
  href: https://twitter.com/intent/tweet?text={title}&url={URL}
- LinkedIn: bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5]
  href: https://linkedin.com/sharing/share-offsite/?url={URL}
Each: rounded-xl px-4 py-2 text-sm flex items-center gap-2 hover:opacity-80

CTA CARD (mt-12):
bg-gradient-to-r from-[#6C63FF]/15 to-[#A78BFA]/10
border border-[#6C63FF]/30 rounded-2xl p-8 text-center
Title: "Want results like these for your brand?" Syne font-black text-2xl
Sub: "GrowthX Media helps Indian businesses grow on social, Google, and beyond."
Button: "Get a Free Audit →" bg-[#6C63FF] text-white px-8 py-4 rounded-xl
href="/#contact"

RELATED POSTS (if exists, mt-16):
"More Insights" heading
Fetch getRelatedPosts using post.tags
grid-cols-1 md:grid-cols-3 gap-6
BlogCard for each

━━━ FILE 9: components/blog/BlogCard.tsx ━━━
'use client'
Props: { post: SanityPost, index?: number }

Import urlFor from lib/sanity

motion.div:
initial={{ opacity:0, y:40 }}
whileInView={{ opacity:1, y:0 }}
viewport={{ once:true }}
transition={{ duration:0.6, delay:(index||0)*0.08, ease:[0.22,1,0.36,1] }}

Link: href={/blog/${post.slug.current}} — wraps entire card

Card: bg-[#0E0E1A] border border-[#6C63FF]/15 rounded-2xl overflow-hidden
h-full flex flex-col cursor-pointer group
hover: border-[#6C63FF]/45 -translate-y-2 duration-300
shadow on hover: 0 20px 60px rgba(108,99,255,0.15)

COVER IMAGE AREA (aspect-video):
If post.coverImage:
  <img src={urlFor(post.coverImage).width(600).url()} object-cover w-full h-full
  group-hover: scale-105 transition-transform duration-500
Else:
  bg-gradient-to-br from-[#6C63FF]/20 to-[#A78BFA]/20
  centered "GX" Syne font-black text-4xl text-[#6C63FF]/30

If post.featured: show "FEATURED" badge absolute top-3 left-3
bg-[#6C63FF] text-white text-xs px-2 py-1 rounded-full font-semibold

CARD BODY (p-5 flex flex-col flex-1):

Tags row: first 2 tags
bg-[#6C63FF]/10 text-[#8B83FF] text-xs rounded-full px-2.5 py-0.5 mt-3

Title: text-[#F8F8FF] font-bold text-lg Syne leading-snug mt-2 mb-2
line-clamp-2 group-hover:text-[#8B83FF] transition-colors

Excerpt: text-[#94A3B8] text-sm leading-relaxed line-clamp-3 flex-1

FOOTER (mt-auto pt-4 border-t border-[#6C63FF]/10 flex justify-between items-center):
Left: Calendar icon + formatted date (text-[#94A3B8] text-xs)
Right: Clock icon + readTime + " min" (text-[#94A3B8] text-xs)

━━━ FILE 10: components/blog/BlogCardSkeleton.tsx ━━━
Loading skeleton mimicking BlogCard.
All divs: bg-[#6C63FF]/5 rounded animate-pulse
- aspect-video div (cover image skeleton)
- Two small pills (tag skeletons) mt-3
- Two lines for title (h-4 and h-4, different widths)
- Three lines for excerpt (h-3)
- Footer with circle + line

━━━ FILE 11: components/blog/SearchBar.tsx ━━━
'use client'
import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'

Debounce 400ms using setTimeout/clearTimeout in useCallback.
On change: router.push(/blog?q=${value}) — replace not push to avoid history spam.
On clear: router.push('/blog').

Input: bg-[#0E0E1A] border border-[#6C63FF]/20 rounded-xl px-4 py-3 pl-11 text-[#F8F8FF]
focus: border-[#6C63FF] ring-2 ring-[#6C63FF]/20 outline-none
Search icon: absolute left-4 text-[#94A3B8] w-4 h-4
X icon: absolute right-4 text-[#94A3B8] w-4 h-4 cursor-pointer — show only when value exists

━━━ FILE 12: components/blog/TagFilter.tsx ━━━
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

const TAGS = ['All','Social Media','SEO','Paid Ads','Reels','E-commerce','Growth Tips','Case Study']

On click: router.push(tag === 'All' ? '/blog' : /blog?tag=${tag})
Active: tag matches searchParams.get('tag') or tag === 'All' when no param

Container: flex gap-2 overflow-x-auto pb-2 scrollbar-hide mt-6
Each pill: motion.button whileHover scale:1.03 whileTap scale:0.97
Active: bg-[#6C63FF] text-white border-[#6C63FF]
Inactive: bg-[#0E0E1A] text-[#94A3B8] border-[rgba(108,99,255,0.2)] hover:border-[#6C63FF]/45

━━━ FILE 13: app/blog/loading.tsx ━━━
Hero skeleton + grid of 6 BlogCardSkeleton components.
Shows automatically while page fetches data from Sanity.

Hero skeleton:
- Small pill skeleton (badge)
- Two large line skeletons (title)
- Two medium line skeletons (subtitle)
All: bg-[#6C63FF]/5 rounded animate-pulse

Then: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12
6x BlogCardSkeleton

━━━ FILE 14: components/Navbar.tsx (update only) ━━━
Add "Blog" link to existing navbar.
Desktop nav: add between "Pricing" and "Contact" — href="/blog"
Mobile overlay menu: add "Blog" to the links list — href="/blog"
DO NOT rewrite the whole file. Only add the Blog link in both places.

━━━ FILE 15: app/page.tsx (update only) ━━━
Add a "Latest from the Blog" section between WhyUs and Pricing.
Import getAllPosts from lib/sanity.
Fetch 3 latest posts: const posts = await getAllPosts() then slice(0, 3).

SECTION:
- Label: "FROM THE BLOG"
- Title: "Latest Insights" (.text-gradient on "Insights")
- Sub: "Expert tips on growing your brand in India."
- grid-cols-1 md:grid-cols-3 gap-6 mt-10
- BlogCard for each post
- "View All Articles →" link to /blog
  border border-[#6C63FF] text-[#6C63FF] px-6 py-3 rounded-xl hover:bg-[#6C63FF] hover:text-white
- If no posts yet: don't show the section (posts.length > 0 check)
DO NOT rewrite page.tsx — only add this section in the right place.

Write all 15 files now completely. Start with FILE 1.
After each file print "✓ FILE X DONE" and immediately start the next.
Do not stop. Do not ask questions.
```

---

## PHASE 3 — HOW CLIENT PUBLISHES BLOGS

### Their URL to bookmark:
```
yourdomain.vercel.app/studio
```

### Step by step (itna simple hai):
```
1. Open: growthxmedia.vercel.app/studio
2. Click "Blog Post" on left sidebar
3. Click "Create new post" (pencil icon top right)
4. Fill in:
   → Title (type karo)
   → Slug: "Generate" button dabao — auto ban jata hai
   → Cover Image: drag and drop ya upload
   → Short Description: 1-2 lines
   → Content: type karo, format karo (bold, headings, images)
   → Tags: checkboxes mein se select karo
   → Read Time: manually daalo (e.g. 5)
5. "Publish" button dabao (top right)
6. Website pe 60 seconds mein live ✓
```

### Editing a post:
```
Studio → Blog Post → post pe click karo → edit → Publish
```

### Delete a post:
```
Studio → Blog Post → post pe click karo → ... menu → Delete
```

---

## PHASE 4 — DEPLOY STUDIO ON VERCEL

Studio automatically deploys with your site — no extra steps.

But add this to `next.config.js` to allow Sanity image domains:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}
module.exports = nextConfig
```

Add env variables to Vercel dashboard:
```
NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
NEXT_PUBLIC_SANITY_DATASET    = production
SANITY_API_TOKEN              = your_viewer_token
```

---

## QUICK REFERENCE

```
Blog listing:    /blog
Single post:     /blog/[slug]
Sanity Studio:   /studio  ← Client bookmarks this

Files added:
├── sanity/
│   └── schemaTypes/
│       ├── post.ts       ← Blog post fields
│       └── index.ts
├── sanity.config.ts      ← Studio config
├── app/
│   ├── studio/
│   │   └── [[...tool]]/
│   │       ├── page.tsx  ← Studio embedded here
│   │       └── loading.tsx
│   └── blog/
│       ├── page.tsx      ← Blog listing
│       ├── loading.tsx   ← Auto skeleton
│       └── [slug]/
│           └── page.tsx  ← Single post
├── components/
│   └── blog/
│       ├── BlogCard.tsx
│       ├── BlogCardSkeleton.tsx
│       ├── SearchBar.tsx
│       └── TagFilter.tsx
└── lib/
    ├── sanity.ts         ← Client + all queries
    └── portableText.tsx  ← Rich text renderer

Cost: Sanity free (3 users, unlimited posts) + Vercel free = ₹0
Revalidation: 60 seconds ISR (auto-refresh)
```

---

*GrowthX Blog System v2 | Sanity CMS + Next.js 14 | May 2026*
*Client edits on /studio → Site auto-updates → Zero developer needed*
