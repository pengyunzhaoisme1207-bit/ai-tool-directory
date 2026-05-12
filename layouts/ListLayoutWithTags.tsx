'use client'

import { useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Review, Guide, Comparison } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Review | Guide | Comparison>[]
  title: string
  initialDisplayPosts?: CoreContent<Review | Guide | Comparison>[]
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
]

function getContentType(post: CoreContent<Review | Guide | Comparison>): string {
  if ((post as any).toolUrl) {
    // Has tool-specific fields → Review or Comparison
    const filePath = (post as any).filePath || ''
    if (filePath.includes('comparisons/')) return 'comparison'
    return 'review'
  }
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
  const [activeCategory, setActiveCategory] = useState('all')

  // Extract categories from posts
  const categories = useMemo(() => {
    const catSet = new Set<string>()
    posts.forEach((post) => {
      const cat = (post as any).category
      if (cat) catSet.add(cat)
    })
    return Array.from(catSet).sort()
  }, [posts])

  // Count posts per type
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: posts.length, review: 0, guide: 0, comparison: 0 }
    posts.forEach((post) => {
      const type = getContentType(post)
      counts[type]++
    })
    return counts
  }, [posts])

  // Count posts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    posts.forEach((post) => {
      const cat = (post as any).category
      if (cat) {
        counts[cat] = (counts[cat] || 0) + 1
      }
    })
    return counts
  }, [posts])

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (activeType !== 'all') {
        const type = getContentType(post)
        if (type !== activeType) return false
      }
      if (activeCategory !== 'all') {
        const cat = (post as any).category
        if (cat !== activeCategory) return false
      }
      return true
    })
  }, [posts, activeType, activeCategory])

  const displayPosts =
    initialDisplayPosts.length > 0 && !activeType && !activeCategory
      ? initialDisplayPosts
      : filteredPosts

  return (
    <>
      <div>
        <div className="pt-6 pb-6">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
            <div className="px-6 py-4">
              {/* Content Type Filter */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                  Content Type
                </h3>
                <ul className="space-y-1">
                  {CONTENT_TYPES.map((type) => (
                    <li key={type.key}>
                      <button
                        onClick={() => {
                          setActiveType(type.key)
                          setActiveCategory('all')
                        }}
                        className={`w-full text-left px-3 py-2 text-sm font-medium rounded transition-colors ${
                          activeType === type.key
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        {type.label} ({typeCounts[type.key]})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Category Filter */}
              {categories.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                    Category
                  </h3>
                  <ul className="space-y-1">
                    <li>
                      <button
                        onClick={() => setActiveCategory('all')}
                        className={`w-full text-left px-3 py-2 text-sm font-medium rounded transition-colors ${
                          activeCategory === 'all'
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        All Categories ({posts.length})
                      </button>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => setActiveCategory(cat)}
                          className={`w-full text-left px-3 py-2 text-sm font-medium rounded transition-colors ${
                            activeCategory === cat
                              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                          }`}
                        >
                          {cat} ({categoryCounts[cat] || 0})
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags, readingTime } = post
                const rating = (post as any).rating
                const category = (post as any).category
                const type = getContentType(post)
                const typeLabel =
                  type === 'guide' ? 'Guide' : type === 'comparison' ? 'Comparison' : 'Review'
                return (
                  <li key={path} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <div className="flex items-center gap-3 text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date} suppressHydrationWarning>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          {typeLabel}
                        </span>
                        {category && (
                          <span className="text-xs text-primary-500 dark:text-primary-400">
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
                            {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
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
                            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
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
