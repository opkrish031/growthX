# BLOG_SETUP.md — GrowthX Media Blog System
### Hashnode CMS + Next.js 14 | Zero Backend | Real-Time | Client-Editable
> Give this file to Gemini CLI after your main site is done.
> Paste SESSION STARTER from GROWTHX_MASTER.md first, then this file.

---

## HOW IT WORKS (explain to client)

```
1. Client goes to hashnode.com → signs up free
2. Client writes a blog post (like Google Docs)
3. Client hits Publish
4. Website AUTOMATICALLY shows the new post — no developer needed
5. Client can edit/delete any post from Hashnode dashboard
6. Everything is real-time — changes show within 60 seconds
```

No backend. No database. No server. Zero cost. Forever.

---

## PHASE 1 — HASHNODE SETUP (Client Does This)

### Step 1: Create Hashnode Account
```
1. Go to hashnode.com
2. Sign up with Google or email (free)
3. Click "Start Blogging"
4. Blog title: "GrowthX Media Blog"
5. Choose a subdomain: growthxmedia.hashnode.dev
   (This is just for Hashnode — your real blog is on your Next.js site)
```

### Step 2: Get Your Publication Host
```
1. Go to hashnode.com/settings
2. Find your Publication Host — it looks like: growthxmedia.hashnode.dev
3. Copy this — you need it for the API
```

### Step 3: Write First Blog Post (Test)
```
1. Click "Write a Story" on Hashnode
2. Add title: "Why Social Media Marketing is Essential for Indian Businesses"
3. Add cover image, content, tags
4. Hit Publish
5. Your site will automatically show this post
```

### Step 4: Get API Key (for publishing via API if needed later)
```
1. hashnode.com → Account Settings → Developer
2. Generate Personal Access Token
3. Save it — add to .env.local as HASHNODE_TOKEN
```

---

## PHASE 2 — CODE TO BUILD

### Environment Variables
Add to `.env.local`:
```
HASHNODE_PUBLICATION_HOST=growthxmedia.hashnode.dev
```

---

## GEMINI CLI PROMPT — BUILD THE ENTIRE BLOG SYSTEM

Paste this entire prompt into Gemini CLI:

