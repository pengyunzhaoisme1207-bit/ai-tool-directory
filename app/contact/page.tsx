import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'

export const metadata = genPageMetadata({
  title: 'Contact',
  description:
    'Contact Next Happy AI Tools for review corrections, tool submissions, partnership questions, and advertising inquiries.',
})

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-5xl">
      <header className="mb-8 rounded-2xl border border-gray-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_50%,#eef6ff_100%)] p-6 shadow-sm dark:border-gray-800 dark:bg-[linear-gradient(135deg,#020617_0%,#111827_55%,#0f172a_100%)]">
        <p className="text-xs font-semibold tracking-wide text-blue-700 uppercase dark:text-blue-400">
          Contact
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Contact Next Happy AI Tools
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">
          Send review corrections, tool suggestions, partnership questions, or advertising inquiries
          to{' '}
          <a href="mailto:contact@next-happy.com" className="font-medium text-blue-600">
            contact@next-happy.com
          </a>
          .
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: 'Review corrections',
            body: 'Send the page URL, the outdated claim, the corrected detail, and a source we can verify.',
          },
          {
            title: 'Tool submissions',
            body: 'Include the official URL, target users, pricing model, and what makes the product different.',
          },
          {
            title: 'Partnerships',
            body: 'Describe the campaign, placement request, disclosure needs, and any timing requirements.',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950"
          >
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Editorial independence
        </h2>
        <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
          We do not guarantee positive coverage or rankings in exchange for payment. Sponsored
          placements and affiliate relationships, when present, are disclosed clearly and do not
          override our review criteria.
        </p>
      </section>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { href: '/about', label: 'About the site' },
          { href: '/privacy', label: 'Privacy policy' },
          { href: '/terms', label: 'Terms of service' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
          >
            {item.label}
          </Link>
        ))}
      </section>
    </article>
  )
}
