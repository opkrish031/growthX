'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import dynamic from 'next/dynamic'

// We use dynamic import with ssr: false to prevent "window is not defined" errors
// during Next.js server-side rendering, as Sanity Studio is a client-side app.
const Studio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
)

export default function StudioPage() {
  return <Studio config={config} />
}
