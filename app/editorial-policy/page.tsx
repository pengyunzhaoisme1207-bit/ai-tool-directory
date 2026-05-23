import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Editorial Policy',
  description:
    'How AI Tool Directory selects, reviews, updates, and discloses AI tool recommendations.',
})

export default function EditorialPolicyPage() {
  return (
    <article className="prose prose-gray dark:prose-invert mx-auto max-w-3xl">
      <h1>Editorial Policy</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: May 22, 2026</p>

      <p>
        AI Tool Directory exists to help readers choose practical AI tools for real workflows. We
        focus on decision quality: who a tool is for, what it does well, where it falls short, how
        pricing works, and what risks a user should check before adopting it.
      </p>

      <h2>How Tools Are Selected</h2>
      <p>We prioritize tools that meet at least one of these conditions:</p>
      <ul>
        <li>They solve a common workflow for developers, creators, researchers, or teams.</li>
        <li>They have clear pricing, a usable product surface, and enough public information.</li>
        <li>They are frequently compared with other tools readers already know.</li>
        <li>
          They introduce a meaningful category shift, integration, model, or workflow pattern.
        </li>
      </ul>
      <p>
        We do not add a product simply because it is new. Tools with vague claims, unclear access,
        no public product information, or no obvious user value may be skipped until they mature.
      </p>

      <h2>Review Method</h2>
      <p>Each review is structured around practical questions:</p>
      <ul>
        <li>What job does this tool help a user complete?</li>
        <li>Who should use it, and who should skip it?</li>
        <li>How does pricing change the recommendation?</li>
        <li>What privacy, licensing, or commercial-use risks should be checked?</li>
        <li>Which alternatives should a reader compare before deciding?</li>
      </ul>
      <p>
        We use public product documentation, available pricing pages, product experience when
        accessible, and comparison against similar tools. When information changes quickly, we
        encourage readers to verify final pricing and legal terms with the official provider.
      </p>

      <h2>Ratings</h2>
      <p>
        Ratings are editorial judgments, not user-review averages. We consider output quality,
        usability, feature depth, pricing fairness, workflow fit, privacy signals, and ecosystem
        integration. A high rating does not mean a tool is right for every reader; it means the tool
        performs strongly for its intended use case.
      </p>

      <h2>Updates and Corrections</h2>
      <p>
        AI tools change frequently. We update pages when pricing, model access, major features,
        licensing, or product positioning changes. If you find an outdated claim, send the page URL,
        the corrected information, and a source to{' '}
        <a href="mailto:contact@next-happy.com">contact@next-happy.com</a>.
      </p>

      <h2>Affiliate and Advertising Disclosure</h2>
      <p>
        Some outbound links may become affiliate links. Affiliate relationships do not guarantee
        inclusion, ranking, positive coverage, or a higher rating. Advertising and affiliate revenue
        help support the site, but review conclusions are based on editorial criteria.
      </p>

      <h2>Useful Links</h2>
      <ul>
        <li>
          <Link href="/projects">Review process and scoring criteria</Link>
        </li>
        <li>
          <Link href="/submit">Submit a tool or correction</Link>
        </li>
        <li>
          <Link href="/privacy">Privacy policy</Link>
        </li>
        <li>
          <Link href="/terms">Terms of service</Link>
        </li>
      </ul>
    </article>
  )
}
