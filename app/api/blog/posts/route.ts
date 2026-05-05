import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, getPostsByTag } from '@/lib/hashnode'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const after = searchParams.get('after') || undefined
  const tag = searchParams.get('tag') || undefined
  const first = parseInt(searchParams.get('first') || '9')

  try {
    let result
    if (tag && tag !== 'All') {
      // Note: Hashnode usually expects tag slugs. We'll assume the display tag maps to slug.
      const tagSlug = tag.toLowerCase().replace(/\s+/g, '-')
      result = await getPostsByTag(tagSlug, first, after)
    } else {
      result = await getAllPosts(first, after)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
