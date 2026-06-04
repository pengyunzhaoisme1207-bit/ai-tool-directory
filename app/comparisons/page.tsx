import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allComparisons } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'

export const metadata = genPageMetadata({
  title: 'AI Tool Comparisons',
  description:
    'Compare AI tools side by side with independent analysis of pricing, workflow fit, privacy, strengths, weaknesses, and best-use cases.',
})

export default function ComparisonsPage() {
  const comparisons = allCoreContent(sortPosts(allComparisons))

  return <ListLayoutWithTags posts={comparisons} title="AI Tool Comparisons" />
}
