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
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"
      />
    </svg>
  ),
  chat: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  ),
  image: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  code: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  sparkle: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  ),
  video: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  ),
  audio: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
      />
    </svg>
  ),
  search: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  palette: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  ),
  pen: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  ),
  wand: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225L5.69 16.026l1.076-3.11L13.684 8.1 20 5.166l-1.908 5.52L13.684 16.6zM3.126 13.285L5.69 16.026m11.236 5.646l-3.005-3.005m0 0l-2.51-5.336m-5.336 1.076L12 8.1l2.51 5.336M5.69 16.026L8.1 12l-2.41-4.026L3.126 13.285z"
      />
    </svg>
  ),
  robot: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

const CATEGORY_COLORS: Record<string, string> = {
  All: 'from-blue-500 to-blue-600',
  LLM: 'from-violet-500 to-purple-600',
  'Image Gen': 'from-pink-500 to-rose-600',
  Coding: 'from-emerald-500 to-green-600',
  Productivity: 'from-amber-500 to-orange-600',
  Video: 'from-red-500 to-red-600',
  Audio: 'from-cyan-500 to-blue-600',
  Search: 'from-indigo-500 to-blue-600',
  Design: 'from-fuchsia-500 to-purple-600',
  Writing: 'from-teal-500 to-cyan-600',
  Creative: 'from-yellow-500 to-amber-600',
  'AI Agent': 'from-slate-500 to-gray-600',
}

export default function Home({ posts }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activePricing, setActivePricing] = useState('all')

  // Derive stats
  const totalTools = posts.length
  const freeCount = posts.filter((p) => p.pricing === 'Free').length
  const freemiumCount = posts.filter((p) => p.pricing === 'Freemium').length
  const categories = useMemo(
    () => [...new Set(posts.map((p) => p.category).filter(Boolean))],
    [posts]
  )
  const categoryCount = categories.length

  // Top rated tools (rating >= 4.5)
  const topPicks = useMemo(
    () =>
      posts
        .filter((p) => p.rating && p.rating >= 4.5)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 3),
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

  return (
    <>
      {/* Hero Section */}
      <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-12 md:py-16 dark:from-blue-800 dark:via-blue-900 dark:to-indigo-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/80 backdrop-blur-sm">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11.3 1.046A1.5 1.5 0 0113 2v5h4a1.5 1.5 0 01.707 2.821l-9 5.25a1.5 1.5 0 01-2.407-1.643L7.44 8H3a1.5 1.5 0 01-1.33-2.198l9.5-5.25z" />
            </svg>
            Curated AI Tools Directory
          </div>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Find the Right AI Tool
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-blue-100 md:text-xl">
            {siteMetadata.description}
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mb-10 grid grid-cols-3 gap-4 md:gap-6">
        {[
          { label: 'Tools Reviewed', value: totalTools, icon: 'grid' },
          { label: 'Categories', value: categoryCount, icon: 'sparkle' },
          { label: 'Free & Freemium', value: freeCount + freemiumCount, icon: 'sparkle' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-white px-4 py-5 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="text-2xl font-extrabold text-gray-900 md:text-3xl dark:text-gray-100">
              {stat.value}
            </div>
            <div className="mt-1 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Top Picks */}
      {topPicks.length > 0 && (
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Top Rated Picks</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {topPicks.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.path}`}
                className="group rounded-2xl border border-gray-100 bg-gradient-to-br from-yellow-50 to-amber-50 px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:from-gray-900 dark:to-gray-800"
              >
                <div className="flex items-center gap-3">
                  {post.logo && (
                    <img src={post.logo} alt="" className="h-10 w-10 rounded-lg object-contain" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {post.title}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-3.5 w-3.5 ${i < Math.floor(post.rating) ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-700'}`}
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

      {/* Category Cards */}
      <div className="mb-10">
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
          Browse by Category
        </h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {CATEGORIES.filter((cat) => cat.key === 'All' || categoryCounts[cat.key] > 0).map(
            (cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key)
                  setActivePricing('all')
                  setSearchQuery('')
                }}
                className={`group flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  activeCategory === cat.key
                    ? 'border-blue-200 bg-blue-50 shadow-sm dark:border-blue-700 dark:bg-blue-900/30'
                    : 'border-gray-100 bg-white hover:border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700'
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${CATEGORY_COLORS[cat.key] || 'from-gray-400 to-gray-500'} text-white shadow-sm transition-transform duration-200 group-hover:scale-110`}
                >
                  {CATEGORY_ICONS[cat.icon]}
                </div>
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {cat.label}
                </div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500">
                  {cat.key === 'All' ? totalTools : categoryCounts[cat.key] || 0}
                </div>
              </button>
            )
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <svg
            className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400"
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
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-12 text-sm text-gray-900 shadow-sm transition-shadow focus:border-blue-400 focus:shadow-md focus:ring-2 focus:ring-blue-100 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-600 dark:focus:ring-blue-900/30"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('All')
                setActivePricing('all')
              }}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Pricing Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium tracking-wider text-gray-400 uppercase dark:text-gray-500">
            Pricing:
          </span>
          {PRICING_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActivePricing(f.key)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
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

      {/* Tool Grid */}
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {searchQuery ? `Results for "${searchQuery}"` : 'Latest Reviews'}
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredPosts.length} tool{filteredPosts.length !== 1 ? 's' : ''}
            {posts.length !== filteredPosts.length ? ` of ${posts.length}` : ''}
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center text-gray-500 dark:text-gray-400">
            <svg
              className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600"
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
            <p className="text-lg">No tools match your filters.</p>
            <p className="mt-2 text-sm">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </>
  )
}
