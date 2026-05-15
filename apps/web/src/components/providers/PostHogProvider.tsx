import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

if (typeof window !== 'undefined') {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false, // We'll handle this manually for more control
    persistence: 'localStorage',
    autocapture: true,
  })
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Track page views on route change if needed, but PostHog usually handles this 
    // if capture_pageview is true. We set it to false to avoid double counting 
    // in SSR environments, but for SPAs we can re-enable or manual track.
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}

export const trackEvent = (name: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.capture(name, properties)
  }
}
