import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Advertising and Affiliate Disclosure',
  description:
    'Read how Next Happy AI Tools handles affiliate links, advertising, sponsorship disclosure, and editorial independence.',
  path: '/disclosure',
})

export default function DisclosurePage() {
  return (
    <article className="mx-auto max-w-5xl">
      <header className="mb-8 rounded-2xl border border-gray-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_50%,#eef6ff_100%)] p-6 shadow-sm dark:border-gray-800 dark:bg-[linear-gradient(135deg,#020617_0%,#111827_55%,#0f172a_100%)]">
        <p className="text-xs font-semibold tracking-wide text-blue-700 uppercase dark:text-blue-400">
          Disclosure
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Advertising and Affiliate Disclosure
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">
          How Next Happy AI Tools handles affiliate links, ads, sponsored relationships, and
          editorial independence.
        </p>
      </header>

      <section className="mb-8 grid gap-3 md:grid-cols-4">
        {[
          ['Affiliate links', 'Some outbound links may earn a commission.'],
          ['Advertising', 'Google AdSense and future ads may appear on the site.'],
          ['No paid verdicts', 'Payments do not guarantee favorable rankings or reviews.'],
          ['Transparency', 'We try to disclose free access or material support when relevant.'],
        ].map(([title, body]) => (
          <div
            key={title}
            className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950"
          >
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{body}</p>
          </div>
        ))}
      </section>

      <div className="prose prose-gray dark:prose-invert mx-auto max-w-3xl">
        <h2>Affiliate links</h2>
        <p>
          Some outbound links to AI tools, software providers, or services may become affiliate
          links. If a reader clicks a qualifying link and later purchases a product, we may earn a
          commission at no additional cost to the reader.
        </p>
        <p>
          Affiliate relationships help fund site operations, research time, and ongoing content
          updates. They do not guarantee inclusion, ranking, positive framing, or a higher rating.
        </p>

        <h2>Advertising</h2>
        <p>
          Next Happy AI Tools may display advertising, including Google AdSense. Ads are shown to
          support the site and may use cookies or related technologies as described in the{' '}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>
          Advertising placement is kept separate from editorial judgment. We do not sell review
          verdicts, rankings, or “best tool” positions.
        </p>

        <h2>Sponsored relationships</h2>
        <p>
          In some cases a vendor may provide temporary access, a free account, or other review
          support so we can evaluate a product more accurately. When that materially affects how a
          page was produced, we aim to disclose it on the relevant page.
        </p>

        <h2>Editorial independence</h2>
        <p>
          Our reviews are based on workflow fit, output quality, pricing fairness, usability,
          privacy signals, and comparison context. Commercial relationships do not override those
          criteria.
        </p>

        <h2>Questions</h2>
        <p>
          If you have questions about advertising, affiliate links, or disclosure practices, contact{' '}
          <a href="mailto:contact@next-happy.com">contact@next-happy.com</a>.
        </p>
      </div>
    </article>
  )
}