```
Add a complete blog system to the existing GrowthX Media Next.js 14 site.
Use Hashnode as the CMS via their free GraphQL API.
No backend, no database — just API calls to Hashnode.

EXISTING SITE COLORS (keep consistent):
Background: #080810, Card: #0E0E1A, Blue: #6C63FF, 
Violet: #A78BFA, Cyan: #22D3EE, White: #F8F8FF, Gray: #94A3B8

HASHNODE API DETAILS:
- GraphQL endpoint: https://gql.hashnode.com
- No auth needed for reading public posts
- Publication host from env: process.env.HASHNODE_PUBLICATION_HOST

BUILD THESE FILES IN ORDER:

━━━ FILE 1: lib/hashnode.ts ━━━
TypeScript types and API functions.

Types to export:
interface HashnodeCoverImage { url: string }
interface HashnodeTag { name: string; slug: string }
interface HashnodeAuthor { name: string; profilePicture: string }
interface HashnodePost {
  id: string
  title: string
  brief: string        // short excerpt
  slug: string
  publishedAt: string
  readTimeInMinutes: number
  coverImage: HashnodeCoverImage | null
  tags: HashnodeTag[]
  author: HashnodeAuthor
}
interface HashnodePostFull extends HashnodePost {
  content: { html: string }  // full post HTML
  seo: { title: string; description: string } | null
}
interface HashnodePageInfo {
  hasNextPage: boolean
  endCursor: string | null
}
interface HashnodePostsResponse {
  posts: HashnodePost[]
  pageInfo: HashnodePageInfo
}

Functions to export:

1. getAllPosts(first: number = 10, after?: string): Promise<HashnodePostsResponse>
GraphQL query:
query GetPosts($host: String!, $first: Int!, $after: String) {
  publication(host: $host) {
    posts(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          id title brief slug publishedAt readTimeInMinutes
          coverImage { url }
          tags { name slug }
          author { name profilePicture }
        }
      }
    }
  }
}
Parse edges[].node into posts array. Return { posts, pageInfo }.

2. getPostBySlug(slug: string): Promise<HashnodePostFull | null>
GraphQL query:
query GetPost($host: String!, $slug: String!) {
  publication(host: $host) {
    post(slug: $slug) {
      id title brief slug publishedAt readTimeInMinutes
      coverImage { url }
      tags { name slug }
      author { name profilePicture }
      content { html }
      seo { title description }
    }
  }
}
Return the post or null.

3. getPostsByTag(tag: string, first: number = 9): Promise<HashnodePost[]>
Same as getAllPosts but filter by tag in the query.

4. searchPosts(query: string): Promise<HashnodePost[]>
Use searchPostsOfPublication query if available, else filter getAllPosts results client-side.

All functions: use fetch with next: { revalidate: 60 } for ISR — auto-refreshes every 60 seconds.
Base fetch wrapper:
async function hashnodeFetch(query: string, variables: Record<string, unknown>) {
  const res = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }
  })
  const data = await res.json()
  return data.data
}

━━━ FILE 2: app/blog/page.tsx ━━━
Server component — Blog listing page.

Import getAllPosts from lib/hashnode.
Fetch first 9 posts on server.

METADATA:
export const metadata = {
  title: 'Blog — GrowthX Media | Digital Marketing Insights',
  description: 'Expert tips on social media, SEO, paid ads, and growing your brand in India.',
}

PAGE LAYOUT:
Full dark theme matching main site (bg-[#080810]).

HERO SECTION at top of blog page:
- bg-gradient from #080810 to #0D0B1E
- bg-grid overlay
- Bottom glow blob (same as main hero but smaller — h-[200px])
- Badge: "📝 INSIGHTS & STRATEGIES"
- Title: "The Growth Blog" — Syne font-black text-5xl md:text-7xl
  "Blog" in .text-gradient
- Sub: "Expert insights on social media, SEO, ads, and scaling your brand in India."
- Stats row: "Weekly Articles" · "100% Free" · "India-Focused"

SEARCH BAR below hero:
- Client component for search (SearchBar component — build separately)
- Input: bg-[#0E0E1A] border border-[#6C63FF]/20 rounded-xl px-5 py-3
  placeholder "Search articles..."
  Search icon from lucide inside input left side
  focus: border-[#6C63FF] ring-2 ring-[#6C63FF]/20
- Full width, max-w-2xl centered

TAGS FILTER ROW:
- Horizontal scroll row of tag pills
- Static tags: ["All", "Social Media", "SEO", "Paid Ads", "Reels", "E-commerce", "Growth"]
- Each pill: bg-[#0E0E1A] border border-[#6C63FF]/20 rounded-full px-4 py-2 text-sm
  Active pill: bg-[#6C63FF] text-white border-[#6C63FF]
  Client component — TagFilter — for interactivity

POSTS GRID:
- grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Map posts to BlogCard component
- If no posts: empty state with sad emoji + "No posts yet. Check back soon!"

LOAD MORE button at bottom:
- Client component handles pagination
- "Load More Articles" button: border border-[#6C63FF] text-[#6C63FF] px-8 py-3 rounded-xl
  onClick: fetch next page, append to posts list
  Show only if pageInfo.hasNextPage

━━━ FILE 3: app/blog/[slug]/page.tsx ━━━
Server component — Individual blog post page.

Import getPostBySlug, getAllPosts from lib/hashnode.

generateStaticParams: fetch first 50 posts slugs for static generation.
generateMetadata: use post.seo or post.title + post.brief.

If post not found: notFound() from next/navigation.

PAGE LAYOUT:

BACK BUTTON at top:
← Back to Blog (link to /blog)
text-[#94A3B8] hover:text-[#6C63FF] flex items-center gap-2

POST HEADER (centered, max-w-3xl mx-auto):
- Tags row: tag pills (small, bg-[#6C63FF]/10 text-[#8B83FF] rounded-full px-3 py-1 text-xs)
- Title: Syne font-black text-4xl md:text-6xl text-[#F8F8FF] mt-4
- Meta row: author avatar + name + published date + read time
  Avatar: w-10 h-10 rounded-full border-2 border-[#6C63FF]/30
  Date: format as "May 3, 2026" using Intl.DateTimeFormat
  Read time: "5 min read" with Clock icon from lucide
- Cover image: w-full aspect-video object-cover rounded-2xl mt-8
  border border-[#6C63FF]/20
  If no cover image: gradient placeholder bg-gradient-to-br from-[#6C63FF]/20 to-[#A78BFA]/20

POST CONTENT (max-w-3xl mx-auto mt-12):
Render post.content.html using dangerouslySetInnerHTML
Wrap in div with className="prose-growthx"

PROSE STYLING — add to globals.css:
.prose-growthx {
  color: #94A3B8;
  line-height: 1.8;
  font-size: 1.1rem;
}
.prose-growthx h1, .prose-growthx h2, .prose-growthx h3 {
  color: #F8F8FF;
  font-family: Syne, sans-serif;
  font-weight: 800;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.prose-growthx h2 { font-size: 1.75rem; }
.prose-growthx h3 { font-size: 1.4rem; }
.prose-growthx p { margin-bottom: 1.5rem; }
.prose-growthx a { color: #6C63FF; text-decoration: underline; }
.prose-growthx a:hover { color: #8B83FF; }
.prose-growthx strong { color: #F8F8FF; font-weight: 700; }
.prose-growthx ul, .prose-growthx ol { 
  padding-left: 1.5rem; 
  margin-bottom: 1.5rem;
  space-y: 0.5rem;
}
.prose-growthx li { margin-bottom: 0.5rem; }
.prose-growthx blockquote {
  border-left: 3px solid #6C63FF;
  padding-left: 1.5rem;
  color: #8B83FF;
  font-style: italic;
  margin: 2rem 0;
  background: rgba(108,99,255,0.05);
  border-radius: 0 0.5rem 0.5rem 0;
  padding: 1rem 1.5rem;
}
.prose-growthx code {
  background: #0E0E1A;
  border: 1px solid rgba(108,99,255,0.2);
  border-radius: 0.25rem;
  padding: 0.15rem 0.4rem;
  font-size: 0.875rem;
  color: #22D3EE;
}
.prose-growthx pre {
  background: #0E0E1A;
  border: 1px solid rgba(108,99,255,0.2);
  border-radius: 0.75rem;
  padding: 1.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}
.prose-growthx img {
  border-radius: 0.75rem;
  border: 1px solid rgba(108,99,255,0.2);
  width: 100%;
}
.prose-growthx hr {
  border-color: rgba(108,99,255,0.2);
  margin: 2.5rem 0;
}

SHARE SECTION below content:
"Share this article:" label
Share buttons: Twitter/X, LinkedIn, WhatsApp (Indian audience — WhatsApp important)
Each: icon button with platform color on hover
WhatsApp: wa.me/?text=encoded URL
Twitter: twitter.com/intent/tweet?url=...&text=post title
LinkedIn: linkedin.com/sharing/share-offsite/?url=...

CTA CARD below share (full-width):
bg-gradient-to-r from-[#6C63FF]/20 to-[#A78BFA]/10
border border-[#6C63FF]/30 rounded-2xl p-8 text-center
"Want results like these for your brand?"
"GrowthX Media helps Indian businesses grow on social media, Google, and beyond."
Button: "Get a Free Audit →" links to /#contact
bg-[#6C63FF] text-white px-8 py-4 rounded-xl

RELATED POSTS section:
Fetch 3 posts with same first tag
"More Insights" heading
grid-cols-1 md:grid-cols-3 gap-6
BlogCard component for each

━━━ FILE 4: components/blog/BlogCard.tsx ━━━
'use client'
Import HashnodePost type from lib/hashnode.
Props: { post: HashnodePost, index?: number }

CARD LAYOUT:
motion.div with:
initial={{ opacity:0, y:40 }}
whileInView={{ opacity:1, y:0 }}
viewport={{ once:true }}
transition={{ duration:0.6, delay: index * 0.08, ease:[0.22,1,0.36,1] }}

Link wrapping entire card: href={`/blog/${post.slug}`}

Card container:
bg-[#0E0E1A] border border-[#6C63FF]/15 rounded-2xl overflow-hidden
transition-all duration-300 h-full flex flex-col
hover: border-[#6C63FF]/45 -translate-y-2 shadow-[0_20px_60px_rgba(108,99,255,0.15)]
cursor-pointer group

Cover image area (aspect-video):
If post.coverImage exists:
  <img> with object-cover w-full h-full
  On group-hover: scale-105 transition-transform duration-500
If no cover:
  Gradient placeholder: bg-gradient-to-br from-[#6C63FF]/20 to-[#A78BFA]/20
  Centered "GX" text in Syne font-black text-4xl text-[#6C63FF]/30

Card body: p-5 flex flex-col flex-1

Tags row: first 2 tags as small pills
bg-[#6C63FF]/10 text-[#8B83FF] text-xs rounded-full px-2.5 py-0.5

Title: 
text-[#F8F8FF] font-bold text-lg leading-snug mt-2 mb-2
font-family Syne
group-hover: text-[#8B83FF] transition-colors
Line clamp 2: overflow-hidden display:-webkit-box -webkit-line-clamp:2

Brief/excerpt:
text-[#94A3B8] text-sm leading-relaxed
Line clamp 3
flex-1 (pushes footer down)

Card footer (mt-auto pt-4 border-t border-[#6C63FF]/10):
flex justify-between items-center
Left: author avatar (w-7 h-7 rounded-full) + author name text-[#94A3B8] text-xs
Right: readTimeInMinutes + " min" text-[#94A3B8] text-xs + Clock icon w-3 h-3

━━━ FILE 5: components/blog/BlogCardSkeleton.tsx ━━━
Loading skeleton for BlogCard.
Animate-pulse divs mimicking BlogCard layout:
- aspect-video div bg-[#0E0E1A] rounded-t-2xl
- Two small pill skeletons (tags)
- Two line title skeleton
- Three line brief skeleton
- Footer with circle + line skeletons
All skeleton divs: bg-[#6C63FF]/5 rounded

━━━ FILE 6: components/blog/SearchBar.tsx ━━━
'use client'
import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'

Props: { defaultValue?: string }

On change (debounced 400ms):
Update URL search params: router.push(`/blog?q=${query}`)
This triggers server-side search filtering.

Input wrapper: relative flex items-center
Search icon: absolute left-4 text-[#94A3B8] w-4 h-4
Clear button (X icon): absolute right-4, show only when input has value
  onClick: clear input + router.push('/blog')
Input: full styling as specified in page.tsx

━━━ FILE 7: components/blog/TagFilter.tsx ━━━
'use client'
import { useRouter, useSearchParams } from 'next/navigation'

Props: { tags: string[], activeTag: string }

On click: router.push(`/blog?tag=${tag}`)
Active tag comes from searchParams.

Horizontal scroll container: 
flex gap-2 overflow-x-auto pb-2 scrollbar-hide
(add .scrollbar-hide to globals.css: scrollbar-width:none, ::-webkit-scrollbar{display:none})

Each pill:
button with onClick
Active: bg-[#6C63FF] text-white border-[#6C63FF]
Inactive: bg-[#0E0E1A] text-[#94A3B8] border-[rgba(108,99,255,0.2)]
border rounded-full px-4 py-2 text-sm whitespace-nowrap transition-all duration-200
hover (inactive): border-[#6C63FF]/45 text-[#F8F8FF]
whileHover scale:1.03 whileTap scale:0.97 (Framer Motion)

━━━ FILE 8: components/blog/LoadMoreButton.tsx ━━━
'use client'
Props: { initialPosts: HashnodePost[], pageInfo: HashnodePageInfo }

useState: posts (starts with initialPosts), cursor (starts with pageInfo.endCursor), hasMore, loading

On click "Load More":
setLoading true
fetch('/api/blog/posts?after=${cursor}') — hits the API route below
Append new posts to existing posts array
Update cursor and hasMore from response
setLoading false

Render: 
Existing posts already rendered server-side — this component only handles the EXTRA loaded posts
Map extra posts to BlogCard components
Button: "Load More Articles" or "Loading..." with spinner
Hide button if !hasMore

━━━ FILE 9: app/api/blog/posts/route.ts ━━━
GET handler for client-side pagination.

const { searchParams } = new URL(req.url)
const after = searchParams.get('after') || undefined
const tag = searchParams.get('tag') || undefined

Import getAllPosts or getPostsByTag from lib/hashnode.
Call appropriate function based on whether tag exists.
Return Response.json({ posts, pageInfo })

━━━ FILE 10: app/blog/loading.tsx ━━━
Blog listing page loading UI.
Show hero skeleton + grid of 6 BlogCardSkeleton components.
This automatically shows while blog page server-fetches data.

━━━ FILE 11: components/Navbar.tsx UPDATE ━━━
Add "Blog" link to the existing Navbar navigation links.
Desktop: add between "Pricing" and "Contact"
Mobile overlay: add to the mobile menu links list
href="/blog"
Keep all existing styling exactly the same.
Do NOT rewrite the whole Navbar — only add the Blog link in two places.

━━━ FILE 12: app/blog/page.tsx UPDATE (Search + Tag filtering) ━━━
The blog page needs to handle search and tag query params server-side.

Page props: { searchParams: { q?: string, tag?: string } }

If searchParams.q exists: filter posts by title/brief containing query
If searchParams.tag and tag !== 'All': filter posts by tag
Pass activeTag to TagFilter component
Pass defaultValue={searchParams.q} to SearchBar

Write all 12 files now completely. Start with FILE 1.
After each file print "✓ FILE X DONE" then immediately start next.
Do not stop between files. Do not add placeholder comments.
```

