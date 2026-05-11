'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Brief } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data-briefs.json'

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
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
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

export default function BriefListLayout({
  briefs,
  title,
  initialDisplayBriefs = [],
  pagination,
}: BriefListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayBriefs = initialDisplayBriefs.length > 0 ? initialDisplayBriefs : briefs

  return (
    <>
      <div>
        {/* Header */}
        <div className="pt-6 pb-8">
          <div className="flex items-center gap-3">
            <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
              AI Brief
            </h1>
          </div>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-gray-500 dark:text-gray-400">
            AI industry news and updates, curated by our team. Published irregularly as significant developments occur.
          </p>
        </div>

        <div className="flex sm:space-x-24">
          {/* Sidebar — Tag filter */}
          <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
            <div className="px-6 py-4">
              <h3 className="text-primary-500 font-bold uppercase">All Briefs</h3>
              <ul className="mt-4">
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                        <h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                          aria-label={`View briefs tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Brief list */}
          <div className="min-w-0 flex-1">
            {displayBriefs.length === 0 ? (
              <div className="py-16 text-center">
                <svg
                  className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
                  No briefs published yet.
                </p>
                <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                  Check back soon for the latest AI industry updates.
                </p>
              </div>
            ) : (
              <ul className="space-y-0">
                {displayBriefs.map((brief, index) => {
                  const { path, date, title, summary, tags, readingTime } = brief
                  return (
                    <li
                      key={path}
                      className={`py-6 ${index !== displayBriefs.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                    >
                      <article className="flex flex-col space-y-2">
                        <div className="flex items-center gap-3 text-sm leading-6 text-gray-400 dark:text-gray-500">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                          {readingTime && readingTime.minutes && (
                            <span className="flex items-center gap-1 text-xs">
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {Math.round(readingTime.minutes)} min read
                            </span>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div>
                            <h2 className="text-xl leading-8 font-bold tracking-tight sm:text-2xl">
                              <Link href={`/${path}`} className="text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400">
                                {title}
                              </Link>
                            </h2>
                            <div className="mt-1.5 flex flex-wrap gap-2">
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
