import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Submit an AI Tool',
  description:
    'Submit an AI tool, pricing correction, feature update, or review request to AI Tool Directory.',
})

export default function SubmitPage() {
  return (
    <article className="prose prose-gray dark:prose-invert mx-auto max-w-3xl">
      <h1>Submit an AI Tool or Correction</h1>
      <p>
        We review AI products that help readers make better workflow decisions. If you want to
        suggest a tool, correct an existing review, or share a major product update, email{' '}
        <a href="mailto:contact@next-happy.com">contact@next-happy.com</a>.
      </p>

      <h2>What to Send</h2>
      <p>Helpful submissions include:</p>
      <ul>
        <li>Product name and official URL</li>
        <li>
          Primary category, such as coding, search, writing, image, video, audio, or productivity
        </li>
        <li>Target users and the workflow the product improves</li>
        <li>Pricing model and whether a free tier or trial exists</li>
        <li>What makes the product different from common alternatives</li>
        <li>Any public documentation for privacy, licensing, API access, or commercial use</li>
      </ul>

      <h2>What We Usually Decline</h2>
      <ul>
        <li>Products with no public website or unclear access path</li>
        <li>Landing pages that do not explain pricing, users, or product capabilities</li>
        <li>Copycat tools with no clear difference from established alternatives</li>
        <li>
          Requests that require positive coverage, a guaranteed rating, or undisclosed promotion
        </li>
      </ul>

      <h2>Correction Requests</h2>
      <p>
        If an existing page is outdated, include the review URL, the exact claim that changed, and a
        source we can verify. Pricing, product availability, commercial rights, model access, and
        privacy policy changes are high-priority updates.
      </p>

      <h2>Review Independence</h2>
      <p>
        Submitting a tool does not guarantee coverage. Paid relationships, when present, do not
        guarantee positive placement or a higher rating. Our selection and scoring follow the{' '}
        <Link href="/editorial-policy">editorial policy</Link> and{' '}
        <Link href="/projects">review process</Link>.
      </p>
    </article>
  )
}
