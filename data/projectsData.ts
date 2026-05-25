interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'AI Tool Reviews',
    description:
      'Independent reviews that compare pricing, workflow fit, privacy signals, and real-world usefulness for AI software buyers.',
    href: '/blog',
  },
  {
    title: 'Editorial Policy',
    description:
      'The public review process explains how tools are selected, tested, corrected, and disclosed before publication.',
    href: '/editorial-policy',
  },
]

export default projectsData
