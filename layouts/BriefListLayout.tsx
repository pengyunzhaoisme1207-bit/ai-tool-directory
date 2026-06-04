'use client'

import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Brief } from 'contentlayer/generated'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface BriefListLayoutProps {
  briefs: CoreContent<Brief>[]
  title: string
  initialDisplayBriefs?: CoreContent<Brief>[]
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
          <button className="cursor-auto text-gray-500 disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Previous
          </Link>
        )}
        <span className="text-gray-500 dark:text-gray-400">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto text-gray-500 disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function BriefListLayout({
  briefs,
  title,
  initialDisplayBriefs = [],
  pagination,
}: BriefListLayoutProps) {
  const pathname = usePathname()

  const displayBriefs = initialDisplayBriefs.length > 0 ? initialDisplayBriefs : briefs

  // Determine current path for active state
  const currentSlug = pathname.split('/').filter(Boolean).pop() || ''

  return (
    <>
      <div>
        <div className="pt-4 pb-6">
          <div className="rounded-2xl border border-gray-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_50%,#eef6ff_100%)] p-5 shadow-sm dark:border-gray-800 dark:bg-[linear-gradient(135deg,#020617_0%,#111827_55%,#0f172a_100%)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-xs font-bold tracking-wide text-blue-600 uppercase dark:text-blue-400">
                  Weekly AI market notes
                </div>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
                  {title}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600 dark:text-gray-400">
                  Concise updates on model launches, agent platforms, pricing shifts, enterprise
                  adoption, safety policy, and workflow implications.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950">
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {briefs.length}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">briefs</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950">
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {displayBriefs[0]?.date
                      ? new Date(displayBriefs[0].date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      : '--'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">latest</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950">
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">EN</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">language</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <h2 className="mb-3 text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                All Briefs ({briefs.length})
              </h2>
              <ul className="space-y-1">
                {briefs.slice(0, 12).map((brief) => {
                  const { path, date, title: briefTitle } = brief
                  const briefSlug = path.split('/').pop()?.replace('.mdx', '') || ''
                  const isActive = currentSlug === briefSlug || pathname.includes(briefSlug)
                  return (
                    <li key={path}>
                      <Link
                        href={`/${path}`}
                        className={`block rounded-lg px-3 py-2 text-sm leading-snug transition ${
                          isActive
                            ? 'bg-blue-50 font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100'
                        }`}
                      >
                        <div className="line-clamp-2">{briefTitle}</div>
                        <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                          {formatDate(date, siteMetadata.locale)}
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {displayBriefs.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  No briefs published yet.
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Check back soon for the latest AI industry updates.
                </p>
              </div>
            ) : (
              <ul className="grid gap-4">
                {displayBriefs.map((brief, index) => {
                  const { path, date, title: briefTitle, summary, tags, readingTime } = brief
                  return (
                    <li
                      key={path}
                      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-700"
                    >
                      <article className="grid gap-4 md:grid-cols-[96px_minmax(0,1fr)]">
                        <div>
                          <div className="rounded-lg bg-gray-50 px-3 py-2 text-center dark:bg-gray-900">
                            <time
                              dateTime={date}
                              className="block text-sm font-bold text-gray-900 dark:text-gray-100"
                              suppressHydrationWarning
                            >
                              {new Date(date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </time>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(date).getFullYear()}
                            </span>
                          </div>
                          {readingTime && readingTime.minutes && (
                            <div className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
                              {Math.round(readingTime.minutes)} min read
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div>
                            <h2 className="text-xl leading-8 font-bold tracking-tight sm:text-2xl">
                              <Link
                                href={`/${path}`}
                                className="text-gray-900 hover:text-blue-700 dark:text-gray-100 dark:hover:text-blue-400"
                              >
                                {briefTitle}
                              </Link>
                            </h2>
                            <div className="mt-1.5 flex flex-wrap gap-2">
                              {tags?.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-block rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-sm leading-7 text-gray-600 dark:text-gray-400">
                            {summary}
                          </div>
                          <Link
                            href={`/${path}`}
                            className="inline-flex text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                          >
                            Read brief
                          </Link>
                        </div>
                      </article>
                    </li>
                  )
                })}
              </ul>
            )}
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
