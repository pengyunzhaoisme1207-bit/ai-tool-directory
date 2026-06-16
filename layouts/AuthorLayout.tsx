import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import Link from '@/components/Link'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8">
          <section className="rounded-2xl border border-gray-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_46%,#eef6ff_100%)] p-6 shadow-sm dark:border-gray-800 dark:bg-[linear-gradient(135deg,#020617_0%,#111827_55%,#0f172a_100%)]">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
              <div>
                <p className="text-xs font-bold tracking-wide text-blue-600 uppercase dark:text-blue-400">
                  About the editorial team
                </p>
                <h1 className="mt-2 text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
                  Independent AI tool reviews for practical decisions.
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">
                  Next Happy AI Tools reviews software through workflow fit, pricing reality,
                  privacy signals, and comparison context. The goal is to help readers choose tools
                  they can actually use, not chase every launch headline.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
                <h2 className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Trust signals
                </h2>
                <div className="mt-4 grid gap-3">
                  {[
                    ['Editorial method', 'Published review criteria and scoring process.'],
                    ['Corrections path', 'Public contact channel for pricing and feature updates.'],
                    [
                      'Disclosure pages',
                      'Privacy, terms, advertising, and affiliate transparency.',
                    ],
                    ['Update loop', 'Weekly briefs and visible updated dates on key content.'],
                  ].map(([label, note]) => (
                    <div
                      key={label}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {label}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0 xl:gap-x-8">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="x" href={twitter} />
              <SocialIcon kind="bluesky" href={bluesky} />
            </div>
            <div className="mt-8 grid w-full gap-2">
              {[
                { href: '/projects', label: 'Review Process' },
                { href: '/editorial-policy', label: 'Editorial Policy' },
                { href: '/contact', label: 'Contact' },
                { href: '/submit', label: 'Submit Updates' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:text-blue-700 dark:border-gray-800 dark:text-gray-300 dark:hover:border-blue-700 dark:hover:text-blue-400"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
