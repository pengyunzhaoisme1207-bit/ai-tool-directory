import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
}: LayoutProps) {
  const {
    filePath,
    path,
    slug,
    date,
    title,
    tags,
    toolUrl,
    logo,
    pricing,
    pricingModel,
    targetUser,
    rating,
    summary,
    underlyingModel,
    mainFeatures,
    lastUpdated,
    category,
  } = content
  const basePath = path.split('/')[0]
  const isToolReview = !!toolUrl

  const pricingColors: Record<string, string> = {
    Free: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Freemium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Paid: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'Open Source': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  }
  const pricingColor =
    (pricing && pricingColors[pricing]) ||
    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'

  // JSON-LD Schema for SoftwareApplication
  const jsonLd = isToolReview
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: title,
        description: summary,
        url: `${siteMetadata.siteUrl}/${path}`,
        applicationCategory: category || 'AI Tool',
        operatingSystem: 'Web',
        aggregateRating: rating
          ? {
              '@type': 'AggregateRating',
              ratingValue: rating.toString(),
              ratingCount: '1',
              bestRating: '5',
              worstRating: '1',
            }
          : undefined,
        offers: pricing
          ? {
              '@type': 'Offer',
              price: pricing === 'Free' ? '0' : '0',
              priceCurrency: 'USD',
            }
          : undefined,
      }
    : null

  return (
    <SectionContainer>
      {/* JSON-LD Schema */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          {/* Tool InfoCard Header */}
          {isToolReview && (
            <div className="pt-6 xl:pt-8">
              <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-8 dark:border-blue-800/50 dark:from-blue-950/50 dark:via-indigo-950/50 dark:to-purple-950/50">
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  {/* Logo */}
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:h-20 md:w-20 dark:border-gray-700 dark:bg-gray-800">
                    {logo ? (
                      <img
                        src={logo}
                        alt={title}
                        className="h-10 w-10 object-contain md:h-12 md:w-12"
                      />
                    ) : (
                      <svg
                        className="h-8 w-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl dark:text-gray-100">
                        {title}
                      </h1>
                      {pricing && (
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${pricingColor}`}
                        >
                          {pricing}
                        </span>
                      )}
                    </div>

                    {summary && (
                      <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-400">
                        {summary}
                      </p>
                    )}

                    {/* Meta Row */}
                    <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      {targetUser && (
                        <div className="flex items-center gap-1.5">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c6 0 12 2 12s2-3.5.356-1.857M17 20H7m10 0v-2c6 0v-2v2c6 0v-2v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c6 0v-2v2c6 0v-2v-2a3 3 0 00-5.356-1.857M7 17a4 4 0 01-4-4V7m10 0v-10H7m10 0v10a4 4 0 01-4 4z"
                            />
                          </svg>
                          {targetUser}
                        </div>
                      )}
                      {rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 font-medium">{rating} / 5</span>
                        </div>
                      )}
                      {lastUpdated && (
                        <div className="flex items-center gap-1.5">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                          Updated{' '}
                          {new Date(lastUpdated).toLocaleDateString(
                            siteMetadata.locale,
                            postDateTemplate
                          )}
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {tags && tags.length > 0 && (
                      <div className="mb-5 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    )}

                    {/* CTA Button */}
                    <a
                      href={toolUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Visit Official Website
                      <svg
                        className="h-4 w-4 opacity-70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Tech Specs Inline - under the main info */}
                {(underlyingModel || (mainFeatures && mainFeatures.length > 0)) && (
                  <div className="mt-6 rounded-xl border border-blue-200/50 bg-white/60 p-4 dark:border-blue-700/50 dark:bg-gray-900/40">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Tech Specs
                    </h3>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {underlyingModel && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Model:
                          </span>
                          <span className="rounded-md bg-blue-50 px-2 py-0.5 font-mono text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            {underlyingModel}
                          </span>
                        </div>
                      )}
                      {pricingModel && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Pricing:
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {pricingModel}
                          </span>
                        </div>
                      )}
                      {mainFeatures && mainFeatures.length > 0 && (
                        <div className="md:col-span-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Key Features:
                          </span>
                          <div className="mt-1 flex flex-wrap gap-1.5">
                            {mainFeatures.map((f) => (
                              <span
                                key={f}
                                className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Regular blog header */}
          {!isToolReview && (
            <header className="pt-6 xl:pb-6">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(
                          siteMetadata.locale,
                          postDateTemplate
                        )}
                      </time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <PageTitle>{title}</PageTitle>
                </div>
              </div>
            </header>
          )}

          {/* Content Area */}
          <div
            className={`divide-y divide-gray-200 dark:divide-gray-700 ${isToolReview ? '' : 'grid-rows-[auto_1fr] xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0'}`}
          >
            {!isToolReview && (
              <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                    {authorDetails.map((author) => (
                      <li
                        className="flex items-center space-x-2"
                        key={author.name}
                      >
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width={38}
                            height={38}
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                          />
                        )}
                        <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900 dark:text-gray-100">
                            {author.name}
                          </dd>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
            )}
            <div
              className={`${isToolReview ? '' : 'xl:col-span-3 xl:row-span-2 xl:pb-0'}`}
            >
              {/* Ad Placeholder - In-Content */}
              {isToolReview && (
                <div className="my-6 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center dark:border-gray-700 dark:bg-gray-800/50">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Advertisement
                  </p>
                </div>
              )}
              <div className="prose dark:prose-invert max-w-none pt-8 pb-8">
                {children}
              </div>
              {/* Ad Placeholder - Bottom */}
              {isToolReview && (
                <div className="mb-6 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center dark:border-gray-700 dark:bg-gray-800/50">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Advertisement
                  </p>
                </div>
              )}
              <div className="pt-4 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(path)} rel="nofollow">
                  Discuss on Twitter
                </Link>
                {` • `}
                <Link href={editUrl(filePath)}>View on GitHub</Link>
              </div>
              {siteMetadata.comments && (
                <div
                  className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
            </div>
            <footer>
              <div className="divide-gray-200 text-sm leading-5 font-medium xl:divide-y dark:divide-gray-700">
                {/* Ad Placeholder - Sidebar */}
                {isToolReview && (
                  <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center dark:border-gray-700 dark:bg-gray-800/50">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Advertisement
                    </p>
                  </div>
                )}
                {tags && tags.length > 0 && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Previous
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Next
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to the directory"
                >
                  &larr; Back to Directory
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