---

## PHASE 3 — HOW CLIENT USES IT

### Writing a New Blog Post (60 seconds)
```
1. Go to hashnode.com → Sign in
2. Click "Write a Story" (top right)
3. Write title — make it SEO friendly
   Example: "5 Social Media Mistakes Indian Restaurants Make"
4. Add cover image (drag and drop)
5. Write content using their editor (like Google Docs)
6. Add tags: Social Media, SEO, Growth etc
7. Click Publish
8. Open growthxmedia.vercel.app/blog
9. Post appears automatically ✓
```

### Editing a Post
```
1. Hashnode dashboard → My Posts
2. Click any post → Edit
3. Make changes → Save
4. Site updates within 60 seconds ✓
```

### Deleting a Post
```
1. Hashnode dashboard → My Posts
2. Click ... menu → Delete
3. Gone from site within 60 seconds ✓
```

---

## PHASE 4 — SEO (Auto-Handled)

Every blog post gets:
- Unique URL: `growthxmedia.vercel.app/blog/post-slug`
- Auto meta title + description from Hashnode SEO fields
- Static generation (fast load, Google loves it)
- Auto sitemap (add to next.config.js if needed)
- Structured data (add BlogPosting schema if client wants)

---

## PHASE 5 — WHAT CLIENT TELLS GEMINI CLI NEXT

