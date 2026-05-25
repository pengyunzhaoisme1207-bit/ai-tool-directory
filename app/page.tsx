import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allReviews, allGuides, allBriefs, allComparisons } from 'contentlayer/generated'
import Main from './Main'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from './seo'

export const metadata = genPageMetadata({
  title: 'Best AI Tools Directory 2026',
  description:
    'Compare independent AI tool reviews, pricing notes, workflow guides, and weekly briefs for coding, writing, search, design, video, and team productivity.',
})

export default async function Page() {
  const sortedPosts = sortPosts(allReviews)
  const posts = allCoreContent(sortedPosts).filter((p) => p.toolUrl)
  const guides = allCoreContent(sortPosts(allGuides))
  const briefs = allCoreContent(sortPosts(allBriefs))
  const comparisons = allCoreContent(sortPosts(allComparisons))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.title,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description,
    potentialAction: {
      '@type': 'SearchAction',
      name: 'Search AI Tools',
      target: `${siteMetadata.siteUrl}/blog?s={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Main posts={posts} guides={guides} briefs={briefs} comparisons={comparisons} />
    </>
  )
}
