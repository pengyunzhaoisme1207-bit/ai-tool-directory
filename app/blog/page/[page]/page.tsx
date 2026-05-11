import BriefListLayout from '@/layouts/BriefListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBriefs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 10

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBriefs.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const briefs = allCoreContent(sortPosts(allBriefs))
  const pageNumber = parseInt(params.page as string)
  const totalPages = Math.ceil(briefs.length / POSTS_PER_PAGE)

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }
  const initialDisplayBriefs = briefs.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
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
