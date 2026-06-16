import Image from './Image'

type ScreenshotFigureProps = {
  src: string
  alt: string
  caption: string
  source?: string
}

export function ScreenshotFigure({ src, alt, caption, source }: ScreenshotFigureProps) {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="border-b border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-2 truncate text-xs font-medium text-gray-500 dark:text-gray-400">
            {source || 'Official website snapshot'}
          </span>
        </div>
      </div>
      <Image src={src} alt={alt} width={1440} height={900} className="w-full object-cover" />
      <figcaption className="border-t border-gray-200 px-4 py-3 text-sm leading-6 text-gray-600 dark:border-gray-800 dark:text-gray-400">
        {caption}
      </figcaption>
    </figure>
  )
}

type ScoreRow = {
  label: string
  score: number
  note: string
}

const scoreRows: ScoreRow[] = [
  { label: 'Workflow fit', score: 5, note: 'Repeated job, clear owner, visible time saved' },
  {
    label: 'Output quality',
    score: 4,
    note: 'Reliable enough after review, not just impressive once',
  },
  { label: 'Ease of use', score: 4, note: 'Fast first value with limited setup debt' },
  { label: 'Pricing fairness', score: 3, note: 'Cost scales predictably with real usage' },
  {
    label: 'Privacy control',
    score: 4,
    note: 'Export, permissions, and data use are understandable',
  },
  { label: 'Ecosystem value', score: 5, note: 'Fits tools the team already uses every week' },
]

export function ScorecardVisual() {
  return (
    <section className="not-prose my-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
            Evaluation model
          </p>
          <h3 className="mt-1 text-xl font-bold text-gray-950 dark:text-gray-50">
            Six signals before an AI tool makes the shortlist
          </h3>
        </div>
        <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-900 dark:text-gray-300">
          25 / 30 example score
        </div>
      </div>
      <div className="space-y-4">
        {scoreRows.map((row) => (
          <div
            key={row.label}
            className="grid gap-2 md:grid-cols-[150px_1fr_220px] md:items-center"
          >
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {row.label}
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
                style={{ width: `${(row.score / 5) * 100}%` }}
              />
            </div>
            <div className="text-sm leading-5 text-gray-600 dark:text-gray-400">{row.note}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

const workflowSteps = [
  ['Workflow', 'Define the exact task and owner'],
  ['Access', 'Limit files, tools, APIs, and write permissions'],
  ['Approval', 'Require human review before high-impact actions'],
  ['Trace', 'Keep logs, sources, diffs, and failure states'],
  ['Scale', 'Expand only after the pilot is repeatable'],
]

export function AgentWorkflowVisual() {
  return (
    <section className="not-prose my-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-950">
      <p className="text-xs font-semibold tracking-wide text-emerald-700 uppercase dark:text-emerald-400">
        Agent platform buying path
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {workflowSteps.map(([title, note], index) => (
          <div
            key={title}
            className="relative rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              {index + 1}
            </div>
            <h3 className="text-base font-bold text-gray-950 dark:text-gray-50">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const platformCards = [
  ['OpenAI', 'Builder migration', 'Exportability and SDK path matter more than demo polish.'],
  ['Google', 'Model endpoint churn', 'Image, search, and API workflows need version tracking.'],
  ['Microsoft', 'Managed agent runtime', 'Identity, governance, and logs become buying criteria.'],
]

export function PlatformShiftVisual() {
  return (
    <section className="not-prose my-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="mb-5">
        <p className="text-xs font-semibold tracking-wide text-violet-600 uppercase dark:text-violet-400">
          Market signal map
        </p>
        <h3 className="mt-1 text-xl font-bold text-gray-950 dark:text-gray-50">
          AI tool decisions are becoming platform decisions
        </h3>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {platformCards.map(([name, signal, takeaway]) => (
          <div
            key={name}
            className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">{name}</div>
            <div className="mt-2 text-lg font-bold text-gray-950 dark:text-gray-50">{signal}</div>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{takeaway}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
