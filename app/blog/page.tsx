import { Suspense } from 'react'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allReviews, allGuides, allComparisons } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'

export const metadata = genPageMetadata({
  title: 'AI Tool Reviews, Guides, and Comparisons',
  description:
    'Read independent AI tool reviews, workflow guides, pricing analysis, and product comparisons across coding, search, writing, creative, and team productivity tools.',
})

export default function BlogPage() {
  const allContent = [
    ...allCoreContent(sortPosts(allReviews)).filter((post) => post.toolUrl),
    ...allCoreContent(sortPosts(allGuides)),
    ...allCoreContent(sortPosts(allComparisons)),
  ]

  const sorted = allContent.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <Suspense fallback={<div className="py-10 text-sm text-gray-500">Loading search...</div>}>
      <ListLayoutWithTags posts={sorted} title="AI Tool Reviews and Guides" />
    </Suspense>
  )
}
