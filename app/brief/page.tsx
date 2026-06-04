import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBriefs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import BriefListLayout from '@/layouts/BriefListLayout'

const POSTS_PER_PAGE = 10

export const metadata = genPageMetadata({
  title: 'AI Brief - Weekly AI Tool and Product Updates',
  description:
    'Read weekly AI product briefs covering tool launches, model updates, pricing changes, enterprise adoption, privacy signals, and workflow implications.',
})

export default async function BriefPage() {
  const briefs = allCoreContent(sortPosts(allBriefs))
  const pageNumber = 1
  const totalPages = Math.ceil(briefs.length / POSTS_PER_PAGE)
  const initialDisplayBriefs = briefs.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <BriefListLayout
      briefs={briefs}
      initialDisplayBriefs={initialDisplayBriefs}
      pagination={pagination}
      title="All Briefs"
    />
  )
}
