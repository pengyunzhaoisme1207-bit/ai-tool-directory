'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import ToolCard from '@/components/ToolCard'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'
import Image from '@/components/Image'

type DirectoryPost = {
  slug: string
  path?: string
  title: string
  summary?: string
  date?: string
  tags?: string[]
  logo?: string
  pricing?: string
  targetUser?: string
  rating?: number
  category?: string
  mainFeatures?: string[]
  lastUpdated?: string
}

type HomeProps = {
  posts: DirectoryPost[]
  guides?: DirectoryPost[]
  briefs?: DirectoryPost[]
  comparisons?: DirectoryPost[]
}

const CATEGORIES = [
  { key: 'All', label: 'All', icon: 'grid' },
  { key: 'LLM', label: 'LLM', icon: 'chat' },
  { key: 'Image Gen', label: 'Image Gen', icon: 'image' },
  { key: 'Coding', label: 'Coding', icon: 'code' },
  { key: 'Productivity', label: 'Productivity', icon: 'sparkle' },
  { key: 'Video', label: 'Video', icon: 'video' },
  { key: 'Audio', label: 'Audio', icon: 'audio' },
  { key: 'Search', label: 'Search', icon: 'search' },
  { key: 'Design', label: 'Design', icon: 'palette' },
  { key: 'Writing', label: 'Writing', icon: 'pen' },
  { key: 'Creative', label: 'Creative', icon: 'wand' },
  { key: 'AI Agent', label: 'AI Agent', icon: 'robot' },
]

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  grid: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"
      />
    </svg>
  ),
  chat: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  ),
  image: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  code: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  sparkle: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  ),
  video: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  ),
  audio: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
      />
    </svg>
  ),
  search: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  palette: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  ),
  pen: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  ),
  wand: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225L5.69 16.026l1.076-3.11L13.684 8.1 20 5.166l-1.908 5.52L13.684 16.6zM3.126 13.285L5.69 16.026m11.236 5.646l-3.005-3.005m0 0l-2.51-5.336m-5.336 1.076L12 8.1l2.51 5.336M5.69 16.026L8.1 12l-2.41-4.026L3.126 13.285z"
      />
    </svg>
  ),
  robot: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
}

const PRICING_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'Free', label: 'Free' },
  { key: 'Freemium', label: 'Freemium' },
  { key: 'Paid', label: 'Paid' },
]

const sortByUpdated = (a: DirectoryPost, b: DirectoryPost) => {
  const aTime = new Date(a.lastUpdated || a.date || 0).getTime()
  const bTime = new Date(b.lastUpdated || b.date || 0).getTime()
  return bTime - aTime
}

const HOME_SCREENSHOTS = [
  {
    title: 'Claude Code',
    label: 'Terminal agent',
    src: '/static/images/screenshots/claude-code-official.png',
    href: '/blog/claude-code-review/',
  },
  {
    title: 'Cursor',
    label: 'AI coding workspace',
    src: '/static/images/screenshots/cursor-official.png',
    href: '/blog/cursor-review/',
  },
  {
    title: 'Microsoft Foundry',
    label: 'Agent runtime docs',
    src: '/static/images/screenshots/microsoft-foundry-agents.png',
    href: '/blog/ai-agent-platform-buying-guide-2026/',
  },
]

const REVIEW_SIGNALS = [
  ['Fit', 'Does it solve a repeated workflow?'],
  ['Quality', 'Is output reliable after review?'],
  ['Cost', 'Can pricing scale predictably?'],
  ['Control', 'Are privacy and permissions clear?'],
]

