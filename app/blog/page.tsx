import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allReviews, allGuides, allComparisons } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'

export const metadata = genPageMetadata({
  title: 'Blog',
  description: 'AI tool reviews, how-to guides, comparisons and tutorials.',
})

export default function BlogPage() {
  const allContent = [
    ...allCoreContent(sortPosts(allReviews)),
    ...allCoreContent(sortPosts(allGuides)),
    ...allCoreContent(sortPosts(allComparisons)),
  ]

  const sorted = allContent.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return <ListLayoutWithTags posts={sorted} title="Blog" />
}
