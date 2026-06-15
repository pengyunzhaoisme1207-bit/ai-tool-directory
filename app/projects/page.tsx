import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Our Review Process',
  description:
    'See how Next Happy AI Tools selects, tests, scores, updates, and discloses AI tool reviews before publishing recommendations.',
  path: '/projects',
})

export default function Projects() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Our Review Process
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          How we test, rate, and compare AI tools — so you can trust our recommendations.
        </p>
      </div>
      <div className="container py-12">
        <div className="prose prose-gray dark:prose-invert mx-auto max-w-none">
          <div className="not-prose mb-8 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/30">
            <h2 className="mt-0 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Editorial Notes
            </h2>
            <p className="mb-0 text-sm leading-6 text-gray-700 dark:text-gray-300">
              Our reviews are written to help readers choose between tools, not to maximize page
              count. When a product changes pricing, model access, licensing, or a major workflow,
              we update the relevant page and keep a visible trail of how we evaluate it.
            </p>
          </div>

          <h2>What We Review</h2>
          <p>We cover AI tools across six major categories:</p>

          <div className="not-prose my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Coding',
                desc: 'AI code editors, autocomplete, debugging, and code review tools.',
                examples: 'Cursor, GitHub Copilot, Continue',
              },
              {
                title: 'Search & Research',
                desc: 'AI-powered search engines and research assistants.',
                examples: 'Perplexity, Phind',
              },
              {
                title: 'Image & Video',
                desc: 'AI image generation, editing, and video creation tools.',
                examples: 'Midjourney, Adobe Firefly, Krea',
              },
              {
                title: 'Writing & Productivity',
                desc: 'AI writing assistants, document tools, and productivity enhancers.',
                examples: 'ChatGPT, Grok',
              },
              {
                title: 'Development Agents',
                desc: 'Autonomous AI agents that build, deploy, and debug applications.',
                examples: 'Replit Agent, V0, Codex',
              },
              {
                title: 'Infrastructure',
                desc: 'AI monitoring, observability, and infrastructure tools.',
                examples: 'Sentry Seer Agent',
              },
            ].map((cat) => (
              <div
                key={cat.title}
                className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
              >
                <h3 className="mt-0 text-lg font-semibold">{cat.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{cat.desc}</p>
                <p className="mb-0 text-xs text-gray-400 dark:text-gray-500">e.g. {cat.examples}</p>
              </div>
            ))}
          </div>

          <h2>How We Rate</h2>
          <p>Every tool receives a rating from 1 to 5, based on the following weighted criteria:</p>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Criterion</th>
                  <th className="px-4 py-3 font-semibold">Weight</th>
                  <th className="px-4 py-3 font-semibold">What We Evaluate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  [
                    'Output Quality',
                    '25%',
                    'Accuracy, relevance, and consistency of AI-generated results',
                  ],
                  [
                    'Ease of Use',
                    '20%',
                    'Onboarding experience, interface clarity, learning curve',
                  ],
                  ['Features', '15%', 'Depth and breadth of capabilities, unique differentiators'],
                  ['Performance', '15%', 'Speed, reliability, uptime, response time'],
                  ['Value for Money', '15%', 'Free tier usefulness, pricing fairness, ROI'],
                  ['Privacy & Security', '10%', 'Data handling, encryption, transparency'],
                ].map(([name, weight, desc]) => (
                  <tr key={name}>
                    <td className="px-4 py-3 font-medium">{name}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{weight}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Our Rating Scale</h2>
          <div className="not-prose my-8 space-y-3">
            {[
              {
                stars: '4.5 – 5.0',
                label: 'Excellent',
                desc: 'Best-in-class. We highly recommend this tool to anyone in its target category.',
              },
              {
                stars: '3.5 – 4.4',
                label: 'Great',
                desc: 'Strong tool with minor shortcomings. Worth trying, especially if it fits your specific needs.',
              },
              {
                stars: '2.5 – 3.4',
                label: 'Good',
                desc: 'Solid foundation with room to grow. Has notable strengths but also clear weaknesses.',
              },
              {
                stars: '1.5 – 2.4',
                label: 'Fair',
                desc: 'Interesting concept but significant gaps. May be worth watching as it matures.',
              },
              {
                stars: '1.0 – 1.4',
                label: 'Poor',
                desc: 'Major issues. We cannot recommend this tool in its current state.',
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-start gap-4 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700"
              >
                <span className="shrink-0 font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                  {row.stars}
                </span>
                <span className="shrink-0 font-semibold">{row.label}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{row.desc}</span>
              </div>
            ))}
          </div>

          <h2>How We Compare</h2>
          <p>
            Comparison articles pit two similar AI tools against each other across the same
            criteria. We use both tools for the same real-world tasks and report the results side by
            side. Comparisons are not about declaring a "winner" — they are about helping you
            understand the trade-offs so you can choose the tool that best fits <em>your</em>{' '}
            workflow.
          </p>

          <h2>How We Avoid Thin Directory Content</h2>
          <p>
            AI tool directories become low value when they only repeat vendor descriptions. Our
            editorial process is designed to avoid that. A listing must connect a tool to a real
            workflow, explain who should use it, describe pricing and adoption trade-offs, and link
            to related reviews, comparisons, or guides. If a product cannot be explained beyond its
            marketing tagline, it is not ready for a full recommendation page.
          </p>
          <p>
            We also separate tool discovery from tool evaluation. The homepage helps readers filter
            by category, pricing, and use case. Individual review pages explain the product in more
            depth. Guides cover broader buying decisions, such as how to adopt AI tools safely or
            how to evaluate agent platforms. Weekly briefs track market changes that may affect
            existing recommendations.
          </p>

          <div className="not-prose my-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <h3 className="mt-0 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Minimum quality bar before a page is published
            </h3>
            <ul className="mb-0 grid gap-2 text-sm leading-6 text-gray-700 md:grid-cols-2 dark:text-gray-300">
              <li>Clear target user and workflow fit.</li>
              <li>Pricing model or pricing uncertainty explained.</li>
              <li>At least one practical use case, not only features.</li>
              <li>Visible update date and editorial context.</li>
              <li>Relevant internal links to related tools or guides.</li>
              <li>Privacy, safety, licensing, or export concerns noted when relevant.</li>
            </ul>
          </div>

          <h2>What We Test Before Publishing</h2>
          <p>
            A review is not published from a product homepage alone. Before a tool receives a full
            page, we check the onboarding path, the free or trial experience when available, the
            core output quality for at least one realistic task, pricing clarity, export options,
            privacy signals, and whether a user can reasonably understand the product without a
            sales call. If a product cannot be evaluated from public information, we mark that
            limitation in the review instead of filling the page with marketing claims.
          </p>

          <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
            {[
              {
                title: 'Workflow fit',
                desc: 'Who should use this tool, what task it improves, and what existing workflow it replaces or supports.',
              },
              {
                title: 'Usability evidence',
                desc: 'How quickly a new user can reach a useful result, where setup becomes confusing, and which features require paid access.',
              },
              {
                title: 'Commercial readiness',
                desc: 'Whether pricing, licensing, export rights, collaboration, and admin controls are clear enough for business use.',
              },
              {
                title: 'Risk and limits',
                desc: 'Privacy concerns, reliability gaps, model limits, vague claims, or legal uncertainty that should affect the buying decision.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
              >
                <h3 className="mt-0 text-lg font-semibold">{item.title}</h3>
                <p className="mb-0 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <h2>Why Some Popular Tools Score Lower</h2>
          <p>
            Popularity is not the same as fit. Some tools generate impressive demos but have weak
            export controls, unclear rights, high per-seat pricing, or poor predictability on
            repeated tasks. Others are excellent for specialists but frustrating for casual users.
            Our ratings intentionally separate raw capability from practical value so readers can
            choose based on their own constraints.
          </p>

          <h2>Update Cadence</h2>
          <p>
            AI products change quickly, so each review includes a publication date and, when
            relevant, a last-updated field. We prioritize updates when a tool changes pricing,
            launches a major model integration, adds or removes a free plan, changes data retention
            terms, or becomes meaningfully stronger or weaker compared with alternatives. Weekly AI
            Brief pages are used to capture broader market changes that may affect several reviews
            at once.
          </p>

          <h2>Transparency</h2>
          <p>
            We purchase our own licenses for the tools we review whenever possible. When a tool
            provides us with free access for review purposes, we disclose it in the review. Our
            ratings and opinions are never influenced by tool developers — we maintain full
            editorial independence.
          </p>
          <p>
            Some links on this site may be affiliate links. If you click through and make a
            purchase, we may earn a small commission at no extra cost to you.
          </p>
        </div>
      </div>
    </div>
  )
}
