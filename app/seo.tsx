import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps extends Partial<
  Omit<Metadata, 'title' | 'description' | 'openGraph' | 'twitter'>
> {
  title: string
  description?: string
  image?: string
  path?: string
}

export function genPageMetadata({
  title,
  description,
  image,
  path = './',
  ...rest
}: PageSEOProps): Metadata {
  const pageDescription = description || siteMetadata.description
  const canonicalPath =
    path === './'
      ? siteMetadata.siteUrl
      : path.startsWith('http')
        ? path
        : `${siteMetadata.siteUrl}${path.startsWith('/') ? path : `/${path}`}`

  return {
    title,
    description: pageDescription,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: pageDescription,
      url: canonicalPath,
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      description: pageDescription,
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest,
  }
}
