'use client'

import { useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Review, Guide, Comparison, Brief } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Review | Guide | Comparison | Brief>[]
  title: string
  initialDisplayPosts?: CoreContent<Review | Guide | Comparison | Brief>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

const CONTENT_TYPES = [
  { key: 'all', label: 'All Posts' },
  { key: 'review', label: 'Reviews' },
  { key: 'guide', label: 'Guides' },
  { key: 'comparison', label: 'Comparisons' },
  { key: 'brief', label: 'Briefs' },
]

function getContentType(post: CoreContent<Review | Guide | Comparison | Brief>): string {
  const filePath = 'filePath' in post && typeof post.filePath === 'string' ? post.filePath : ''
  if (filePath.includes('reviews/')) return 'review'
  if (filePath.includes('comparisons/')) return 'comparison'
  if (filePath.includes('briefs/')) return 'brief'
  return 'guide'
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const [activeType, setActiveType] = useState('all')

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: posts.length,
      review: 0,
      guide: 0,
      comparison: 0,
      brief: 0,
    }
    posts.forEach((post) => {
      const type = getContentType(post)
      counts[type]++
    })
    return counts
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (activeType === 'all') return posts
    return posts.filter((post) => getContentType(post) === activeType)
  }, [posts, activeType])

  const displayPosts =
    initialDisplayPosts.length > 0 && activeType === 'all' ? initialDisplayPosts : filteredPosts

  return (
    <>
      <div>
        <div className="pt-6 pb-6">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-13 dark:text-gray-100">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">
            Browse the full editorial archive: hands-on reviews, buyer guides, product comparisons,
            and decision notes written for real AI workflows rather than launch hype.
          </p>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-lg border border-gray-200 bg-gray-50 pt-5 shadow-sm sm:flex dark:border-gray-800 dark:bg-gray-900/70">
            <div className="px-6 py-4">
              <ul className="space-y-1">
                {CONTENT_TYPES.map((type) => (
                  <li key={type.key}>
                    <button
                      onClick={() => setActiveType(type.key)}
                      className={`w-full rounded px-3 py-2 text-left text-sm font-medium transition-colors ${
                        activeType === type.key
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                      }`}
                    >
                      {type.label} ({typeCounts[type.key]})
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags, readingTime } = post
                const rating =
                  'rating' in post && typeof post.rating === 'number' ? post.rating : undefined
                const category =
                  'category' in post && typeof post.category === 'string'
                    ? post.category
                    : undefined
                const type = getContentType(post)
                const typeLabel =
                  type === 'guide'
                    ? 'Guide'
                    : type === 'comparison'
                      ? 'Comparison'
                      : type === 'brief'
                        ? 'Brief'
                        : 'Review'
                return (
                  <li key={path} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <div className="flex items-center gap-3 text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date} suppressHydrationWarning>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                        <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          {typeLabel}
                        </span>
                        {category && (
                          <span className="text-primary-500 dark:text-primary-400 text-xs">
                            {category}
                          </span>
                        )}
                        {readingTime && readingTime.minutes && (
                          <span className="flex items-center gap-1 text-xs">
                            <svg
                              className="h-3.5 w-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {Math.round(readingTime.minutes)} min read
                          </span>
                        )}
                        {rating && (
                          <span className="flex items-center gap-0.5 text-xs text-yellow-500">
                            {'★'.repeat(Math.round(rating))}
                            {'☆'.repeat(5 - Math.round(rating))}
                            <span className="ml-1 text-gray-500 dark:text-gray-400">{rating}</span>
                          </span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {tags?.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
