import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

const builder = createImageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}

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

export async function getAllPosts(): Promise<SanityPost[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, coverImage, excerpt, tags, readTime, publishedAt, featured
  }`
  return await client.fetch(query, {}, { next: { revalidate: 60 } })
}

export async function getFeaturedPost(): Promise<SanityPost | null> {
  const query = `*[_type == "post" && featured == true] | order(publishedAt desc)[0] {
    _id, title, slug, coverImage, excerpt, tags, readTime, publishedAt
  }`
  return await client.fetch(query, {}, { next: { revalidate: 60 } })
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, coverImage, excerpt, body, tags, readTime, publishedAt, featured
  }`
  // @ts-ignore
  return await client.fetch(query, { slug }, { next: { revalidate: 60 } })
}

export async function getPostsByTag(tag: string): Promise<SanityPost[]> {
  const query = `*[_type == "post" && $tag in tags] | order(publishedAt desc) {
    _id, title, slug, coverImage, excerpt, tags, readTime, publishedAt
  }`
  // @ts-ignore
  return await client.fetch(query, { tag }, { next: { revalidate: 60 } })
}

export async function getRelatedPosts(slug: string, tags: string[]): Promise<SanityPost[]> {
  const query = `*[_type == "post" && slug.current != $slug && count(tags[@ in $tags]) > 0] 
  | order(publishedAt desc)[0...3] {
    _id, title, slug, coverImage, excerpt, tags, readTime, publishedAt
  }`
  // @ts-ignore
  return await client.fetch(query, { slug, tags }, { next: { revalidate: 60 } })
}

export async function searchPosts(searchTerm: string): Promise<SanityPost[]> {
  const query = `*[_type == "post" && (title match $searchTerm || excerpt match $searchTerm)] 
  | order(publishedAt desc) {
    _id, title, slug, coverImage, excerpt, tags, readTime, publishedAt
  }`
  // @ts-ignore
  return await client.fetch(query, { searchTerm: `*${searchTerm}*` }, { next: { revalidate: 60 } })
}
