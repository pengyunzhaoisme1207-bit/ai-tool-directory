import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allReviews } from 'contentlayer/generated'
import Main from './Main'
import siteMetadata from '@/data/siteMetadata'

export default async function Page() {
  const sortedPosts = sortPosts(allReviews)
  const posts = allCoreContent(sortedPosts).filter((p) => p.toolUrl)

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
      <Main posts={posts} />
    </>
  )
}
