import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allGuides, allComparisons } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'

export const metadata = genPageMetadata({
  title: 'Blog',
  description: 'AI tool usage guides and product comparisons.',
})

export default function BlogPage() {
  const allContent = [
    ...allCoreContent(sortPosts(allGuides)),
    ...allCoreContent(sortPosts(allComparisons)),
  ]

  const sorted = allContent.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return <ListLayoutWithTags posts={sorted} title="Blog" />
}
