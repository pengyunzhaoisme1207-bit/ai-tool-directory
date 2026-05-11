import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { formatDate } from 'pliny/utils/formatDate'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({
  title: 'Comparisons',
  description: 'Head-to-head AI tool comparisons to help you choose the right one.',
})

export default function ComparisonsPage() {
  const sortedPosts = sortPosts(allBlogs)
  const allPosts = allCoreContent(sortedPosts)

  // Filter comparison articles (slug contains "comparison" or "vs")
  const comparisons = allPosts.filter(
    (p) => p.slug && (p.slug.includes('comparison') || p.slug.includes('vs'))
  )

  return (
    <div className="space-y-8 pt-6 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl sm:text-4xl dark:text-gray-100">
          AI Tool Comparisons
        </h1>
        <p className="max-w-2xl text-gray-600 dark:text-gray-400">
          Head-to-head comparisons to help you choose the right tool. We test the same workflows,
          same tasks, side by side.
        </p>
      </div>

      {comparisons.length === 0 ? (
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium">No comparisons yet.</p>
          <p className="mt-1 text-sm">Check back soon for head-to-head tool comparisons.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((post) => (
            <ComparisonCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

function ComparisonCard({ post }) {
  const { path, title, summary, date, rating, images, tags } = post

  // Extract the two tools from title (e.g. "Cursor vs VS Code with Copilot" -> "Cursor" / "Copilot")
  const vsMatch = title.match(/^(.+?)\s+vs\s+(.+?)(?:\s*:.*)?$/i)
  const toolA = vsMatch ? vsMatch[1].trim() : title.split(' vs ')[0]?.trim() || ''
  const toolB = vsMatch ? vsMatch[2].trim() : title.split(' vs ')[1]?.trim() || ''

  return (
    <a
      href={`/${path}`}
      className="group flex flex-col rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-600"
    >
      {/* Tool face-off header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-800">
        <div className="flex-1 text-right">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{toolA}</span>
        </div>
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          VS
        </span>
        <div className="flex-1 text-left">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{toolB}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 py-4">
        <p className="flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{summary}</p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
          {rating && (
            <span className="flex items-center gap-1 text-yellow-500">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {rating}
            </span>
          )}
        </div>
      </div>
    </a>
  )
}
