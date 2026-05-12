import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Brief } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'

interface BriefContent {
  path: string
  slug: string
  title: string
  tags?: string[]
  sources?: string[]
}

interface LayoutProps {
  content: BriefContent
  children: ReactNode
  date?: string
}

export default function BriefDetailLayout({ content, date, children }: LayoutProps) {
  const { path, slug, title, tags, sources } = content

  const pubDate = date || slug?.split('/').pop()?.replace('ai-weekly-brief-', '').replace('.mdx', '')

  return (
    <SectionContainer>
      <article className="max-w-3xl mx-auto">
        {/* Header — serif title, brand color, minimal */}
        <header className="pb-8 mb-8 border-b-[1.5px] border-[#e8e6dc]">
          <div className="mb-4 text-sm font-medium text-[#6b6a64] tracking-wide uppercase font-serif">
            <span className="text-[#1B365D]">{pubDate}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1B365D] leading-[1.15] font-serif">
            {title}
          </h1>
          {tags && tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded bg-[#EEF2F7] px-2.5 py-0.5 text-xs font-medium text-[#1B365D] font-serif"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Body — serif, warm text, structured */}
        <div className="font-serif text-[15px] leading-[1.55] text-[#3d3d3a]">
          <div className="prose prose-stone max-w-none dark:prose-invert
            prose-headings:font-medium prose-headings:font-serif prose-headings:text-[#1B365D]
            prose-h2:text-xl prose-h2:leading-snug prose-h2:tracking-tight
            prose-h3:text-base prose-h3:leading-snug prose-h3:tracking-tight
            prose-p:leading-[1.55] prose-p:text-[#3d3d3a]
            prose-strong:text-[#141413] prose-strong:font-medium
            prose-strong:no-font-bold
            prose-ul:leading-[1.55] prose-li:text-[#3d3d3a]
            prose-a:text-[#1B365D] prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-[2.5px] prose-blockquote:border-l-[#1B365D] prose-blockquote:pl-4 prose-blockquote:text-[#504e49] prose-blockquote:not-italic
            prose-hr:border-[#e8e6dc]
          ">
            {children}
          </div>
        </div>

        {/* Sources — structured at bottom */}
        {sources && sources.length > 0 && (
          <div className="mt-12 pt-6 border-t border-[#e8e6dc]">
            <div className="text-xs font-medium tracking-wider text-[#6b6a64] uppercase font-serif mb-3">
              Sources
            </div>
            <ul className="space-y-1.5">
              {sources.map((url: string, i: number) => (
                <li key={i}>
                  <Link
                    href={url}
                    className="text-sm text-[#1B365D] hover:underline font-serif"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer navigation */}
        <footer className="mt-10 pt-6 border-t border-[#e8e6dc] text-center">
          <Link href="/blog/" className="text-sm text-[#1B365D] hover:underline font-serif">
            &larr; Back to AI Brief
          </Link>
        </footer>
      </article>
    </SectionContainer>
  )
}
