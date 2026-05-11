'use client'

import { useState, useMemo } from 'react'
import ToolCard from '@/components/ToolCard'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const CATEGORIES = [
  { key: 'All', label: 'All' },
  { key: 'LLM', label: 'LLM' },
  { key: 'Image Gen', label: 'Image Gen' },
  { key: 'Coding', label: 'Coding' },
  { key: 'Productivity', label: 'Productivity' },
  { key: 'Video', label: 'Video' },
  { key: 'Audio', label: 'Audio' },
]

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
              onClick={() => setSearchQuery('')}
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

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
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
