'use client'

import { useEffect, useRef } from 'react'

interface AdUnitProps {
  /** Semantic slot name: 'top', 'middle', 'result', 'bottom', 'sidebar' */
  slotName?: string
  /** Legacy ad slot ID (numeric string, for AdSense data-ad-slot) */
  adSlot?: string
  adFormat?: 'auto' | 'display' | 'rectangle'
  className?: string
}

const PLACEHOLDER_SLOTS = new Set(['1234567890', '2345678901', '3456789012'])

/**
 * Google AdSense ad unit component.
 * Renders an <ins> element and pushes to the adsbygoogle queue on mount.
 * Supports semantic slot naming for consistent ad placement across the site.
 */
export default function AdUnit({
  slotName,
  adSlot,
  adFormat = 'auto',
  className = '',
}: AdUnitProps) {
  const ref = useRef<HTMLModElement>(null)
  const isRenderable = Boolean(adSlot && !PLACEHOLDER_SLOTS.has(adSlot))

  useEffect(() => {
    if (!isRenderable) return

    try {
      // @ts-expect-error adsbygoogle is a global variable injected by the AdSense script
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      // AdSense may not be loaded or ad blockers may be active
    }
  }, [isRenderable])

  if (!isRenderable) {
    return null
  }

  const slotClass = slotName ? `ad-slot-${slotName}` : ''

  return (
    <ins
      ref={ref}
      className={`adsbygoogle block ${slotClass} ${className}`.trim()}
      style={{ display: 'block' }}
      data-ad-client="ca-pub-7338826858147459"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  )
}
