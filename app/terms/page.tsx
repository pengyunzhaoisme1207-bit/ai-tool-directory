import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Terms of Service',
  description:
    'Review the terms for using Next Happy AI Tools, including content accuracy, third-party links, advertising disclosures, and affiliate transparency.',
  path: '/terms',
})

export default function TermsOfService() {
  return (
    <article className="prose prose-gray dark:prose-invert mx-auto max-w-3xl">
      <h1>Terms of Service</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: May 11, 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using Next Happy AI Tools (<strong>www.next-happy.com</strong>), you accept
        and agree to be bound by these Terms of Service. If you do not agree to these terms, please
        do not use the Site.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        AI Tool Directory provides curated reviews, comparisons, and analysis of artificial
        intelligence tools and services. Our content includes written reviews, feature comparisons,
        pricing information, and recommendations to help users find the right AI tools for their
        needs.
      </p>

      <h2>3. Content Accuracy</h2>
      <p>
        We strive to provide accurate and up-to-date information. However, AI tools and their
        features, pricing, and availability change frequently. We make no guarantees regarding the
        accuracy, completeness, or timeliness of the information presented on this Site.
      </p>
      <p>
        Pricing information, feature descriptions, and availability details are subject to change.
        We recommend verifying any information directly with the AI tool provider before making a
        purchasing decision.
      </p>

      <h2>4. Affiliate Disclosure</h2>
      <p>
        Some links on this Site may be affiliate links. If you click on an affiliate link and make a
        purchase, we may receive a commission at no additional cost to you. This helps support our
        independent reviews and content creation. We only recommend tools we genuinely believe will
        provide value to our readers.
      </p>

      <h2>5. Advertisements</h2>
      <p>
        This Site displays advertisements, including but not limited to Google AdSense. These ads
        are served by third-party advertising networks and may use cookies to deliver relevant
        content based on your browsing habits. By using this Site, you consent to the use of such
        advertising technologies.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All content on this Site, including but not limited to text, graphics, logos, images, and
        software, is the property of AI Tool Directory or its content suppliers and is protected by
        intellectual property laws. Unauthorized reproduction or distribution is prohibited.
      </p>

      <h2>7. User Conduct</h2>
      <p>You agree to use this Site only for lawful purposes. You may not:</p>
      <ul>
        <li>Attempt to gain unauthorized access to any portion of the Site</li>
        <li>Use the Site to distribute spam or malicious content</li>
        <li>Scrape or data-mine content from the Site without permission</li>
        <li>Interfere with the proper working of the Site</li>
      </ul>

      <h2>8. Third-Party Links</h2>
      <p>
        This Site contains links to third-party websites. We are not responsible for the content,
        accuracy, or practices of those sites. We provide these links for your convenience and
        reference. Accessing linked third-party sites is at your own risk.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, AI Tool Directory shall not be liable for any
        direct, indirect, incidental, consequential, or punitive damages arising out of or relating
        to your use of the Site or reliance on any information provided herein.
      </p>

      <h2>10. Changes to Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. Changes will be effective
        immediately upon posting to the Site. Your continued use of the Site after changes
        constitutes acceptance of the updated Terms.
      </p>

      <h2>11. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with applicable laws, without
        regard to conflict of law principles.
      </p>

      <h2>12. Contact</h2>
      <p>
        If you have questions about these Terms, please contact us at:{' '}
        <a href="mailto:contact@next-happy.com">contact@next-happy.com</a>
      </p>
    </article>
  )
}
