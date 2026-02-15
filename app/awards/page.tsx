import { Award, Trophy, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageLightbox } from '@/components/ui/image-lightbox';
import { getAwards } from '@/lib/data';
import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Awards & Recognition',
  description: `Awards and recognition received by ${siteConfig.author.name} for excellence in poetry, storytelling, and literary contributions.`,
};

export default async function AwardsPage() {
  const awards = await getAwards();

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Page header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Awards & Recognition
            </h1>
          </div>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Honored to have my work recognized by prestigious literary organizations.
            Each award is a testament to the power of words and the beauty of storytelling.
          </p>
        </div>

        {/* Awards grid */}
        {awards.length === 0 ? (
          <div className="text-center py-20">
            <Award className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">No awards to display yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((award) => (
              <Card
                key={award._id}
                className="group overflow-hidden border-border/50 hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1"
              >
                {/* Award image area */}
                <div className="aspect-[4/3] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-yellow-950/30 flex items-center justify-center relative overflow-hidden">
                  {award.image ? (
                    <ImageLightbox src={award.image} alt={award.title}>
                      <img
                        src={award.image}
                        alt={award.title}
                        className="w-full h-full object-cover"
                      />
                    </ImageLightbox>
                  ) : (
                    <div className="text-center p-8">
                      <Trophy className="h-16 w-16 text-amber-400/40 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-amber-600/50 dark:text-amber-400/50">
                        {award.title}
                      </p>
                    </div>
                  )}
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                  {/* Year badge overlay */}
                  <div className="absolute top-3 right-3 pointer-events-none">
                    <Badge className="bg-amber-600 hover:bg-amber-600 text-white text-xs shadow-lg">
                      <Calendar className="h-3 w-3 mr-1" />
                      {award.year}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {award.title}
                  </h2>

                  <p className="text-sm font-medium text-primary/80 mb-3">
                    {award.issuingBody}
                  </p>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {award.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl border border-border/50 bg-card/50 p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Literary Recognition</h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            These awards reflect the support and appreciation of readers, literary communities,
            and cultural organizations. Grateful for every milestone on this writing journey.
          </p>
        </div>
      </div>
    </div>
  );
}
