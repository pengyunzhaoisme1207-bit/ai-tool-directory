import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'

export const metadata = genPageMetadata({
  title: 'Contact',
  description:
    'Contact AI Tool Directory for review corrections, tool submissions, partnership questions, and advertising inquiries.',
})

export default function ContactPage() {
  return (
    <article className="prose prose-gray dark:prose-invert mx-auto max-w-3xl">
      <h1>Contact AI Tool Directory</h1>
      <p>
        Have a correction, tool suggestion, partnership question, or advertising inquiry? Send a
        note to{' '}
        <a href="mailto:contact@next-happy.com" className="font-medium">
          contact@next-happy.com
        </a>
        .
      </p>

      <h2>What to Include</h2>
      <p>
        We can respond faster when your message includes the relevant tool name, website URL, and a
        short explanation of what you want us to review or update.
      </p>
      <ul>
        <li>
          <strong>Review corrections:</strong> link to the page and describe the outdated pricing,
          feature, policy, or model detail.
        </li>
        <li>
          <strong>Tool submissions:</strong> include the product URL, target users, pricing model,
          and what makes the tool meaningfully different.
        </li>
        <li>
          <strong>Partnerships or advertising:</strong> describe the campaign, placement request,
          and disclosure requirements.
        </li>
      </ul>

      <h2>Editorial Independence</h2>
      <p>
        We do not guarantee positive coverage or rankings in exchange for payment. Sponsored
        placements and affiliate relationships, when present, are disclosed clearly and do not
        override our review criteria.
      </p>

      <h2>Helpful Links</h2>
      <ul>
        <li>
          <Link href="/about">Learn about our review process</Link>
        </li>
        <li>
          <Link href="/privacy">Read our privacy policy</Link>
        </li>
        <li>
          <Link href="/terms">Review our terms of service</Link>
        </li>
      </ul>
    </article>
  )
}
