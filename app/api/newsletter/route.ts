import { NewsletterAPI } from 'pliny/newsletter'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

const configuredProvider = siteMetadata.newsletter?.provider

const handler = configuredProvider
  ? NewsletterAPI({
      // @ts-ignore
      provider: configuredProvider,
    })
  : () => new Response('Newsletter is not enabled.', { status: 404 })

export { handler as GET, handler as POST }
