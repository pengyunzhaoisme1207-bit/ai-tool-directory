import Link from '@/components/Link'
import Image from '@/components/Image'
import { genPageMetadata } from 'app/seo'

const SHORTLISTS = [
  {
    title: 'Best AI tools for coding',
    intro:
      'Coding tools should be judged by repository understanding, diff quality, testing behavior, and how much review work they actually remove.',
    guide: '/blog/ai-coding-agent-evaluation-playbook/',
    picks: [
      {
        name: 'Claude Code',
        href: '/blog/claude-code-review/',
        verdict: 'Best terminal-native coding agent',
        bestFor: 'Experienced developers who want delegated repo-level work.',
        watch: 'Less friendly for beginners who prefer visual IDE workflows.',
      },
      {
        name: 'Cursor',
        href: '/blog/cursor-review/',
        verdict: 'Best AI-native code editor',
        bestFor: 'Developers who want familiar VS Code ergonomics with stronger AI workflows.',
        watch: 'Team pricing and model routing can become complex.',
      },
      {
        name: 'OpenAI Codex',
        href: '/blog/openai-codex-review/',
        verdict: 'Best for OpenAI-centered coding workflows',
        bestFor: 'Teams already using OpenAI models and agent tooling.',
        watch: 'Compare carefully with Claude Code and Cursor before standardizing.',
      },
    ],
  },
  {
    title: 'Best AI tools for research',
    intro:
      'Research tools should make sources inspectable. The best options help readers verify claims instead of hiding the answer behind a fluent summary.',
    guide: '/blog/how-to-compare-ai-search-engines/',
    picks: [
      {
        name: 'Perplexity',
        href: '/blog/perplexity-review/',
        verdict: 'Best AI answer engine',
        bestFor: 'Researchers and knowledge workers who need citations and quick synthesis.',
        watch: 'Deep research features may require paid plans for serious usage.',
      },
      {
        name: 'Phind',
        href: '/blog/phind-review/',
        verdict: 'Best developer-focused AI search',
        bestFor: 'Engineers searching technical docs, APIs, and programming issues.',
        watch: 'Less general-purpose than broader assistants.',
      },
      {
        name: 'ChatGPT',
        href: '/blog/chatgpt-review/',
        verdict: 'Best general research assistant',
        bestFor: 'Users who want research, drafting, analysis, and files in one assistant.',
        watch: 'Important claims still need source verification.',
      },
    ],
  },
  {
    title: 'Best AI tools for writing and content',
    intro:
      'Writing tools should speed up drafts without taking away editorial control. Brand voice, factual review, and workflow fit matter more than raw output volume.',
    guide: '/blog/how-to-use-ai-writing-assistants/',
    picks: [
      {
        name: 'Notion AI',
        href: '/blog/notion-ai-review/',
        verdict: 'Best inside a document workspace',
        bestFor: 'Teams already using Notion for notes, docs, and internal knowledge.',
        watch: 'Less compelling if your content workflow lives outside Notion.',
      },
      {
        name: 'Jasper AI',
        href: '/blog/jasper-ai-review/',
        verdict: 'Best marketing writing workflow',
        bestFor: 'Marketing teams that need campaign production and brand controls.',
        watch: 'May be more than a solo creator needs.',
      },
      {
        name: 'ChatGPT',
        href: '/blog/chatgpt-review/',
        verdict: 'Best flexible writing partner',
        bestFor: 'People who need brainstorming, outlines, rewrites, and analysis together.',
        watch: 'Needs human editing for facts, tone, and final polish.',
      },
    ],
  },
  {
    title: 'Best AI tools for images and video',
    intro:
      'Creative AI tools should be evaluated on quality, editing control, rights, consistency, and whether outputs can be used in real campaigns.',
    guide: '/blog/how-to-use-ai-image-generators/',
    picks: [
      {
        name: 'Midjourney',
        href: '/blog/midjourney-review/',
        verdict: 'Best for high-quality image generation',
        bestFor: 'Creators who care about visual quality and style exploration.',
        watch: 'Workflow and commercial requirements should be checked before client work.',
      },
      {
        name: 'Adobe Firefly',
        href: '/blog/adobe-firefly-ai-assistant-review/',
        verdict: 'Best for brand-safe creative workflows',
        bestFor: 'Design and marketing teams already using Adobe tools.',
        watch: 'May feel less experimental than specialist image models.',
      },
      {
        name: 'Runway',
        href: '/blog/runway-ml-review/',
        verdict: 'Best AI video production suite',
        bestFor: 'Creators and teams producing short-form video, concept clips, and ads.',
        watch: 'Costs can rise quickly with serious video generation usage.',
      },
    ],
  },
  {
    title: 'Best AI tools for teams',
    intro:
      'Team adoption is not about the smartest model. It is about permissions, rollout design, data boundaries, pricing predictability, and whether people actually use the tool weekly.',
    guide: '/blog/ai-tool-adoption-checklist-for-teams/',
    picks: [
      {
        name: 'Claude Code vs Cursor',
        href: '/blog/claude-code-vs-cursor-comparison/',
        verdict: 'Best decision page for engineering teams',
        bestFor: 'Teams choosing between terminal-native and IDE-native agent workflows.',
        watch: 'The right answer depends heavily on team habits.',
      },
      {
        name: 'AI Agent Platform Guide',
        href: '/blog/ai-agent-platform-buying-guide-2026/',
        verdict: 'Best checklist for governed agents',
        bestFor: 'Managers evaluating tools that can take actions, call APIs, or modify work.',
        watch: 'Do not skip sandbox testing and approval flows.',
      },
      {
        name: 'Free vs Paid AI Tools',
        href: '/blog/free-vs-paid-ai-tools-decision-guide/',
        verdict: 'Best budget decision guide',
        bestFor: 'Small teams deciding when a paid plan is worth it.',
        watch: 'Free tiers can be fine for pilots but weak for governance.',
      },
    ],
  },
]

