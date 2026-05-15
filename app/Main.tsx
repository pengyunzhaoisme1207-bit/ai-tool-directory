'use client'

import { useState, useMemo } from 'react'
import ToolCard from '@/components/ToolCard'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Link from '@/components/Link'

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

export default function Home({ posts }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activePricing, setActivePricing] = useState('all')

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
      {/* Hero Section */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-10 md:py-14 dark:from-blue-800 dark:via-blue-900 dark:to-indigo-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/80 backdrop-blur-sm">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11.3 1.046A1.5 1.5 0 0113 2v5h4a1.5 1.5 0 01.707 2.821l-9 5.25a1.5 1.5 0 01-2.407-1.643L7.44 8H3a1.5 1.5 0 01-1.33-2.198l9.5-5.25z" />
            </svg>
            Curated AI Tools Directory
          </div>
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Find the Right AI Tool
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-blue-100 md:text-lg">
            {siteMetadata.description}
          </p>
          {/* Stats inline */}
          <div className="mt-5 flex items-center justify-center gap-6 text-sm text-blue-200">
            <span>
              <strong className="text-white">{totalTools}</strong> Tools
            </span>
            <span className="text-blue-300">·</span>
            <span>
              <strong className="text-white">{categoryCount}</strong> Categories
            </span>
            <span className="text-blue-300">·</span>
            <span>
              <strong className="text-white">{freeCount + freemiumCount}</strong> Free
            </span>
          </div>
        </div>
      </div>

      {/* Two-column layout: sidebar + content */}
      <div className="flex gap-8">
        {/* Sidebar — Category Navigation */}
        <aside className="hidden w-48 shrink-0 lg:block">
          <div className="sticky top-24">
            <h2 className="mb-3 text-sm font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
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
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ${
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
        </aside>

        {/* Main content area */}
        <div className="min-w-0 flex-1">
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
                        <img src={post.logo} alt="" className="h-8 w-8 rounded-lg object-contain" />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-semibold text-gray-900 dark:text-gray-100">
                          {post.title}
                        </div>
                        <div className="flex items-center gap-0.5 text-xs text-yellow-600 dark:text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-3 w-3 ${i < Math.floor(post.rating) ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-700'}`}
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

          {/* Search & Pricing */}
          <div className="mb-6 space-y-3">
            <div className="relative">
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
                className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm text-gray-900 shadow-sm transition-shadow focus:border-blue-400 focus:shadow-md focus:ring-2 focus:ring-blue-100 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-600 dark:focus:ring-blue-900/30"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('All')
                    setActivePricing('all')
                  }}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
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

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium tracking-wider text-gray-400 uppercase dark:text-gray-500">
                Pricing:
              </span>
              {PRICING_FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActivePricing(f.key)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                    activePricing === f.key
                      ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Decision paths */}
          {activeCategory === 'All' && !searchQuery && activePricing === 'all' && (
            <section className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/60">
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
                    Start with a Use Case
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Pick the workflow you are trying to improve, then compare tools by cost,
                    privacy, model quality, and how much setup they require.
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
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredPosts.map((post) => (
                  <ToolCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Newsletter */}
          {siteMetadata.newsletter?.provider && (
            <div className="flex items-center justify-center pt-4">
              <NewsletterForm />
            </div>
          )}
        </div>
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
