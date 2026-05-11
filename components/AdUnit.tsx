'use client'

import { useEffect, useRef } from 'react'

interface AdUnitProps {
  adSlot: string
  adFormat?: 'auto' | 'display' | 'rectangle'
  className?: string
}

/**
 * Google AdSense ad unit component.
 * Renders an <ins> element and pushes to the adsbygoogle queue on mount.
 */
export default function AdUnit({ adSlot, adFormat = 'auto', className = '' }: AdUnitProps) {
  const ref = useRef<HTMLModElement>(null)

  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle is a global variable injected by the AdSense script
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      // AdSense may not be loaded or ad blockers may be active
    }
  }, [])

  return (
    <ins
      ref={ref}
      className={`adsbygoogle block ${className}`}
      style={{ display: 'block' }}
      data-ad-client="ca-pub-7338826858147459"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  )
}
