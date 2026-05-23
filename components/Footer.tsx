import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="x" href={siteMetadata.x} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div suppressHydrationWarning>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Independent editorial reviews, comparison guides, and weekly AI tool briefs for real-world
          workflows.
        </div>
        <div className="mb-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="/editorial-policy"
            className="hover:text-primary-500 dark:hover:text-primary-400"
          >
            Editorial Policy
          </Link>
          <Link href="/submit" className="hover:text-primary-500 dark:hover:text-primary-400">
            Submit a Tool
          </Link>
          <Link href="/categories" className="hover:text-primary-500 dark:hover:text-primary-400">
            Categories
          </Link>
          <Link href="/privacy" className="hover:text-primary-500 dark:hover:text-primary-400">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-primary-500 dark:hover:text-primary-400">
            Terms of Service
          </Link>
          <Link href="/about" className="hover:text-primary-500 dark:hover:text-primary-400">
            About
          </Link>
          <Link href="/contact" className="hover:text-primary-500 dark:hover:text-primary-400">
            Contact
          </Link>
          <a
            href={`mailto:${siteMetadata.email}`}
            className="hover:text-primary-500 dark:hover:text-primary-400"
          >
            {siteMetadata.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
