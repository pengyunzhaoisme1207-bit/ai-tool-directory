import Link from '@/components/Link'
import { allReviews } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

const SCENES = [
  {
    title: 'Best AI tools for coding',
    description:
      'The strongest coding tools are the ones that understand repositories, keep changes scoped, and reduce review time.',
    links: ['/blog/claude-code-review/', '/blog/cursor-review/', '/blog/openai-codex-review/'],
  },
  {
    title: 'Best AI tools for research',
    description:
      'Research tools should provide citations, source quality, and a way to inspect how answers were formed.',
    links: ['/blog/perplexity-review/', '/blog/phind-review/', '/blog/chatgpt-review/'],
  },
  {
    title: 'Best AI tools for writing',
    description:
      'Writing tools matter when they preserve voice, speed up drafting, and keep editorial control visible.',
    links: ['/blog/notion-ai-review/', '/blog/jasper-ai-review/', '/blog/chatgpt-review/'],
  },
  {
    title: 'Best AI tools for images and video',
    description:
      'Creative tools should make output quality, rights, and editing flexibility easy to judge.',
    links: [
      '/blog/midjourney-review/',
      '/blog/adobe-firefly-ai-assistant-review/',
      '/blog/runway-ml-review/',
    ],
  },
  {
    title: 'Best AI tools for teams',
    description:
      'Team tools should show pricing, permissions, collaboration controls, and rollout risk clearly.',
    links: [
      '/blog/ai-tool-adoption-checklist-for-teams/',
      '/blog/ai-agent-platform-buying-guide-2026/',
      '/blog/claude-code-vs-cursor-comparison/',
    ],
  },
]

export const metadata = genPageMetadata({
  title: 'Best AI Tools for Real Workflows',
  description:
    'Browse the best AI tools by use case, from coding and research to writing, images, video, and teams. Each shortlist links to deeper reviews and guides.',
})

export default function BestAIToolsPage() {
  const tools = allCoreContent(sortPosts(allReviews)).filter((post) => post.toolUrl)
  const featured = tools.slice(0, 6)

  return (
    <article className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8">
        <p className="text-xs font-semibold tracking-wide text-blue-700 uppercase">
          Editorial shortlists
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Best AI Tools for Real Workflows
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">
          This page is the quickest way to move from broad browsing to a concrete shortlist. Each
          scene below groups tools by the job the reader is trying to do, not by hype or category
          labels alone.
        </p>
      </header>

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        {SCENES.map((scene) => (
          <section
            key={scene.title}
            className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {scene.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {scene.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {scene.links.map((href) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full border border-gray-200 px-3 py-1.5 text-sm text-blue-700 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:text-blue-400 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
                >
                  Open review
                </Link>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/60">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Featured tools from the directory
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.path}`}
              className="rounded-lg border border-gray-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {tool.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {tool.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}
