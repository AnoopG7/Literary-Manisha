# SabdaSparsh

A bilingual literary portfolio website for showcasing poetry, stories, essays, books, and awards. Built with Next.js 16, featuring an admin panel for content management.

**PRIVATE PROJECT - For internal use only**

## Features

### Public Features
- Literary Works: Browse poems, stories, and essays with support for Hindi (Devanagari) and English
- Books Showcase: Display published books with cover images, descriptions, and Amazon links
- Awards Section: Highlight literary awards and recognition
- Dark/Light Theme: Theme toggle with system preference support
- Advanced Search: Full-text search across all literary works
- Fully Responsive: Optimized for mobile, tablet, and desktop devices
- Performance Optimized: Lazy loading images, on-demand cache revalidation, Next.js Image optimization
- Social Sharing: Share works via WhatsApp, Twitter, or copy direct links

### Admin Features
- Secure Authentication: NextAuth v5 for admin access
- Content Management: Complete CRUD operations for works, books, and awards
- Image Upload: Vercel Blob storage integration for images
- Dashboard: Overview of all content at a glance
- Rich Editor: Markdown-friendly content editor with live preview
- Tagging System: Categorize and tag content for better organization
- Bilingual Support: Create content in Hindi, English, or bilingual
- Toast Notifications: Real-time feedback for all admin actions
- Status Management: Draft/published workflow for works

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + Radix UI
- **Database**: MongoDB with Mongoose ODM
- **Image Storage**: Vercel Blob
- **Authentication**: NextAuth.js v5
- **Fonts**: Inter (Sans-serif), Lora (Serif), Noto Sans Devanagari (Hindi)
- **Notifications**: Sonner

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB database (local or cloud)
- Vercel Blob storage


## Project Structure

```
SabdaSparsh/
├── app/                      # Next.js App Router pages
│   ├── (public)/            # Public-facing pages
│   │   ├── about/           # About page
│   │   ├── books/           # Books listing
│   │   ├── works/           # Works listing & detail
│   │   └── contact/         # Contact page
│   ├── admin/               # Admin panel (protected)
│   │   ├── books/           # Manage books
│   │   ├── awards/          # Manage awards
│   │   ├── works/           # Manage works
│   │   └── dashboard/       # Admin dashboard
│   ├── api/                 # API routes
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── books/           # Books CRUD
│   │   ├── awards/          # Awards CRUD
│   │   ├── works/           # Works CRUD
│   │   └── upload/          # Image upload
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # Reusable components
│   ├── admin/              # Admin-specific components
│   ├── layout/             # Layout components (navbar, footer)
│   ├── providers/          # Context providers
│   └── ui/                 # UI components (Radix-based)
├── lib/                     # Utility functions
│   ├── models/             # Mongoose models
│   ├── auth.ts             # NextAuth configuration
│   ├── db.ts               # Database connection
│   ├── data.ts             # Data fetching functions
│   └── config.ts           # Site configuration
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```


### Admin Routes
-`/admin/dashboard` - Overview of all content
- `/admin/works` - Manage literary works
- `/admin/books` - Manage books
- `/admin/awards` - Manage awards
- `/admin/works/new` - Create new work
- `/admin/works/[id]/edit` - Edit existing work

## Customization

### Site Configuration

Edit `lib/config.ts` to customize:
- Author information
- Site title and description
- Navigation menu
- Social links
- Category definitions

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Theme colors: Defined in `globals.css` using CSS variables

## Database Models

### Work
- Title, slug, content, excerpt
- Category (poem, story, essay)
- Language (hindi, english, bilingual)
- Tags, status (draft/published)
- Timestamps

### Book
- Title, slug, description
- Cover image (Blob URL)
- Genre, publication year, language
- Amazon link, featured status

### Award
- Title, issuing body, year
- Description, image (Blob URL)

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Image Management

Images are stored in Vercel Blob storage and automatically cleaned up when content is deleted. Supported formats: JPG, PNG, WebP.

---

**SabdaSparsh - A Literary Portfolio Platform**
