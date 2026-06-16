import Link from '@/components/Link'
import Image from '@/components/Image'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allComparisons } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'AI Tool Comparisons',
  description:
    'Compare AI tools side by side with independent analysis of pricing, workflow fit, privacy, strengths, weaknesses, and best-use cases.',
  path: '/comparisons',
})

const DECISION_GUIDES = [
  {
    title: 'Coding assistant decision',
    question: 'Do you want terminal-native delegation or IDE-native collaboration?',
    href: '/blog/claude-code-vs-cursor-comparison/',
  },
  {
    title: 'AI IDE decision',
    question: 'Should you move into Cursor or stay with VS Code plus Copilot?',
    href: '/blog/cursor-vs-copilot-comparison/',
  },
  {
    title: 'AI search decision',
    question: 'Do you need sourced search answers or a broader general assistant?',
    href: '/blog/perplexity-vs-chatgpt-comparison/',
  },
]

export default function ComparisonsPage() {
  const comparisons = allCoreContent(sortPosts(allComparisons))

  return (
    <article className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-wide text-blue-700 uppercase">
              Decision center
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
              AI Tool Comparisons
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">
              Comparison pages help readers choose between tools that look similar on the surface
              but behave differently in real workflows. We focus on pricing, workflow fit, privacy,
              usability, and when each tool is the better choice.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <div className="grid grid-cols-2 gap-1 p-1">
              <Image
                src="/static/images/screenshots/claude-code-official.png"
                alt="Claude Code official screenshot"
                width={1440}
                height={900}
                className="aspect-[4/3] w-full rounded-lg object-cover object-top"
              />
              <Image
                src="/static/images/screenshots/cursor-official.png"
                alt="Cursor official screenshot"
                width={1440}
                height={900}
                className="aspect-[4/3] w-full rounded-lg object-cover object-top"
              />
            </div>
            <div className="border-t border-gray-200 p-4 dark:border-gray-800">
              <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Side-by-side thinking
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                A good comparison explains when each product wins, not which logo is louder.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mb-8 grid gap-3 md:grid-cols-4">
        {[
          ['Workflow', 'Which daily job does each tool improve?'],
          ['Cost', 'Where do free limits, credits, and seat pricing matter?'],
          ['Control', 'What privacy, permission, and review controls exist?'],
          ['Verdict', 'Who should choose A, B, or neither?'],
        ].map(([title, body]) => (
          <div
            key={title}
            className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/70"
          >
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{body}</p>
          </div>
        ))}
      </section>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        {DECISION_GUIDES.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-gray-200 bg-gray-50 p-5 transition hover:border-blue-300 hover:bg-blue-50 dark:border-gray-800 dark:bg-gray-900/70 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
          >
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {item.question}
            </p>
            <p className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400">
              Open comparison
            </p>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex flex-col gap-2 border-b border-gray-100 pb-4 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            All comparison articles
          </h2>
          <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
            Use these pages when you already have two or more tools in mind and need a practical
            recommendation.
          </p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {comparisons.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.path}`}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-blue-300 hover:bg-blue-50 dark:border-gray-800 dark:bg-gray-900/70 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
            >
              <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Comparison
              </div>
              <h3 className="mt-2 text-base font-semibold text-gray-900 dark:text-gray-100">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {post.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-2.5 py-1 text-xs text-gray-600 ring-1 ring-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:ring-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}
