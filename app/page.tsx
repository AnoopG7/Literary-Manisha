import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Award, Feather, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/lib/config';
import { getFeaturedWorks, getFeaturedBooks, getAwards, getStats } from '@/lib/data';

async function HeroSection() {
  const stats = await getStats();
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Decorative element */}
          <div className="mb-6 flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Welcome to my literary world</span>
          </div>

          {/* Name */}
          <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl animate-fade-in-up">
            <span className="text-gradient">{siteConfig.author.name}</span>
          </h1>

          {/* Tagline */}
          <p className="mb-3 text-xl text-muted-foreground sm:text-2xl animate-fade-in-up stagger-1 font-light tracking-wide">
            {siteConfig.tagline}
          </p>

          {/* Sub-description */}
          <p className="mb-8 max-w-2xl text-base text-muted-foreground/80 leading-relaxed animate-fade-in-up stagger-2">
            Weaving emotions into words — in Hindi and English. Exploring the depths of human experience through poetry, stories, and prose.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <Button asChild size="lg" className="rounded-full px-8 gap-2">
              <Link href="/works">
                <BookOpen className="h-4 w-4" />
                Explore My Works
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 gap-2"
            >
              <Link href="/about">
                Learn About Me
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-16 animate-fade-in-up stagger-4">
            <Link href="/works" className="text-center group">
              <p className="text-3xl font-bold text-primary sm:text-4xl group-hover:scale-110 transition-transform">{stats.works}+</p>
              <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">Works Published</p>
            </Link>
            <Link href="/books" className="text-center group">
              <p className="text-3xl font-bold text-primary sm:text-4xl group-hover:scale-110 transition-transform">{stats.books}</p>
              <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">Books</p>
            </Link>
            <Link href="/awards" className="text-center group">
              <p className="text-3xl font-bold text-primary sm:text-4xl group-hover:scale-110 transition-transform">{stats.awards}</p>
              <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">Awards</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

async function FeaturedWorksSection() {
  const featuredWorks = await getFeaturedWorks();

  return (
    <section className="py-20 bg-card/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
              Featured Works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Selected Writings
            </h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex gap-1 text-primary hover:text-primary/80">
            <Link href="/works">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Works grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredWorks.map((work) => (
            <Link key={work._id} href={`/works/${work.slug}`}>
              <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 border-border/50 bg-card hover:border-primary/20">
                <CardContent className="p-6">
                  {/* Category + Lang badges */}
                  <div className="mb-4 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {work.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {work.language === 'hindi' ? 'हिंदी' : work.language === 'bilingual' ? 'Bilingual' : 'EN'}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className={`mb-3 text-xl font-semibold transition-colors group-hover:text-primary ${work.language === 'hindi' ? 'font-hindi' : ''}`}>
                    {work.title}
                  </h3>

                  {/* Excerpt */}
                  <p className={`text-sm text-muted-foreground leading-relaxed line-clamp-3 ${work.language === 'hindi' ? 'font-hindi' : ''}`}>
                    {work.excerpt}
                  </p>

                  {/* Date */}
                  <p className="mt-4 text-xs text-muted-foreground/60">
                    {new Date(work.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline" className="gap-1">
            <Link href="/works">
              View all works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

async function BooksShowcaseSection() {
  const featuredBooks = await getFeaturedBooks();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
            Published Books
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Available on Amazon
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Dive deeper into my stories and poetry through my published collections
          </p>
        </div>

        {/* Books grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBooks.map((book) => (
            <Card
              key={book._id}
              className="group overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Book cover */}
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                {book.coverImage && book.coverImage !== '/images/book-placeholder.jpg' ? (
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="text-center p-6">
                    <BookOpen className="h-12 w-12 text-primary/40 mx-auto mb-3" />
                    <p className={`text-lg font-semibold text-primary/70 ${book.language === 'hindi' ? 'font-hindi' : ''}`}>
                      {book.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{book.publicationYear}</p>
                  </div>
                )}
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>

              <CardContent className="p-5">
                <h3 className={`text-lg font-semibold mb-2 ${book.language === 'hindi' ? 'font-hindi' : ''}`}>
                  {book.title}
                </h3>
                <Badge variant="secondary" className="mb-3 text-xs">
                  {book.genre}
                </Badge>
                <p className={`text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 ${book.language === 'hindi' ? 'font-hindi' : ''}`}>
                  {book.description}
                </p>
                <Button asChild className="w-full gap-2 rounded-full" size="sm">
                  <a href={book.amazonLink} target="_blank" rel="noopener noreferrer">
                    Buy on Amazon
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View all books */}
        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="gap-1 rounded-full px-8">
            <Link href="/books">
              View all books
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

async function AwardsSection() {
  const awards = await getAwards();

  return (
    <section className="py-20 bg-card/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
            Recognition
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Awards & Honors
          </h2>
        </div>

        {/* Awards timeline */}
        <div className="max-w-2xl mx-auto space-y-0">
          {awards.map((award, i) => (
            <div key={award._id} className="relative flex gap-6 pb-8 last:pb-0">
              {/* Timeline line */}
              {i < awards.length - 1 && (
                <div className="absolute left-[19px] top-10 h-full w-px bg-border" />
              )}

              {/* Icon / Image */}
              {award.image ? (
                <div className="relative h-10 w-10 rounded-full border border-primary/20 flex-shrink-0 overflow-hidden">
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              ) : (
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <Award className="h-5 w-5 text-primary" />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="text-lg font-semibold">{award.title}</h3>
                  <Badge variant="outline" className="text-xs">{award.year}</Badge>
                </div>
                <p className="text-sm font-medium text-primary/80 mb-2">
                  {award.issuingBody}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {award.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-border/50 px-8 py-16 text-center sm:px-16">
          {/* Decorative */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <Feather className="h-8 w-8 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold tracking-tight mb-4 sm:text-4xl">
            Let&apos;s Connect
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
            Whether you&apos;re a reader, a literary agent, or a fellow writer — I&apos;d love to hear from you. Every conversation is a new story waiting to be told.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 gap-2">
              <Link href="/about">
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/works">Browse My Works</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <Separator className="bg-border/40" />
      <FeaturedWorksSection />
      <BooksShowcaseSection />
      <AwardsSection />
      <CTASection />
    </>
  );
}
