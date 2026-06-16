import Link from '@/components/Link'
import Image from '@/components/Image'
import { allReviews } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'AI Tool Categories',
  description:
    'Browse AI tools by category, including coding, writing, image generation, video, audio, search, productivity, and AI agents.',
})

const CATEGORY_GUIDES: Record<
  string,
  {
    description: string
    bestFor: string
    check: string
  }
> = {
  Coding: {
    description:
      'AI coding assistants, code search engines, UI generators, debugging tools, and developer agents.',
    bestFor:
      'Best for developers and technical teams trying to reduce repetitive coding, review, debugging, and repository navigation work.',
    check:
      'Check repository access, diff quality, test behavior, terminal permissions, and whether the tool keeps changes scoped.',
  },
  LLM: {
    description:
      'General-purpose AI assistants and language models for writing, reasoning, research, and everyday work.',
    bestFor:
      'Best for users who need a broad assistant for drafting, summarizing, brainstorming, analysis, and lightweight research.',
    check:
      'Check model access, memory controls, data retention, source handling, export options, and paid-plan limits.',
  },
  'Image Gen': {
    description:
      'AI image generation and visual creation tools for designers, marketers, creators, and product teams.',
    bestFor:
      'Best for teams producing concept art, social assets, campaign visuals, product mockups, and creative exploration.',
    check:
      'Check commercial-use rights, brand control, editing tools, consistency, prompt safety, and image export quality.',
  },
  Creative: {
    description:
      'Creative AI tools for music, voice, video, presentations, visuals, and campaign production.',
    bestFor:
      'Best for creators and marketing teams turning ideas into media assets, scripts, demos, music, or presentations.',
    check:
      'Check licensing, watermark rules, export formats, editing control, voice rights, and whether generated output can be used commercially.',
  },
  Productivity: {
    description:
      'AI tools that improve documents, knowledge management, planning, collaboration, and team workflows.',
    bestFor:
      'Best for individuals and teams trying to reduce meeting, note-taking, documentation, and planning overhead.',
    check:
      'Check workspace permissions, document export, collaboration controls, privacy settings, and whether it fits existing habits.',
  },
  Writing: {
    description:
      'AI writing assistants for marketing, sales, content operations, brand voice, and long-form drafts.',
    bestFor:
      'Best for writers, marketers, sales teams, and content operators who need faster drafts without losing editorial control.',
    check:
      'Check factuality, brand voice controls, plagiarism risk, workflow integrations, and whether human editing remains easy.',
  },
  Search: {
    description:
      'AI search and research tools that help users find, verify, and synthesize information faster.',
    bestFor:
      'Best for researchers, students, analysts, and knowledge workers who need sourced answers rather than generic summaries.',
    check:
      'Check citation quality, freshness, source diversity, hallucination handling, and whether the tool links back to primary material.',
  },
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
      <div className="pt-6 pb-8">
        <section className="rounded-2xl border border-gray-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_48%,#f0fdf4_100%)] p-6 shadow-sm dark:border-gray-800 dark:bg-[linear-gradient(135deg,#020617_0%,#111827_55%,#052e2b_100%)]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
            <div>
              <p className="text-xs font-bold tracking-wide text-emerald-700 uppercase dark:text-emerald-400">
                Workflow index
              </p>
              <h1 className="mt-2 text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
                AI Tool Categories
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-7 text-gray-600 dark:text-gray-400">
                Browse the directory by workflow. Each category groups reviews around a real
                decision: what to use, when to use it, what it costs, and which risks to check
                before adopting it.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
              <h2 className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Category decision signals
              </h2>
              <div className="mt-4 grid gap-3">
                {[
                  ['User intent', 'Is the reader trying to buy, compare, learn, or replace?'],
                  [
                    'Workflow risk',
                    'Could the tool touch code, customer data, media rights, or spend?',
                  ],
                  ['Update need', 'Does pricing, model access, or policy change often?'],
                  [
                    'Internal links',
                    'Can readers move to reviews, guides, comparisons, and briefs?',
                  ],
                ].map(([title, body]) => (
                  <div
                    key={title}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {title}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
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
                  {CATEGORY_GUIDES[category]?.description ||
                    'AI tools grouped by a shared user workflow and decision context.'}
                </p>
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {posts.length}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-2">
              {posts.slice(0, 5).map((post) =>
                post.logo ? (
                  <Link
                    key={post.slug}
                    href={`/${post.path}`}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-2 transition hover:border-blue-300 hover:bg-blue-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
                    title={post.title}
                  >
                    <Image
                      src={post.logo}
                      alt={`${post.title} logo`}
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  </Link>
                ) : null
              )}
            </div>

            <div className="mt-5 grid gap-3 border-t border-gray-100 pt-5 dark:border-gray-800">
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                <h3 className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Best for
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {CATEGORY_GUIDES[category]?.bestFor ||
                    'Readers comparing tools for a focused workflow and a clear buying decision.'}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                <h3 className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  What to check
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {CATEGORY_GUIDES[category]?.check ||
                    'Check pricing, privacy, usability, export, and whether the tool solves a repeated workflow.'}
                </p>
              </div>
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
