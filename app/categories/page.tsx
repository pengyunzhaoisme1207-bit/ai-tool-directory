import Link from '@/components/Link'
import { allReviews } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'AI Tool Categories',
  description:
    'Browse AI tools by category, including coding, writing, image generation, video, audio, search, productivity, and AI agents.',
})

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Coding:
    'AI coding assistants, code search engines, UI generators, debugging tools, and developer agents.',
  LLM: 'General-purpose AI assistants and language models for writing, reasoning, research, and everyday work.',
  'Image Gen':
    'AI image generation and visual creation tools for designers, marketers, creators, and product teams.',
  Creative:
    'Creative AI tools for music, voice, video, presentations, visuals, and campaign production.',
  Productivity:
    'AI tools that improve documents, knowledge management, planning, collaboration, and team workflows.',
  Writing:
    'AI writing assistants for marketing, sales, content operations, brand voice, and long-form drafts.',
  Search:
    'AI search and research tools that help users find, verify, and synthesize information faster.',
}

export default function CategoriesPage() {
  const reviews = allCoreContent(sortPosts(allReviews)).filter((post) => post.toolUrl)
  const grouped = reviews.reduce<Record<string, typeof reviews>>((acc, post) => {
    const category = post.category || 'Other'
    acc[category] = acc[category] || []
    acc[category].push(post)
    return acc
  }, {})

  const categories = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b))

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          AI Tool Categories
        </h1>
        <p className="max-w-3xl text-lg leading-7 text-gray-500 dark:text-gray-400">
          Browse the directory by workflow. Each category groups reviews around a real decision:
          what to use, when to use it, what it costs, and which risks to check before adopting it.
        </p>
      </div>

      <div className="grid gap-6 py-10 md:grid-cols-2">
        {categories.map(([category, posts]) => (
          <section
            key={category}
            className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{category}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {CATEGORY_DESCRIPTIONS[category] ||
                    'AI tools grouped by a shared user workflow and decision context.'}
                </p>
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {posts.length}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {posts.slice(0, 6).map((post) => (
                <Link
                  key={post.slug}
                  href={`/${post.path}`}
                  className="block rounded-lg border border-gray-100 p-3 transition-colors hover:border-blue-200 hover:bg-blue-50 dark:border-gray-800 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {post.title}
                    </h3>
                    {post.rating && (
                      <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                        {post.rating}/5
                      </span>
                    )}
                  </div>
                  {post.summary && (
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {post.summary}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
