import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Globe, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShareButtons } from '@/components/share-buttons';
import { getWorkBySlug, getWorks, getAllWorkSlugs } from '@/lib/data';
import type { Metadata } from 'next';

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const work = await getWorkBySlug(decodedSlug);
  if (!work) return {};
  return {
    title: work.title,
    description: work.excerpt,
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const work = await getWorkBySlug(decodedSlug);

  if (!work) {
    notFound();
  }

  const isHindi = work.language === 'hindi';

  // Find prev/next works
  const publishedWorks = await getWorks({ status: 'published' });
  const currentIndex = publishedWorks.findIndex((w) => w.slug === slug);
  const prevWork = currentIndex > 0 ? publishedWorks[currentIndex - 1] : null;
  const nextWork = currentIndex < publishedWorks.length - 1 ? publishedWorks[currentIndex + 1] : null;

  // Related works (same category, different slug)
  const allCategoryWorks = await getWorks({ category: work.category, status: 'published' });
  const relatedWorks = allCategoryWorks
    .filter((w) => w.slug !== slug)
    .slice(0, 2);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Back link */}
        <Button asChild variant="ghost" size="sm" className="mb-8 -ml-2 gap-1 text-muted-foreground hover:text-foreground">
          <Link href="/works">
            <ArrowLeft className="h-4 w-4" />
            Back to Works
          </Link>
        </Button>

        {/* Work header */}
        <header className="mb-10">
          {/* Badges */}
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="capitalize text-xs">
              {work.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Globe className="h-3 w-3 mr-1" />
              {isHindi ? 'हिंदी' : work.language === 'bilingual' ? 'Bilingual' : 'English'}
            </Badge>
          </div>

          {/* Title */}
          <h1 className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${isHindi ? 'font-hindi' : ''}`}>
            {work.title}
          </h1>

          {/* Meta row */}
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(work.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              {work.tags.filter((t) => t !== 'featured').join(', ')}
            </span>
          </div>
        </header>

        <Separator className="mb-10 bg-border/40" />

        {/* Content */}
        <article
          className={
            work.category === 'poem'
              ? `poetry-content ${isHindi ? 'hindi' : ''}`
              : `prose-literary ${isHindi ? 'font-hindi' : ''}`
          }
        >
          {work.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className={work.category === 'poem' ? 'mb-6' : ''}>
              {paragraph}
            </p>
          ))}
        </article>

        <Separator className="my-10 bg-border/40" />

        {/* Share section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Share2 className="h-4 w-4" />
            <span>Share this {work.category}</span>
          </div>
          <ShareButtons 
            url={`https://sabdasparsh.vercel.app/works/${work.slug}`}
            title={work.title}
          />
        </div>

        {/* Prev / Next navigation */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {prevWork ? (
            <Link
              href={`/works/${prevWork.slug}`}
              className="group flex flex-col rounded-xl border border-border/50 p-4 transition-colors hover:border-primary/20 hover:bg-card"
            >
              <span className="text-xs text-muted-foreground mb-1">← Previous</span>
              <span className={`text-sm font-medium group-hover:text-primary transition-colors ${prevWork.language === 'hindi' ? 'font-hindi' : ''}`}>
                {prevWork.title}
              </span>
            </Link>
          ) : <div />}
          {nextWork && (
            <Link
              href={`/works/${nextWork.slug}`}
              className="group flex flex-col items-end rounded-xl border border-border/50 p-4 transition-colors hover:border-primary/20 hover:bg-card text-right"
            >
              <span className="text-xs text-muted-foreground mb-1">Next →</span>
              <span className={`text-sm font-medium group-hover:text-primary transition-colors ${nextWork.language === 'hindi' ? 'font-hindi' : ''}`}>
                {nextWork.title}
              </span>
            </Link>
          )}
        </div>

        {/* Related works */}
        {relatedWorks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-6">More {work.category === 'poem' ? 'Poetry' : work.category === 'story' ? 'Stories' : 'Works'}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedWorks.map((related) => (
                <Link key={related._id} href={`/works/${related.slug}`}>
                  <div className="group rounded-xl border border-border/50 p-5 transition-all hover:border-primary/20 hover:bg-card hover:-translate-y-0.5">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {related.language === 'hindi' ? 'हिंदी' : 'English'}
                    </Badge>
                    <h3 className={`text-base font-semibold group-hover:text-primary transition-colors ${related.language === 'hindi' ? 'font-hindi' : ''}`}>
                      {related.title}
                    </h3>
                    <p className={`mt-2 text-sm text-muted-foreground line-clamp-2 ${related.language === 'hindi' ? 'font-hindi' : ''}`}>
                      {related.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