export default function Home({ posts, guides = [], briefs = [], comparisons = [] }: HomeProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activePricing, setActivePricing] = useState('all')

  const submitDirectorySearch = () => {
    const normalized = searchQuery.trim()
    if (!normalized) {
      router.push('/blog')
      return
    }
    router.push(`/blog?s=${encodeURIComponent(normalized)}`)
  }

  // Derive stats
  const totalTools = posts.length
  const freeCount = posts.filter((p) => p.pricing === 'Free').length
  const freemiumCount = posts.filter((p) => p.pricing === 'Freemium').length
  const categoryCount = useMemo(
    () => new Set(posts.map((p) => p.category).filter(Boolean)).size,
    [posts]
  )

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    posts.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1
      }
    })
    return counts
  }, [posts])

  // Top rated tools (rating >= 4.5)
  const topPicks = useMemo(
    () =>
      posts
        .filter((p) => p.rating && p.rating >= 4.5)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 3),
    [posts]
  )

  const featuredTools = useMemo(() => {
    const sorted = [...posts].sort(sortByUpdated)
    return sorted.slice(0, 6)
  }, [posts])

  const latestGuides = useMemo(() => [...guides].sort(sortByUpdated).slice(0, 2), [guides])
  const latestBriefs = useMemo(() => [...briefs].sort(sortByUpdated).slice(0, 2), [briefs])
  const latestComparisons = useMemo(
    () => [...comparisons].sort(sortByUpdated).slice(0, 3),
    [comparisons]
  )

  const editorialUpdates = useMemo(
    () =>
      [...guides, ...briefs, ...comparisons]
        .sort(sortByUpdated)
        .slice(0, 4)
        .map((item) => {
          const href = item.path ? `/${item.path}` : '#'
          const kind = briefs.some((post) => post.slug === item.slug)
            ? 'Brief'
            : comparisons.some((post) => post.slug === item.slug)
              ? 'Comparison'
              : 'Guide'
          return { ...item, href, kind }
        }),
    [briefs, comparisons, guides]
  )

  const latestUpdateLabel = useMemo(() => {
    const latest = [...guides, ...briefs, ...comparisons].sort(sortByUpdated)[0]
    return latest?.date
      ? new Date(latest.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'recently'
  }, [briefs, comparisons, guides])

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(q))) ||
        (post.summary && post.summary.toLowerCase().includes(q))

      const matchesCategory = activeCategory === 'All' || post.category === activeCategory
      const matchesPricing = activePricing === 'all' || post.pricing === activePricing

      return matchesSearch && matchesCategory && matchesPricing
    })
  }, [posts, searchQuery, activeCategory, activePricing])

  // Visible categories (All + categories that have tools)
  const visibleCategories = CATEGORIES.filter(
    (cat) => cat.key === 'All' || categoryCounts[cat.key] > 0
  )

  return (
    <>
      <section className="mb-6 rounded-2xl border border-gray-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_45%,#eff6ff_100%)] p-5 shadow-sm dark:border-gray-800 dark:bg-[linear-gradient(135deg,#020617_0%,#111827_50%,#0f172a_100%)]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)] lg:items-start">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
              Curated AI Tools Directory
            </div>
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl xl:text-5xl dark:text-gray-50">
                Independent AI tool reviews for real buying decisions.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400">
                Compare AI tools by workflow, pricing, privacy, model access, and practical fit.
                Every listing links to a deeper review, guide, brief, or comparison so readers can
                move from discovery to a confident decision.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                {totalTools} reviewed tools
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                {categoryCount} active categories
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                {guides.length + briefs.length + comparisons.length} editorial updates
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                Updated {latestUpdateLabel}
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                {freeCount + freemiumCount} free or freemium tools
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="grid grid-cols-3 gap-1 border-b border-gray-200 bg-gray-100 p-1 dark:border-gray-800 dark:bg-gray-900">
                {HOME_SCREENSHOTS.map((shot) => (
                  <Link key={shot.title} href={shot.href} className="group relative block">
                    <Image
                      src={shot.src}
                      alt={`${shot.title} official product screenshot`}
                      width={1440}
                      height={900}
                      className="aspect-[4/3] w-full rounded-lg object-cover object-top transition duration-200 group-hover:opacity-90"
                    />
                    <span className="absolute right-1 bottom-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      {shot.title}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="p-4">
                <div className="text-xs font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
                  Visual review library
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  Official snapshots and original scorecards are added to priority reviews so
                  readers can inspect product surfaces instead of reading plain text only.
                </p>
              </div>
            </div>
            <Link
              href="/projects"
              className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Score before ranking
                </div>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  4 signals
                </span>
              </div>
              <div className="grid gap-2">
                {REVIEW_SIGNALS.map(([label, note], index) => (
                  <div key={label} className="grid grid-cols-[64px_1fr] items-center gap-2">
                    <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      {label}
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
                        style={{ width: `${88 - index * 8}%` }}
                      />
                    </div>
                    <div className="col-span-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                      {note}
                    </div>
                  </div>
                ))}
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-8 grid items-start gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Browse the directory
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Search, filter, then jump into a reviewed tool.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Editorial archive
            </Link>
          </div>
          <form
            className="flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault()
              submitDirectorySearch()
            }}
          >
            <div className="relative flex-1">
              <svg
                className="absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search tools by name, tag, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pr-10 pl-10 text-sm text-gray-900 transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-600 dark:focus:ring-blue-900/30"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('All')
                    setActivePricing('all')
                  }}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                  aria-label="Clear search"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-gray-900 px-4 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Search
            </button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            {PRICING_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActivePricing(f.key)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  activePricing === f.key
                    ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {visibleCategories.slice(1, 9).map((cat) => {
              const count = categoryCounts[cat.key] || 0
              const isActive = activeCategory === cat.key
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key)
                    setSearchQuery('')
                  }}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-xs font-semibold transition ${
                    isActive
                      ? 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-gray-700'
                  }`}
                >
                  <span className="truncate">{cat.label}</span>
                  <span className={isActive ? 'text-blue-500' : 'text-gray-400'}>{count}</span>
                </button>
              )
            })}
          </div>
          <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-800">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Editor picks
                </h3>
              </div>
              <Link
                href="/blog"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                All reviews
              </Link>
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              {topPicks.slice(0, 3).map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/${post.path}`}
                  className={`group rounded-lg border p-3 transition hover:-translate-y-0.5 hover:shadow-sm ${
                    index === 0
                      ? 'border-sky-200 bg-sky-50/80 dark:border-sky-900/50 dark:bg-sky-950/40'
                      : index === 1
                        ? 'border-amber-200 bg-amber-50/80 dark:border-amber-900/50 dark:bg-amber-950/40'
                        : 'border-rose-200 bg-rose-50/80 dark:border-rose-900/50 dark:bg-rose-950/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {post.logo ? (
                      <Image
                        src={post.logo}
                        alt=""
                        width={28}
                        height={28}
                        className="h-7 w-7 rounded-lg object-contain"
                      />
                    ) : (
                      <div className="h-7 w-7 rounded-lg bg-white/80 ring-1 ring-black/5 ring-inset dark:bg-white/10" />
                    )}
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-gray-900 group-hover:text-blue-700 dark:text-gray-100 dark:group-hover:text-blue-300">
                        {post.title}
                      </div>
                      <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                        {post.category}
                        {post.rating ? ` · ${post.rating}/5` : ''}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Fresh updates
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                New guides, comparisons, and AI Briefs. Latest update: {latestUpdateLabel}.
              </p>
            </div>
            <Link
              href="/brief"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              AI Brief
            </Link>
          </div>
          <div className="mt-4 grid gap-2">
            {editorialUpdates.slice(0, 6).map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="group grid grid-cols-[74px_minmax(0,1fr)] gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition hover:border-blue-300 hover:bg-white dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700 dark:hover:bg-gray-950"
              >
                <div>
                  <span className="rounded-md bg-white px-2 py-1 text-[11px] font-bold tracking-wide text-gray-600 uppercase ring-1 ring-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:ring-gray-800">
                    {item.kind}
                  </span>
                  <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                    {item.date
                      ? new Date(item.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      : ''}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="line-clamp-1 text-sm font-semibold text-gray-900 group-hover:text-blue-700 dark:text-gray-100 dark:group-hover:text-blue-400">
                    {item.title}
                  </div>
                  <div className="mt-1 line-clamp-2 text-xs leading-5 text-gray-600 dark:text-gray-400">
                    {item.summary}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Featured tools
          </h2>
          <div className="mt-4 space-y-3">
            {featuredTools.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/${post.path}`}
                className="flex items-start gap-3 rounded-xl border border-gray-100 p-3 transition hover:border-blue-300 hover:bg-blue-50 dark:border-gray-800 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
              >
                {post.logo && (
                  <Image
                    src={post.logo}
                    alt=""
                    width={28}
                    height={28}
                    className="mt-0.5 h-7 w-7 rounded-lg object-contain"
                  />
                )}
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                    {post.title}
                  </div>
                  <div className="mt-1 line-clamp-2 text-xs leading-5 text-gray-600 dark:text-gray-400">
                    {post.summary}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-white to-amber-50/70 p-5 shadow-sm dark:border-amber-900/40 dark:from-slate-950 dark:to-amber-950/20">
          <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Latest guide
          </h2>
          <div className="mt-4 space-y-3">
            {latestGuides.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.path}`}
                className="block rounded-xl border border-gray-100 p-3 transition hover:border-blue-300 hover:bg-blue-50 dark:border-gray-800 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {post.title}
                </div>
                <div className="mt-2 line-clamp-3 text-xs leading-5 text-gray-600 dark:text-gray-400">
                  {post.summary}
                </div>
              </Link>
            ))}
            <Link
              href="/blog"
              className="block rounded-xl border border-dashed border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-600 hover:border-blue-300 hover:text-blue-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-400"
            >
              View all guides
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-sky-200 bg-gradient-to-br from-white to-sky-50/70 p-5 shadow-sm dark:border-sky-900/40 dark:from-slate-950 dark:to-sky-950/20">
          <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Latest brief
          </h2>
          <div className="mt-4 space-y-3">
            {latestBriefs.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.path}`}
                className="block rounded-xl border border-gray-100 p-3 transition hover:border-blue-300 hover:bg-blue-50 dark:border-gray-800 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {post.title}
                </div>
                <div className="mt-2 line-clamp-3 text-xs leading-5 text-gray-600 dark:text-gray-400">
                  {post.summary}
                </div>
              </Link>
            ))}
            <Link
              href="/brief"
              className="block rounded-xl border border-dashed border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-600 hover:border-blue-300 hover:text-blue-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-400"
            >
              View all briefs
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-rose-200 bg-gradient-to-br from-white to-rose-50/70 p-5 shadow-sm dark:border-rose-900/40 dark:from-slate-950 dark:to-rose-950/20">
          <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Popular comparisons
          </h2>
          <div className="mt-4 space-y-3">
            {latestComparisons.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.path}`}
                className="block rounded-xl border border-gray-100 p-3 transition hover:border-blue-300 hover:bg-blue-50 dark:border-gray-800 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {post.title}
                </div>
                <div className="mt-2 line-clamp-3 text-xs leading-5 text-gray-600 dark:text-gray-400">
                  {post.summary}
                </div>
              </Link>
            ))}
            <Link
              href="/blog"
              className="block rounded-xl border border-dashed border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-600 hover:border-blue-300 hover:text-blue-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-400"
            >
              View all comparisons
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Product surfaces
            </p>
            <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Screenshots make the reviews easier to verify.
            </h2>
            <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
              For open source projects, developer tools, and public AI products, we add official
              website snapshots alongside original notes. They help readers see the real product
              surface, while the written review explains workflow fit, pricing, privacy, and risk.
            </p>
          </div>
          <Link
            href="/blog/ai-tool-evaluation-scorecard-2026"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Read the visual review framework
          </Link>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {HOME_SCREENSHOTS.map((shot) => (
            <Link
              key={shot.title}
              href={shot.href}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
            >
              <div className="border-b border-gray-200 bg-gray-100 p-2 dark:border-gray-800 dark:bg-gray-950">
                <Image
                  src={shot.src}
                  alt={`${shot.title} official screenshot`}
                  width={1440}
                  height={900}
                  className="aspect-[16/10] w-full rounded-lg object-cover object-top"
                />
              </div>
              <div className="p-4">
                <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  {shot.label}
                </div>
                <h3 className="mt-1 text-sm font-semibold text-gray-900 group-hover:text-blue-700 dark:text-gray-100 dark:group-hover:text-blue-300">
                  {shot.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/60">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              A directory is useful only when it helps people choose.
            </h2>
            <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
              Next Happy AI Tools combines a searchable directory with long-form reviews, buyer
              guides, comparisons, and weekly market briefs. The goal is not to list every launch.
              The goal is to explain which tools are useful, who should use them, what they cost,
              and what risks to check before adopting them.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog/ai-agent-platform-buying-guide-2026"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Read the agent buying guide
            </Link>
            <Link
              href="/submit"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Submit a tool update
            </Link>
            <Link
              href="/blog/ai-tool-evaluation-scorecard-2026"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Use the scorecard
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Decision map
            </p>
            <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              We map each tool to the decision a reader actually needs to make.
            </h2>
            <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
              Thin directories stop at a logo and a link. Next Happy adds context: what workflow the
              tool serves, where pricing gets complicated, whether data controls are visible, and
              which alternatives deserve comparison.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: 'Workflow fit',
                body: 'Use case, audience, setup effort, and daily adoption friction.',
                tone: 'border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/30',
              },
              {
                title: 'Model and output',
                body: 'Model access, source handling, speed, quality, and repeatability.',
                tone: 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30',
              },
              {
                title: 'Pricing reality',
                body: 'Free limits, credits, seats, overages, and business-plan gates.',
                tone: 'border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30',
              },
              {
                title: 'Privacy and control',
                body: 'Data use, export, permissions, admin settings, and review logs.',
                tone: 'border-rose-200 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-950/30',
              },
            ].map((item) => (
              <div key={item.title} className={`rounded-xl border p-4 ${item.tone}`}>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Scene-based shortlists
            </p>
            <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Start with the job, not the logo.
            </h2>
            <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
              Professional directory sites work best when readers can jump from a real problem to a
              credible shortlist. These links do that without making the homepage feel crowded.
            </p>
          </div>
          <Link
            href="/best-ai-tools"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            View all shortlists
          </Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {[
            {
              title: 'Coding',
              body: 'Code editors, agents, and review tools for repo-level work.',
              href: '/best-ai-tools',
            },
            {
              title: 'Research',
              body: 'Search and answer tools that surface sources and citations.',
              href: '/blog/perplexity-review/',
            },
            {
              title: 'Writing',
              body: 'Drafting and editing tools for content, docs, and brand voice.',
              href: '/blog/notion-ai-review/',
            },
            {
              title: 'Images & Video',
              body: 'Creative tools for production visuals, clips, and campaign assets.',
              href: '/blog/midjourney-review/',
            },
            {
              title: 'Teams',
              body: 'Rollout-ready tools with controls, pricing, and collaboration fit.',
              href: '/blog/ai-tool-adoption-checklist-for-teams/',
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:border-blue-300 hover:bg-blue-50 dark:border-gray-800 dark:bg-gray-900/70 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Editorially reviewed, not auto-generated
            </h2>
            <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
              We publish hands-on AI tool reviews, comparison articles, and weekly briefs. Each page
              is written for people deciding what to use in real workflows, with pricing, target
              user fit, privacy notes, and update dates kept visible.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { href: '/about', label: 'About' },
              { href: '/projects', label: 'Review Process' },
              { href: '/privacy', label: 'Privacy' },
              { href: '/contact', label: 'Contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-gray-700 dark:text-gray-300 dark:hover:border-blue-700 dark:hover:text-blue-400"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-3 border-t border-gray-200 pt-5 md:grid-cols-3 dark:border-gray-800">
          {[
            {
              title: 'Independent review policy',
              body: 'Ratings and rankings are based on workflow fit, usability, pricing, risk, and update history rather than paid placement.',
              href: '/editorial-policy',
            },
            {
              title: 'Privacy and advertising disclosure',
              body: 'The privacy policy explains cookies, analytics, Google AdSense, third-party links, and user choices in one public page.',
              href: '/privacy',
            },
            {
              title: 'Corrections are welcome',
              body: 'Every product page has a path for pricing, feature, licensing, and privacy corrections through the contact channel.',
              href: '/contact',
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-blue-300 hover:bg-blue-50 dark:border-gray-800 dark:bg-gray-900/70 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Directory layout: categories + content + decision sidebar */}
      <div className="grid gap-5 xl:grid-cols-[220px_minmax(0,1fr)_300px]">
        {/* Sidebar — Category Navigation */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <h2 className="mb-3 px-2 text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Categories
              </h2>
              <nav className="space-y-0.5">
                {visibleCategories.map((cat) => {
                  const count = cat.key === 'All' ? totalTools : categoryCounts[cat.key] || 0
                  const isActive = activeCategory === cat.key
                  return (
                    <button
                      key={cat.key}
                      onClick={() => {
                        setActiveCategory(cat.key)
                        setActivePricing('all')
                        setSearchQuery('')
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors duration-150 ${
                        isActive
                          ? 'bg-blue-50 font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                      >
                        {CATEGORY_ICONS[cat.icon]}
                      </span>
                      <span className="flex-1 truncate">{cat.label}</span>
                      <span
                        className={`text-xs tabular-nums ${
                          isActive
                            ? 'text-blue-500 dark:text-blue-400'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <div className="min-w-0">
          {/* Mobile category scroll */}
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {visibleCategories.map((cat) => {
              const count = cat.key === 'All' ? totalTools : categoryCounts[cat.key] || 0
              const isActive = activeCategory === cat.key
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key)
                    setActivePricing('all')
                    setSearchQuery('')
                  }}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
                  {CATEGORY_ICONS[cat.icon]}
                  <span>{cat.label}</span>
                  <span className={isActive ? 'text-blue-200' : 'text-gray-400'}>{count}</span>
                </button>
              )
            })}
          </div>

          {/* Top Rated Picks */}
          {topPicks.length > 0 && activeCategory === 'All' && !searchQuery && (
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h2 className="text-sm font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Top Rated Picks
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {topPicks.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/${post.path}`}
                    className="group rounded-xl border border-gray-100 bg-gradient-to-br from-yellow-50 to-amber-50 px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:from-gray-900 dark:to-gray-800"
                  >
                    <div className="flex items-center gap-2.5">
                      {post.logo && (
                        <Image
                          src={post.logo}
                          alt=""
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-lg object-contain"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-semibold text-gray-900 dark:text-gray-100">
                          {post.title}
                        </div>
                        <div className="flex items-center gap-0.5 text-xs text-yellow-600 dark:text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-3 w-3 ${i < Math.floor(post.rating ?? 0) ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-700'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 font-medium">{post.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Decision paths */}
          {activeCategory === 'All' && !searchQuery && activePricing === 'all' && (
            <section className="mb-8 space-y-5 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/60">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
                    Start with a Use Case
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    Pick the workflow you are trying to improve, then compare tools by cost,
                    privacy, model quality, and how much setup they require. We do not treat every
                    popular launch as a recommendation; a tool only stays in the directory when it
                    solves a clear job for a real user group.
                  </p>
                </div>
                <Link
                  href="/blog/how-to-choose-ai-coding-tool"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Read the selection guide
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {[
                  {
                    title: 'Build and ship code',
                    body: 'Compare agentic coding tools, IDE assistants, code search, and production debugging workflows.',
                    href: '/blog/claude-code-vs-cursor-comparison',
                  },
                  {
                    title: 'Research faster',
                    body: 'Evaluate AI search engines by source quality, freshness, citation clarity, and deep research ability.',
                    href: '/blog/perplexity-vs-chatgpt-comparison',
                  },
                  {
                    title: 'Create media assets',
                    body: 'Choose image, audio, video, and presentation tools based on output quality and commercial usability.',
                    href: '/blog/how-to-use-ai-image-generators',
                  },
                ].map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-blue-300 hover:bg-blue-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.body}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="grid gap-3 border-t border-gray-200 pt-5 md:grid-cols-3 dark:border-gray-800">
                {[
                  {
                    title: 'For individual users',
                    body: 'We look for useful free tiers, fast onboarding, clear export options, and whether the tool replaces an existing workflow instead of adding another login.',
                  },
                  {
                    title: 'For teams',
                    body: 'We check collaboration controls, permission models, workspace billing, data retention signals, and whether the product can be introduced without heavy training.',
                  },
                  {
                    title: 'For businesses',
                    body: 'We prioritize reliability, privacy documentation, commercial rights, auditability, integrations, and whether pricing scales predictably as usage grows.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tool Grid */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : activeCategory !== 'All'
                    ? `${activeCategory} Tools`
                    : 'All Tools'}
              </h2>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {filteredPosts.length} tool{filteredPosts.length !== 1 ? 's' : ''}
              </span>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="py-16 text-center text-gray-500 dark:text-gray-400">
                <svg
                  className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm">No tools match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {filteredPosts.map((post) => (
                  <ToolCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>

          <div className="pt-4" />
        </div>

        <aside className="hidden min-w-0 xl:block">
          <div className="sticky top-24 space-y-4">
            <section className="rounded-xl border border-sky-200 bg-gradient-to-br from-white to-sky-50/70 p-4 shadow-sm dark:border-sky-900/40 dark:from-slate-950 dark:to-sky-950/20">
              <h2 className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Editor's Shortlist
              </h2>
              <div className="mt-3 space-y-2.5">
                {topPicks.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/${post.path}`}
                    className="flex items-start gap-3 rounded-lg border border-gray-100 p-2.5 transition hover:border-blue-300 hover:bg-blue-50 dark:border-gray-800 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gray-900 text-xs font-bold text-white dark:bg-gray-100 dark:text-gray-900">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {post.title}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{post.category}</span>
                        {post.rating && <span>{post.rating}/5</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-amber-200 bg-gradient-to-br from-white to-amber-50/70 p-4 shadow-sm dark:border-amber-900/40 dark:from-slate-950 dark:to-amber-950/20">
              <h2 className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Quick Filters
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {PRICING_FILTERS.filter((filter) => filter.key !== 'all').map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActivePricing(filter.key)}
                    className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold transition ${
                      activePricing === filter.key
                        ? 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-gray-700'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setActiveCategory('All')
                    setActivePricing('all')
                    setSearchQuery('')
                  }}
                  className="rounded-lg border border-dashed border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-600 transition hover:border-blue-300 hover:text-blue-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Reset all
                </button>
              </div>
            </section>

            <section className="rounded-xl border border-emerald-200 bg-gradient-to-br from-white to-emerald-50/70 p-4 dark:border-emerald-900/40 dark:from-slate-950 dark:to-emerald-950/20">
              <h2 className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Latest Reading
              </h2>
              <div className="mt-3 space-y-3">
                {editorialUpdates.slice(0, 3).map((item) => (
                  <Link key={item.slug} href={item.href} className="group block">
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {item.kind}
                    </div>
                    <div className="mt-1 line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-blue-700 dark:text-gray-100 dark:group-hover:text-blue-400">
                      {item.title}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </aside>
      </div>

      {/* SEO Footer — Below the fold: deep explanatory text + FAQ section */}
      <div className="mt-16 border-t border-gray-200 pt-12 pb-16 dark:border-gray-800">
        <div className="mx-auto max-w-3xl space-y-10">
          {/* What is this site */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              How to Choose the Right AI Tool
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                With thousands of AI tools launching every month, finding the right one for your
                workflow is overwhelming. This directory curates and tests the most important AI
                tools across coding, image generation, writing, search, video, and productivity
                categories — so you don't have to. Each tool is evaluated on its core capabilities,
                pricing, target audience, and real-world performance.
              </p>
              <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                Whether you're a developer looking for the best AI coding assistant, a marketer
                searching for content generation tools, or a creator exploring AI-powered video and
                design, our reviews provide side-by-side comparisons, honest ratings, and detailed
                pricing breakdowns to help you make an informed decision.
              </p>
              <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                If you are new to the category, start with our{' '}
                <Link href="/blog" className="font-medium text-blue-600 dark:text-blue-400">
                  AI tool guides and comparisons
                </Link>
                . If you represent a product, use the{' '}
                <Link href="/contact" className="font-medium text-blue-600 dark:text-blue-400">
                  contact page
                </Link>{' '}
                to submit corrections or review requests.
              </p>
            </div>
          </section>

          {/* Our methodology */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Our Review Methodology
            </h2>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Every tool in this directory is tested hands-on. We evaluate each product across five
              dimensions:{' '}
              <strong className="text-gray-800 dark:text-gray-200">core AI capabilities</strong>{' '}
              (how well does it perform its primary task),{' '}
              <strong className="text-gray-800 dark:text-gray-200">ease of use</strong> (can a
              non-technical person get value),{' '}
              <strong className="text-gray-800 dark:text-gray-200">pricing fairness</strong> (does
              the cost match the value delivered),{' '}
              <strong className="text-gray-800 dark:text-gray-200">privacy and data safety</strong>{' '}
              (how is your data handled), and{' '}
              <strong className="text-gray-800 dark:text-gray-200">ecosystem integration</strong>{' '}
              (does it work with your existing tools). Ratings are on a 1–5 scale based on these
              criteria. You can read more about the editorial process on our{' '}
              <Link href="/about" className="font-medium text-blue-600 dark:text-blue-400">
                About page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              What Makes a Tool Worth Listing
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              <p>
                A product is not added simply because it is new or popular. We look for a concrete
                use case, enough product maturity for a user to evaluate it today, public pricing or
                a clear sales path, and evidence that the tool can produce repeatable results. This
                is why the directory mixes well-known platforms with narrower products that solve a
                specific workflow better than a general chatbot.
              </p>
              <p>
                Reviews are also written with trade-offs in mind. A high score does not mean a tool
                is the right choice for everyone. For example, a professional video platform may be
                excellent for an agency but too expensive for a solo creator; a writing assistant
                may be valuable for brand governance but unnecessary for a student. The goal of each
                page is to help readers rule tools in or out quickly.
              </p>
              <p>
                We keep legal, privacy, and commercial-use details visible because these are the
                areas where AI tools create the most real-world risk. When a tool has unclear data
                handling, weak free-tier value, limited export options, or licensing uncertainty,
                that affects the verdict even if the generated output looks impressive.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {[
                {
                  q: 'What is the best free AI tool for coding?',
                  a: 'It depends on your needs. For general coding assistance, Cursor and Continue.dev both offer free tiers that integrate with your existing editor. Cursor is a standalone IDE built on VS Code with AI-native features, while Continue.dev is a VS Code / JetBrains extension. Check our coding category above for detailed comparisons.',
                },
                {
                  q: 'Are these AI tools safe for enterprise use?',
                  a: 'Each tool review includes a "Privacy & Safety" section where we examine data handling, model training policies, and enterprise readiness. We recommend checking the privacy policy of each tool before using it with sensitive data.',
                },
                {
                  q: 'How often are these reviews updated?',
                  a: 'We update tool reviews whenever there are major feature changes, pricing updates, or new competing tools launch. Each review shows its "last updated" date so you know how current the information is.',
                },
                {
                  q: 'How do you rate AI tools?',
                  a: 'We rate each tool on a 1–5 scale across five dimensions: core capabilities, ease of use, pricing fairness, privacy and data safety, and ecosystem integration. The overall rating is a weighted average reflecting real-world usage value, not just feature checklists.',
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-lg border border-gray-200 px-5 py-4 transition-colors hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                >
                  <summary className="cursor-pointer list-none text-sm font-medium text-gray-900 dark:text-gray-100">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* FAQPage JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the best free AI tool for coding?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It depends on your needs. For general coding assistance, Cursor and Continue.dev both offer free tiers that integrate with your existing editor. Cursor is a standalone IDE built on VS Code with AI-native features, while Continue.dev is a VS Code / JetBrains extension. Check our coding category for detailed comparisons.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are these AI tools safe for enterprise use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Each tool review includes a "Privacy & Safety" section where we examine data handling, model training policies, and enterprise readiness. We recommend checking the privacy policy of each tool before using it with sensitive data.',
                },
              },
              {
                '@type': 'Question',
                name: 'How often are these reviews updated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We update tool reviews whenever there are major feature changes, pricing updates, or new competing tools launch. Each review shows its "last updated" date so you know how current the information is.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do you rate AI tools?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We rate each tool on a 1–5 scale across five dimensions: core capabilities, ease of use, pricing fairness, privacy and data safety, and ecosystem integration. The overall rating is a weighted average reflecting real-world usage value, not just feature checklists.',
                },
              },
            ],
          }),
        }}
      />
    </>
  )
}
