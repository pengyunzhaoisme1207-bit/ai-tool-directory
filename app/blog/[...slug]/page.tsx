import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, allCoreContent, coreContent, CoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors, allBriefs } from 'contentlayer/generated'
import type { Authors, Blog, Brief } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import BriefDetailLayout from '@/layouts/BriefDetailLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound, redirect } from 'next/navigation'

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

  // Check briefs first (for /blog/brief-title paths)
  const brief = allBriefs.find((p) => p.slug === slug)
  if (brief) {
    const publishedAt = new Date(brief.date).toISOString()
    const modifiedAt = new Date(brief.lastmod || brief.date).toISOString()
    return {
      title: brief.title,
      description: brief.summary,
      openGraph: {
        title: brief.title,
        description: brief.summary,
        siteName: siteMetadata.title,
        locale: 'en_US',
        type: 'article',
        publishedTime: publishedAt,
        modifiedTime: modifiedAt,
        url: './',
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

  // Check reviews (tool评测)
  const post = allBlogs.find((p) => p.slug === slug)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img && img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
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
  const reviewPaths = allBlogs.map((p) => ({
    slug: p.slug.split('/').map((name) => decodeURI(name)),
  }))
  const briefPaths = allBriefs.map((p) => ({
    slug: p.slug.split('/').map((name) => decodeURI(name)),
  }))
  return [...reviewPaths, ...briefPaths]
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
        content={coreContent(brief) as unknown as CoreContent<Blog>}
        date={briefDate}
      >
        <MDXLayoutRenderer code={brief.body.code} components={components} toc={brief.toc} />
      </BriefDetailLayout>
    )
  }

  // Check if it's a review
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allBlogs.find((p) => p.slug === slug) as Blog
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
function generateComparisonFAQ(post: Blog) {
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
