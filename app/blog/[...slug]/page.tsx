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
    return (
      <PostSimple content={coreContent(brief) as unknown as CoreContent<Blog>}>
        <MDXLayoutRenderer code={brief.body.code} components={components} toc={brief.toc} />
      </PostSimple>
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