If client wants extra features later, paste these prompts:

### Add Blog to Homepage (Recent Posts Section):
```
Add a "Latest from the Blog" section to app/page.tsx 
between WhyUs and Pricing sections.
Fetch 3 latest posts using getAllPosts from lib/hashnode.
Show as BlogCard grid (3 columns desktop, 1 mobile).
Section header: "INSIGHTS" label + "Latest from the Blog" title.
"View All Articles →" link to /blog.
Same animations and styling as other sections.
Server component — no client needed.
```

### Add Newsletter Signup (using Hashnode newsletter):
```
Add a newsletter signup section at the bottom of /blog page.
Hashnode has built-in newsletter — use their subscribe API:
POST https://api.hashnode.com/newsletter/subscribe
body: { publicationId: "your_id", email: "user@email.com" }
Form: email input + "Subscribe Free" button
Same styling as Contact form inputs.
```

### Add Reading Progress Bar:
```
Add a reading progress bar to app/blog/[slug]/page.tsx
Fixed at top of page (z-50, h-1, bg-[#6C63FF])
Width goes from 0% to 100% as user scrolls through article
'use client' component wrapping just the progress bar
useEffect + scroll listener + useState for progress percentage
```

---

## QUICK REFERENCE

```
Blog listing:  /blog
Single post:   /blog/[slug]
API route:     /api/blog/posts

Files added:
├── app/
│   ├── blog/
│   │   ├── page.tsx          ← Blog listing
│   │   ├── loading.tsx       ← Auto loading UI
│   │   └── [slug]/
│   │       └── page.tsx      ← Single post
│   └── api/
│       └── blog/
│           └── posts/
│               └── route.ts  ← Pagination API
├── components/
│   └── blog/
│       ├── BlogCard.tsx
│       ├── BlogCardSkeleton.tsx
│       ├── SearchBar.tsx
│       ├── TagFilter.tsx
│       └── LoadMoreButton.tsx
└── lib/
    └── hashnode.ts           ← All API functions

Env var to add:
HASHNODE_PUBLICATION_HOST=yourname.hashnode.dev

Revalidation: 60 seconds (ISR — auto refreshes)
Cost: ₹0 — Hashnode free, Vercel free
```

---

*GrowthX Blog System | Hashnode CMS + Next.js 14 ISR | May 2026*
*Client edits on Hashnode → Site auto-updates → Zero developer needed*
