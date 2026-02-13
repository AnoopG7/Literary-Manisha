import Link from 'next/link';
import { Feather, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <Feather className="h-12 w-12 text-primary/30 mb-6" />
      <h1 className="text-6xl font-bold text-primary/20 mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
        The page you&apos;re looking for seems to have wandered off — perhaps chasing a poem
        that hasn&apos;t been written yet.
      </p>
      <Button asChild className="rounded-full gap-2 px-6">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
