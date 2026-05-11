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
      <nav className="flex justify-between font-serif">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50 text-[#6b6a64]" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="text-[#1B365D] hover:underline"
          >
            Previous
          </Link>
        )}
        <span className="text-[#6b6a64]">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50 text-[#6b6a64]" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next" className="text-[#1B365D] hover:underline">
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
      <div className="font-serif">
        {/* Header — editorial, serif */}
        <div className="pt-6 pb-8 border-b-[1.5px] border-[#e8e6dc]">
          <div className="flex items-center gap-3">
            <svg className="h-7 w-7 text-[#1B365D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1B365D]">
              AI Brief
            </h1>
          </div>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#504e49]">
            AI industry news and updates, curated by our team. Published irregularly as significant developments occur.
          </p>
        </div>

        <div className="flex sm:space-x-24">
          {/* Sidebar — Brief index */}
          <div className="hidden h-full max-h-screen max-w-[300px] min-w-[300px] flex-wrap overflow-auto pt-5 sm:flex">
            <div className="px-4 py-4">
              <h3 className="text-xs font-medium tracking-widest text-[#6b6a64] uppercase mb-4">
                All Briefs ({briefs.length})
              </h3>
              <ul className="space-y-0">
                {briefs.map((brief) => {
                  const { path, date, title: briefTitle } = brief
                  const briefSlug = path.split('/').pop()?.replace('.mdx', '') || ''
                  const isActive = currentSlug === briefSlug || pathname.includes(briefSlug)
                  return (
                    <li key={path} className="py-2">
                      <Link
                        href={`/${path}`}
                        className={`block text-sm leading-snug ${
                          isActive
                            ? 'text-[#1B365D] font-medium'
                            : 'text-[#504e49] hover:text-[#1B365D]'
                        }`}
                      >
                        <div className={isActive ? 'text-[#1B365D] font-medium' : 'text-[#504e49]'}>
                          {briefTitle}
                        </div>
                        <div className="text-xs text-[#8a8983] mt-0.5">
                          {formatDate(date, siteMetadata.locale)}
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Brief list — timeline style */}
          <div className="min-w-0 flex-1">
            {displayBriefs.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-lg font-medium text-[#504e49]">
                  No briefs published yet.
                </p>
                <p className="mt-1 text-sm text-[#6b6a64]">
                  Check back soon for the latest AI industry updates.
                </p>
              </div>
            ) : (
              <ul className="space-y-0">
                {displayBriefs.map((brief, index) => {
                  const { path, date, title: briefTitle, summary, tags, readingTime } = brief
                  return (
                    <li
                      key={path}
                      className={`py-6 ${index !== displayBriefs.length - 1 ? 'border-b border-[#e8e6dc]' : ''}`}
                    >
                      <article className="flex flex-col space-y-2">
                        <div className="flex items-center gap-3 text-sm leading-6 text-[#6b6a64]">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                          {readingTime && readingTime.minutes && (
                            <span className="flex items-center gap-1 text-xs">
                              {Math.round(readingTime.minutes)} min read
                            </span>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div>
                            <h2 className="text-xl leading-8 font-medium tracking-tight sm:text-2xl">
                              <Link href={`/${path}`} className="text-[#1B365D] hover:underline">
                                {briefTitle}
                              </Link>
                            </h2>
                            <div className="mt-1.5 flex flex-wrap gap-2">
                              {tags?.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-block rounded bg-[#EEF2F7] px-2.5 py-0.5 text-xs font-medium text-[#1B365D]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-[15px] leading-relaxed text-[#504e49]">
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
