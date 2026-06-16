import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Submit an AI Tool',
  description:
    'Submit an AI tool, pricing correction, feature update, or review request to Next Happy AI Tools.',
})

export default function SubmitPage() {
  return (
    <article className="mx-auto max-w-5xl">
      <header className="mb-8 rounded-2xl border border-gray-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_50%,#fefce8_100%)] p-6 shadow-sm dark:border-gray-800 dark:bg-[linear-gradient(135deg,#020617_0%,#111827_55%,#422006_100%)]">
        <p className="text-xs font-semibold tracking-wide text-amber-700 uppercase dark:text-amber-400">
          Submit updates
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Submit an AI Tool or Correction
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">
          We review AI products that help readers make better workflow decisions. Suggest a tool,
          correct an existing review, or share a major product update at{' '}
          <a href="mailto:contact@next-happy.com" className="font-medium text-blue-600">
            contact@next-happy.com
          </a>
          .
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">What to send</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
            <li>Product name and official URL.</li>
            <li>
              Primary category: coding, search, writing, image, video, audio, or productivity.
            </li>
            <li>Target users and the workflow the product improves.</li>
            <li>Pricing model and whether a free tier or trial exists.</li>
            <li>What makes the product meaningfully different from alternatives.</li>
            <li>Public documentation for privacy, licensing, API access, or commercial use.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            What we usually decline
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
            <li>Products with no public website or unclear access path.</li>
            <li>Landing pages that do not explain pricing, users, or product capabilities.</li>
            <li>Copycat tools with no clear difference from established alternatives.</li>
            <li>
              Requests that require positive coverage, guaranteed ratings, or hidden promotion.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/70">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Correction requests
        </h2>
        <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
          If an existing page is outdated, include the review URL, the exact claim that changed, and
          a source we can verify. Pricing, product availability, commercial rights, model access,
          and privacy policy changes are high-priority updates.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Review independence
        </h2>
        <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
          Submitting a tool does not guarantee coverage. Paid relationships, when present, do not
          guarantee positive placement or a higher rating. Our selection and scoring follow the{' '}
          <Link href="/editorial-policy" className="font-medium text-blue-600">
            editorial policy
          </Link>{' '}
          and{' '}
          <Link href="/projects" className="font-medium text-blue-600">
            review process
          </Link>
          .
        </p>
      </section>
    </article>
  )
}
