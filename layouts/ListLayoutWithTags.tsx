'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Review, Guide, Comparison, Brief } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
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

const ARCHIVE_VISUALS = [
  {
    title: 'Claude Code',
    src: '/static/images/screenshots/claude-code-official.png',
    href: '/blog/claude-code-review/',
    note: 'Terminal-native agent review',
  },
  {
    title: 'Cursor',
    src: '/static/images/screenshots/cursor-official.png',
    href: '/blog/cursor-review/',
    note: 'AI coding workspace review',
  },
  {
    title: 'Microsoft Foundry',
    src: '/static/images/screenshots/microsoft-foundry-agents.png',
    href: '/blog/ai-agent-platform-buying-guide-2026/',
    note: 'Agent platform buying guide',
  },
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
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('s')?.trim() || ''
  const [activeType, setActiveType] = useState('all')
  const [searchValue, setSearchValue] = useState(initialSearch)

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
    const q = searchValue.toLowerCase()
    return posts.filter((post) => {
      const matchesType = activeType === 'all' || getContentType(post) === activeType
      const category = 'category' in post && typeof post.category === 'string' ? post.category : ''
      const searchContent =
        `${post.title} ${post.summary || ''} ${(post.tags || []).join(' ')} ${category}`.toLowerCase()
      const matchesSearch = !q || searchContent.includes(q)
      return matchesType && matchesSearch
    })
  }, [posts, activeType, searchValue])

  const displayPosts =
    initialDisplayPosts.length > 0 && activeType === 'all' ? initialDisplayPosts : filteredPosts

  return (
    <>
      <div>
        <div className="pt-6 pb-6">
          <section className="rounded-2xl border border-gray-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_46%,#eef6ff_100%)] p-5 shadow-sm dark:border-gray-800 dark:bg-[linear-gradient(135deg,#020617_0%,#111827_55%,#0f172a_100%)]">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
              <div>
                <div className="text-xs font-bold tracking-wide text-blue-600 uppercase dark:text-blue-400">
                  Editorial archive
                </div>
                <h1 className="mt-2 text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-13 dark:text-gray-100">
                  {title}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">
                  Browse the full editorial archive: hands-on reviews, buyer guides, product
                  comparisons, and decision notes written for real AI workflows rather than launch
                  hype.
                </p>
                <div className="mt-5 flex max-w-2xl gap-2">
                  <input
                    type="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search reviews, guides, comparisons..."
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-blue-600 dark:focus:ring-blue-900/30"
                  />
                  {searchValue && (
                    <button
                      type="button"
                      onClick={() => setSearchValue('')}
                      className="rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <span className="rounded-full bg-white px-3 py-1 ring-1 ring-gray-200 dark:bg-gray-950 dark:ring-gray-800">
                    {typeCounts.review} reviews
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 ring-1 ring-gray-200 dark:bg-gray-950 dark:ring-gray-800">
                    {typeCounts.guide} guides
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 ring-1 ring-gray-200 dark:bg-gray-950 dark:ring-gray-800">
                    {typeCounts.comparison} comparisons
                  </span>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 dark:bg-gray-900">
                  {ARCHIVE_VISUALS.map((item) => (
                    <Link key={item.title} href={item.href} className="group relative block">
                      <Image
                        src={item.src}
                        alt={`${item.title} official screenshot`}
                        width={1440}
                        height={900}
                        className="aspect-[4/3] w-full rounded-lg object-cover object-top"
                      />
                      <span className="absolute right-1 bottom-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        {item.title}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="p-4">
                  <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                    Visual evidence
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    Priority articles combine screenshots, scorecards, pricing notes, and workflow
                    context so readers can verify more than a short summary.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="mb-6 grid gap-3 md:grid-cols-3">
          {[
            {
              title: 'How we review',
              body: 'Workflow fit, output quality, pricing fairness, privacy controls, and ecosystem value.',
              href: '/projects',
            },
            {
              title: 'How to compare',
              body: 'Use side-by-side decisions when two tools solve the same job in different ways.',
              href: '/comparisons',
            },
            {
              title: 'How to shortlist',
              body: 'Start from coding, research, writing, creative work, or team rollout needs.',
              href: '/best-ai-tools',
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
            >
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{item.body}</p>
            </Link>
          ))}
        </section>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-lg border border-gray-200 bg-gray-50 pt-5 shadow-sm sm:flex dark:border-gray-800 dark:bg-gray-900/70">
            <div className="px-6 py-4">
              <ul className="space-y-1">
                {CONTENT_TYPES.map((type) => (
                  <li key={type.key}>
                    <button
                      type="button"
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
