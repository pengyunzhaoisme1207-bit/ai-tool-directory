import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, allCoreContent, coreContent, CoreContent } from 'pliny/utils/contentlayer'
import {
  allReviews,
  allAuthors,
  allBriefs,
  allGuides,
  allComparisons,
} from 'contentlayer/generated'
import type { Authors, Review, Brief, Guide, Comparison } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import BriefDetailLayout from '@/layouts/BriefDetailLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound, redirect } from 'next/navigation'

type BlogPost = Review | Guide | Comparison

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  // Check briefs first
  const brief = allBriefs.find((p) => p.slug === slug)
  if (brief) {
    const publishedAt = new Date(brief.date).toISOString()
    const modifiedAt = new Date(brief.lastmod || brief.date).toISOString()
    return {
      title: brief.title,
      description: brief.summary,
      alternates: {
        canonical: `${siteMetadata.siteUrl}/${brief.path}`,
      },
      openGraph: {
        title: brief.title,
        description: brief.summary,
        siteName: siteMetadata.title,
        locale: 'en_US',
        type: 'article',
        publishedTime: publishedAt,
        modifiedTime: modifiedAt,
        url: `${siteMetadata.siteUrl}/${brief.path}`,
        images: [{ url: siteMetadata.socialBanner }],
        authors: [siteMetadata.author],
      },
      twitter: {
        card: 'summary_large_image',
        title: brief.title,
        description: brief.summary,
        images: [siteMetadata.socialBanner],
      },
    }
  }

  // Check reviews
  const review = allReviews.find((p) => p.slug === slug)
  // Check guides
  const guide = allGuides.find((p) => p.slug === slug)
  // Check comparisons
  const comparison = allComparisons.find((p) => p.slug === slug)

  const post = review || guide || comparison
  if (!post) return

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const imageList = (post as BlogPost).images
    ? typeof (post as BlogPost).images === 'string'
      ? [(post as BlogPost).images]
      : (post as BlogPost).images
    : [siteMetadata.socialBanner]

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `${siteMetadata.siteUrl}/${post.path}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: `${siteMetadata.siteUrl}/${post.path}`,
      images: imageList.map((img: string) => ({
        url: img && img.includes('http') ? img : siteMetadata.siteUrl + img,
      })),
      authors: [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  const reviewPaths = allReviews.map((p) => ({
    slug: p.slug.split('/').map((name) => decodeURI(name)),
  }))
  const guidePaths = allGuides.map((p) => ({
    slug: p.slug.split('/').map((name) => decodeURI(name)),
  }))
  const comparisonPaths = allComparisons.map((p) => ({
    slug: p.slug.split('/').map((name) => decodeURI(name)),
  }))
  const briefPaths = allBriefs.map((p) => ({
    slug: p.slug.split('/').map((name) => decodeURI(name)),
  }))
  return [...reviewPaths, ...guidePaths, ...comparisonPaths, ...briefPaths]
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  // Check if it's a brief
  const brief = allBriefs.find((p) => p.slug === slug)
  if (brief) {
    if (brief.draft) return notFound()
    const briefDate = brief.date
      ? new Date(brief.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : undefined
    return (
      <BriefDetailLayout
        content={coreContent(brief) as unknown as CoreContent<Review>}
        date={briefDate}
      >
        <MDXLayoutRenderer code={brief.body.code} components={components} toc={brief.toc} />
      </BriefDetailLayout>
    )
  }

  // Check if it's a guide
  const guide = allGuides.find((p) => p.slug === slug)
  if (guide) {
    if (guide.draft) return notFound()
    const sortedGuides = allCoreContent(sortPosts(allGuides))
    const guideIndex = sortedGuides.findIndex((p) => p.slug === slug)
    const prev = sortedGuides[guideIndex + 1]
    const next = sortedGuides[guideIndex - 1]

    return (
      <PostSimple
        content={coreContent(guide) as unknown as CoreContent<Review>}
        next={next}
        prev={prev}
      >
        <MDXLayoutRenderer code={guide.body.code} components={components} toc={guide.toc} />
      </PostSimple>
    )
  }

  // Check if it's a comparison
  const comparison = allComparisons.find((p) => p.slug === slug)
  if (comparison) {
    if (comparison.draft) return notFound()
    const allContent = [
      ...allCoreContent(sortPosts(allReviews)),
      ...allCoreContent(sortPosts(allComparisons)),
    ]
    const sortedContent = allContent.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    const postIndex = sortedContent.findIndex((p) => p.slug === slug)
    const prev = sortedContent[postIndex + 1]
    const next = sortedContent[postIndex - 1]

    const authorList = comparison.authors || ['default']
    const authorDetails = authorList.map((author) => {
      const authorResults = allAuthors.find((p) => p.slug === author)
      return coreContent(authorResults as Authors)
    })
    const mainContent = coreContent(comparison)

    // Related posts by category
    const relatedPosts = comparison.category
      ? sortedContent
          .filter((p) => p.category === comparison.category && p.slug !== slug && !!p.toolUrl)
          .slice(0, 3)
      : []

    const jsonLd = (comparison as Comparison).structuredData || {}
    jsonLd['author'] = authorDetails.map((author) => ({
      '@type': 'Person',
      name: author.name,
    }))

    const Layout = layouts[(comparison as Comparison).layout || defaultLayout]

    const isComparisonSlug =
      comparison.slug?.includes('vs') || comparison.slug?.includes('comparison')
    const faqPageJsonLd = isComparisonSlug ? generateComparisonFAQ(comparison) : null

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {faqPageJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
          />
        )}
        <Layout
          content={mainContent as unknown as CoreContent<Review>}
          authorDetails={authorDetails}
          next={next}
          prev={prev}
          relatedPosts={relatedPosts}
        >
          <MDXLayoutRenderer
            code={comparison.body.code}
            components={components}
            toc={comparison.toc}
          />
        </Layout>
      </>
    )
  }

  // Check if it's a review
  const sortedCoreContents = allCoreContent(sortPosts(allReviews))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allReviews.find((p) => p.slug === slug) as Review
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)

  // Related posts by category
  const relatedPosts = post.category
    ? sortedCoreContents
        .filter((p) => p.category === post.category && p.slug !== slug && !!p.toolUrl)
        .slice(0, 3)
    : []
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = layouts[post.layout || defaultLayout]

  // Generate FAQPage JSON-LD for comparison articles
  const isComparison = post.slug?.includes('vs') || post.slug?.includes('comparison')
  const faqPageJsonLd = isComparison ? generateComparisonFAQ(post) : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqPageJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
        />
      )}
      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        next={next}
        prev={prev}
        relatedPosts={relatedPosts}
      >
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
}

/**
 * Generate FAQPage JSON-LD for comparison articles.
 * Extracts structured Q&A from the comparison content to enable Google FAQ rich snippets.
 */
function generateComparisonFAQ(post: Review | Comparison) {
  const title = post.title || ''
  const summary = post.summary || ''
  const toolA = title.match(/^(.+?)\s+vs\s+/i)?.[1]?.trim() || 'Tool A'
  const toolB = title.match(/\s+vs\s+(.+?)(?:\s*[:;]|$)/i)?.[1]?.trim() || 'Tool B'
  const url = `${siteMetadata.siteUrl}/blog/${post.slug}`

  // Build dynamic FAQ from comparison metadata
  const faqItems = [
    {
      question: `Which is better: ${toolA} or ${toolB}?`,
      answer: summary,
    },
    {
      question: `What are the main differences between ${toolA} and ${toolB}?`,
      answer: `${toolA} and ${toolB} are both tools in the ${post.category || 'AI'} category. ${toolA} is priced as ${post.pricing || 'N/A'} while ${toolB} offers different pricing options. The key differences lie in their features, target users, and underlying models. See our full comparison for detailed analysis across multiple dimensions.`,
    },
    {
      question: `Should I choose ${toolA} over ${toolB}?`,
      answer: `It depends on your needs. ${post.targetUser ? `This comparison is aimed at ${post.targetUser}.` : 'Consider your specific requirements, budget, and existing workflow.'} Our comparison tests both tools across multiple dimensions to help you make an informed decision.`,
    },
  ]

  if (post.rating) {
    faqItems.push({
      question: `How do you rate ${toolA} compared to ${toolB}?`,
      answer: `We rated this comparison across multiple dimensions and gave an overall rating of ${post.rating}/5. Our evaluation covers core capabilities, ease of use, pricing fairness, and ecosystem integration.`,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