export const metadata = genPageMetadata({
  title: 'Best AI Tools by Workflow 2026',
  description:
    'Compare the best AI tools by real workflow: coding, research, writing, image and video creation, and team adoption. Includes recommendations, risks, and related guides.',
  path: '/best-ai-tools',
})

export default function BestAIToolsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best AI Tools by Workflow 2026',
    description:
      'Editorial shortlists of AI tools by workflow, with practical recommendation notes.',
    mainEntity: SHORTLISTS.map((section, index) => ({
      '@type': 'ItemList',
      name: section.title,
      position: index + 1,
      itemListElement: section.picks.map((pick, pickIndex) => ({
        '@type': 'ListItem',
        position: pickIndex + 1,
        name: pick.name,
        url: pick.href,
        description: pick.verdict,
      })),
    })),
  }

  return (
    <article className="mx-auto max-w-6xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-wide text-blue-700 uppercase">
              Editorial shortlists
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
              Best AI Tools by Workflow
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">
              The best AI tool depends on the job. This guide organizes recommendations by workflow
              and explains who each tool fits, why it is included, and what to check before adopting
              it.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <div className="grid grid-cols-3 gap-1 p-1">
              <Image
                src="/static/images/screenshots/claude-code-official.png"
                alt="Claude Code screenshot"
                width={1440}
                height={900}
                className="aspect-[4/3] w-full rounded-lg object-cover object-top"
              />
              <Image
                src="/static/images/screenshots/cursor-official.png"
                alt="Cursor screenshot"
                width={1440}
                height={900}
                className="aspect-[4/3] w-full rounded-lg object-cover object-top"
              />
              <Image
                src="/static/images/screenshots/microsoft-foundry-agents.png"
                alt="Microsoft Foundry screenshot"
                width={1440}
                height={900}
                className="aspect-[4/3] w-full rounded-lg object-cover object-top"
              />
            </div>
            <div className="border-t border-gray-200 p-4 dark:border-gray-800">
              <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Shortlist evidence
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Every shortlist should show the product surface, the decision logic, and the user
                type it serves.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mb-8 grid gap-3 md:grid-cols-4">
        {[
          ['Coding', 'Agentic editors and terminal workflows'],
          ['Research', 'Answer engines with citations'],
          ['Writing', 'Drafting tools with editorial control'],
          ['Teams', 'Rollout-ready tools with governance'],
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

      <div className="space-y-6">
        {SHORTLISTS.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950"
          >
            <div className="flex flex-col gap-3 border-b border-gray-100 pb-4 md:flex-row md:items-end md:justify-between dark:border-gray-800">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {section.title}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {section.intro}
                </p>
              </div>
              <Link
                href={section.guide}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Read related guide
              </Link>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {section.picks.map((pick, index) => (
                <Link
                  key={pick.href}
                  href={pick.href}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-blue-300 hover:bg-blue-50 dark:border-gray-800 dark:bg-gray-900/70 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Pick #{index + 1}
                      </div>
                      <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-gray-100">
                        {pick.name}
                      </h3>
                    </div>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-gray-200 dark:bg-gray-950 dark:text-blue-400 dark:ring-gray-800">
                      Review
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {pick.verdict}
                  </p>
                  <dl className="mt-3 space-y-3 text-sm leading-6">
                    <div>
                      <dt className="font-semibold text-gray-700 dark:text-gray-300">Best for</dt>
                      <dd className="text-gray-600 dark:text-gray-400">{pick.bestFor}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-700 dark:text-gray-300">Watch out</dt>
                      <dd className="text-gray-600 dark:text-gray-400">{pick.watch}</dd>
                    </div>
                  </dl>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
