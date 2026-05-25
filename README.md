# AI Tool Directory

Independent AI tool reviews, comparisons, and weekly briefs for `https://www.next-happy.com`.

## Project

- Framework: Next.js 15 App Router
- Content: Contentlayer2 MDX
- Styling: Tailwind CSS v4
- Deployment: Vercel
- Production domain: `https://www.next-happy.com`
- Repository: `https://github.com/pengyunzhaoisme1207-bit/ai-tool-directory`

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content Structure

- `data/reviews/` - individual AI tool reviews
- `data/guides/` - workflow guides and roundups
- `data/comparisons/` - tool-versus-tool comparisons
- `data/briefs/` - weekly AI industry briefs
- `app/` - App Router pages, sitemap, robots, and metadata
- `components/` and `layouts/` - shared UI and MDX layouts

## Verification

Run these before committing changes:

```bash
npm run build
git status --short
```

Do not edit generated folders such as `.next`, `.contentlayer`, or `node_modules`.
