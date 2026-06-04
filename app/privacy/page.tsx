import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Privacy Policy',
  description:
    'Read how Next Happy AI Tools handles cookies, analytics, Google AdSense advertising, third-party links, and privacy choices for site visitors.',
  path: '/privacy',
})

export default function PrivacyPolicy() {
  return (
    <article className="prose prose-gray dark:prose-invert mx-auto max-w-3xl">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: May 11, 2026</p>

      <h2>1. Introduction</h2>
      <p>
        AI Tool Directory ("we", "our", or "us") is committed to protecting your privacy. This
        Privacy Policy explains how we collect, use, disclose, and safeguard your information when
        you visit our website <strong>www.next-happy.com</strong>.
      </p>
      <p>
        By accessing or using the Site, you agree to the terms of this Privacy Policy. If you do not
        agree with the terms, please do not access the Site.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        <strong>Automatically Collected Information:</strong> When you visit our Site, certain
        information is collected automatically, including:
      </p>
      <ul>
        <li>IP address</li>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Referring website</li>
        <li>Pages visited and time spent on pages</li>
        <li>Date and time of visits</li>
      </ul>
      <p>
        We do not collect personal information such as names, email addresses, or phone numbers
        unless you voluntarily provide them (e.g., through a contact form).
      </p>

      <h2>3. Cookies and Tracking</h2>
      <p>
        We use cookies and similar tracking technologies to enhance your browsing experience and
        analyze site traffic. Cookies are small data files stored on your device.
      </p>
      <p>You can control cookies through your browser settings. Most browsers allow you to:</p>
      <ul>
        <li>Refuse or accept cookies</li>
        <li>Delete existing cookies</li>
        <li>Notify you when a cookie is set</li>
      </ul>
      <p>
        Please note that disabling cookies may affect the functionality of certain features on the
        Site.
      </p>

      <h2>4. Third-Party Advertising — Google AdSense</h2>
      <p>
        We use Google AdSense, a service provided by Google LLC, to display advertisements on our
        Site. Google AdSense uses cookies and web beacons to serve ads based on your browsing
        behavior and interests.
      </p>
      <p>
        Google, as a third-party vendor, uses cookies to serve ads on our Site. Google's use of the
        DART cookie enables it to serve ads to our users based on their visit to our Site and other
        sites on the Internet.
      </p>
      <p>
        You may opt out of the use of the DART cookie by visiting the{' '}
        <a href="https://www.google.com/privacy/ads/" target="_blank" rel="noopener noreferrer">
          Google Privacy &amp; Terms page
        </a>
        .
      </p>
      <p>Google AdSense may also use the following technologies:</p>
      <ul>
        <li>
          <strong>DoubleClick Cookie</strong> — helps Google and its partners serve ads based on
          visits to our Site and other websites.
        </li>
        <li>
          <strong>Web Beacons</strong> — transparent pixel images used to track user navigation and
          measure ad effectiveness.
        </li>
      </ul>

      <h2>5. How We Use Your Information</h2>
      <p>The information we collect is used to:</p>
      <ul>
        <li>Operate and maintain the Site</li>
        <li>Improve user experience and content</li>
        <li>Analyze site usage and trends</li>
        <li>Serve relevant advertisements through Google AdSense</li>
        <li>Monitor and prevent technical issues</li>
      </ul>

      <h2>6. Third-Party Links and Services</h2>
      <p>
        Our Site may contain links to third-party websites, including AI tool websites we review. We
        are not responsible for the privacy practices of those sites. We encourage you to read the
        privacy policies of any third-party site before providing personal information.
      </p>

      <h2>7. Advertising Partners</h2>
      <p>
        Our advertising partner, Google AdSense, may collect and use information about your visits
        to this and other websites to provide relevant advertisements. Google is a third-party ad
        server that uses cookies and web beacons to collect data automatically.
      </p>
      <p>
        Google's advertising policies can be found at{' '}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ads Policies
        </a>
        .
      </p>
      <p>
        You can also learn how Google uses information from sites and apps that use Google services
        at{' '}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google&apos;s partner sites policy page
        </a>
        .
      </p>

      <h2>8. Data Retention</h2>
      <p>
        We retain automatically collected information for as long as necessary to fulfill the
        purposes described in this policy. Cookie data is stored for the duration specified by the
        respective third-party service.
      </p>

      <h2>9. Children's Privacy</h2>
      <p>
        Our Site is not directed to children under the age of 13. We do not knowingly collect
        personal information from children under 13. If we become aware that we have inadvertently
        collected such information, we will take steps to delete it.
      </p>

      <h2>10. Your Rights</h2>
      <p>
        Depending on your location, you may have certain rights regarding your personal data,
        including:
      </p>
      <ul>
        <li>The right to access personal data we hold about you</li>
        <li>The right to rectification of inaccurate data</li>
        <li>The right to erasure ("right to be forgotten")</li>
        <li>The right to restrict processing of your data</li>
        <li>The right to data portability</li>
        <li>The right to object to processing of your data</li>
      </ul>
      <p>
        California residents have additional rights under the California Consumer Privacy Act
        (CCPA). European residents have additional rights under the General Data Protection
        Regulation (GDPR).
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes by
        posting the new Privacy Policy on this page with an updated "Last updated" date.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at:{' '}
        <a href="mailto:contact@next-happy.com">contact@next-happy.com</a>
      </p>
    </article>
  )
}
