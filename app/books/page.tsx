import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBooks } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Books',
  description: 'Browse published books — poetry collections, stories, and more. Available on Amazon.',
};

export default async function BooksPage() {
  const books = await getBooks();
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Books</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            My published works — collections of poetry, stories, and essays.
            Each book is a journey into the heart of human experience.
          </p>
        </div>

        {/* Books grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <Card
              key={book._id}
              className="group overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Book cover placeholder */}
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 flex items-center justify-center relative overflow-hidden">
                <div className="text-center p-8">
                  <BookOpen className="h-16 w-16 text-primary/30 mx-auto mb-4" />
                  <p className={`text-xl font-semibold text-primary/60 ${book.language === 'hindi' ? 'font-hindi' : ''}`}>
                    {book.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{book.publicationYear}</p>
                </div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {book.genre}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {book.publicationYear}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {book.language === 'hindi' ? 'हिंदी' : 'English'}
                  </Badge>
                </div>

                <h2 className={`text-xl font-semibold mb-3 ${book.language === 'hindi' ? 'font-hindi' : ''}`}>
                  {book.title}
                </h2>

                <p className={`text-sm text-muted-foreground leading-relaxed mb-6 ${book.language === 'hindi' ? 'font-hindi' : ''}`}>
                  {book.description}
                </p>

                <Button asChild className="w-full gap-2 rounded-full" size="default">
                  <a href={book.amazonLink} target="_blank" rel="noopener noreferrer">
                    <BookOpen className="h-4 w-4" />
                    Buy on Amazon
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note for literary agents */}
        <div className="mt-16 rounded-2xl border border-border/50 bg-card/50 p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">For Literary Agents & Publishers</h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Interested in my work? I&apos;m open to collaborations, publishing opportunities, and literary representation.
            Please reach out via the contact information on my{' '}
            <a href="/about" className="text-primary hover:underline">About page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
