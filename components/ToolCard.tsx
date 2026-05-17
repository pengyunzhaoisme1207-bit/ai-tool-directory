import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'

export default function ToolCard({ post }) {
  const {
    slug,
    title,
    summary,
    tags,
    logo,
    pricing,
    targetUser,
    rating,
    category,
    mainFeatures,
    lastUpdated,
  } = post

  const pricingColors: Record<string, string> = {
    Free: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Freemium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Paid: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'Open Source': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  }

  const pricingColor =
    (pricing && pricingColors[pricing]) ||
    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-600">
      {/* Card body */}
      <div className="flex-1 p-6">
        {/* Header: Logo + Title + Pricing badge */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 dark:border-gray-600 dark:from-gray-800 dark:to-gray-700">
              {logo ? (
                <Image
                  src={logo}
                  alt={title}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
            <div>
              <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                {title}
              </h3>
              {rating && (
                <div className="mt-0.5 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-xs text-gray-500">{rating}</span>
                </div>
              )}
            </div>
          </div>
          {pricing && (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${pricingColor}`}
            >
              {pricing}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {summary}
        </p>

        {/* Main Features (top 2) */}
        {mainFeatures && mainFeatures.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {mainFeatures.slice(0, 2).map((f) => (
              <span
                key={f}
                className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
              >
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Category + Target User */}
        <div className="mb-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          {category && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              {category}
            </span>
          )}
          {targetUser && <span className="ml-2 truncate">{targetUser}</span>}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}
      </div>

      {/* Footer: CTA Button */}
      <div className="px-6 pt-0 pb-6">
        <Link
          href={`/blog/${slug}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 hover:shadow-md"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          View Deep Review
        </Link>
      </div>
    </div>
  )
}
