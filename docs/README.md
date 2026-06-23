# School Homework Helper

AI-powered education platform for students from Class 1 to Class 12.

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS 4**
- **TypeScript**
- **Lucide React** (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Brand colors & utilities
│   ├── layout.tsx       # Root layout & metadata
│   └── page.tsx         # Homepage
├── components/
│   ├── home/            # Homepage sections
│   └── layout/          # Navbar & Footer
└── lib/
    ├── data.ts          # Site content data
    └── utils.ts         # Utility functions
```

## Brand Colors

| Color      | Hex       | Usage              |
|------------|-----------|--------------------|
| Dark Blue  | `#0a1628` | Background, cards  |
| Light Blue | `#4a9eff` | Accents, links     |
| Orange     | `#f97316` | CTAs, highlights   |

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Add your OpenAI API key (required for AI tools)
3. Optionally add Supabase credentials for request logging

```bash
cp .env.example .env.local
```

Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor.

## All 6 AI Tools (MVP Complete)

| Tool | URL |
|------|-----|
| Homework Solver | `/tools/homework-solver` |
| Essay Generator | `/tools/essay-generator` |
| Math Solver | `/tools/math-solver` |
| Quiz Generator | `/tools/quiz-generator` |
| Grammar Checker | `/tools/grammar-checker` |
| Science Projects | `/tools/science-projects` |

## Site Pages

| Page | URL |
|------|-----|
| Classes Hub | `/classes` |
| Class 1–12 Detail | `/classes/class-1` … `/classes/class-12` |
| Subjects Hub | `/subjects` |
| Subject Detail | `/subjects/mathematics`, `/subjects/science`, etc. |
| Blog | `/blog` |
| About | `/about` |
| Contact | `/contact` |

## SEO (112 Landing Pages)

Auto-generated SEO pages targeting long-tail keywords:

| Type | Count | Example URL |
|------|-------|-------------|
| Homework Help | 72 | `/class-5-maths-homework-help` |
| Essay Topics | 12 | `/class-7-english-essay-topics` |
| Math Word Problems | 12 | `/class-8-math-word-problems` |
| Science Projects | 12 | `/class-9-science-projects` |
| Board Exam Prep | 4 | `/class-10-board-exam-preparation` |

Each page includes meta tags, Open Graph, FAQ schema (JSON-LD), and internal links.

- **Sitemap:** `/sitemap.xml`
- **Robots:** `/robots.txt`

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` for production canonical URLs.

## Next Steps

1. Deploy to Vercel
2. Apply for Google AdSense
3. Scale SEO pages toward 500+
