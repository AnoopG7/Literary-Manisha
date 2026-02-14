import { Mail, Instagram, Youtube, Award, BookOpen, PenTool, Download, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/lib/config';
import { getAwards } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${siteConfig.author.name} — poet, storyteller, and author. Explore achievements, awards, and the writing journey.`,
};

export default async function AboutPage() {
  const awards = await getAwards();
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Main About Section */}
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Profile Column */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              {/* Profile image placeholder */}
              <div className="relative mb-6">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-border/50 flex items-center justify-center overflow-hidden">
                  <img src="/author.jpeg" alt={siteConfig.author.name} className="w-full h-full object-cover" />
                </div>
                {/* Decorative dot */}
                <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-primary/20 border-4 border-background" />
              </div>

              {/* Contact info */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Connect
                </h3>
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.author.email}
                </a>
                {siteConfig.author.social.instagram && (
                  <a
                    href={siteConfig.author.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                )}
                {siteConfig.author.social.youtube && (
                  <a
                    href={siteConfig.author.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Youtube className="h-4 w-4" />
                    YouTube
                  </a>
                )}
                {siteConfig.author.social.linkedin && (
                  <a
                    href={siteConfig.author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
              </div>

              {/* Download CV */}
              <div className="mt-6">
                <Button variant="outline" className="rounded-full gap-2 w-full" size="sm">
                  <Download className="h-4 w-4" />
                  Download CV / Portfolio
                </Button>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-3 space-y-12">
            {/* Name + Title */}
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-2">
                {siteConfig.author.name}
              </h1>
              <p className="text-xl text-primary font-light tracking-wide">
                {siteConfig.tagline}
              </p>
            </div>

            {/* Bio */}
            <div className="prose-literary">
              <p>
                {siteConfig.author.bio}
              </p>
              <p>
                Words have always been my compass. From the quiet lanes of small-town India to the
                wide world of publishing, I&apos;ve carried stories in both Hindi and English —
                each language offering its own palette of emotions, rhythms, and silences.
              </p>
              <p>
                My work explores the intimate spaces of human connection: the bonds between
                generations, the weight of unsaid words, and the small moments that quietly
                define who we are. I write because I believe that every story, no matter how small,
                deserves to be told.
              </p>
              <p className="font-hindi">
                मेरा मानना है कि शब्दों में वो ताकत है जो दिलों को जोड़ सकती है,
                दूरियों को मिटा सकती है, और अनकहे भावों को आवाज़ दे सकती है।
              </p>
            </div>

            <Separator className="bg-border/40" />

            {/* Writing Journey */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6">The Writing Journey</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-1 rounded-full bg-gradient-to-b from-primary to-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Early Years</p>
                    <p className="text-sm leading-relaxed">
                      Started writing poetry in school notebooks, finding solace and expression
                      in the rhythm of words. Hindi was my first literary language — the language
                      of my grandmother&apos;s stories and my mother&apos;s lullabies.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-1 rounded-full bg-gradient-to-b from-accent to-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Published Author</p>
                    <p className="text-sm leading-relaxed">
                      Published my first collection of poetry, followed by short stories and
                      essays. Each piece is a window into the human experience, told through
                      the lens of Indian culture and universal emotion.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-1 rounded-full bg-gradient-to-b from-primary to-primary/40" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Today</p>
                    <p className="text-sm leading-relaxed">
                      Continuing to write, publish, and connect with readers around the world.
                      Whether in Hindi or English, my goal remains the same: to touch hearts
                      and preserve the beauty of storytelling.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-border/40" />

            {/* Awards section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">Awards & Recognition</h2>
              </div>
              <div className="space-y-6">
                {awards.map((award) => (
                  <Card key={award._id} className="border-border/50 bg-card/50">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-base">{award.title}</h3>
                          <p className="text-sm text-primary/80 mt-0.5">{award.issuingBody}</p>
                          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                            {award.description}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          {award.year}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator className="bg-border/40" />

            {/* What I Write */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6">What I Write</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="border-border/50 bg-card/50">
                  <CardContent className="p-5 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <PenTool className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">Poetry</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Verses in Hindi & English that capture fleeting emotions
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/50">
                  <CardContent className="p-5 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">Stories</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Short fiction exploring human connection and tradition
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/50">
                  <CardContent className="p-5 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">Essays</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Reflections on life, culture, and the art of writing
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* For Literary Agents */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
              <h3 className="text-lg font-semibold mb-2">For Literary Agents & Publishers</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                I am actively seeking literary representation and publishing partnerships.
                My portfolio includes published books, award-winning poetry, and a growing body
                of work in both Hindi and English. Please feel free to reach out for manuscripts,
                proposals, or collaboration inquiries.
              </p>
              <Button asChild className="rounded-full gap-2" size="sm">
                <a href={`mailto:${siteConfig.author.email}`}>
                  <Mail className="h-4 w-4" />
                  Contact Me
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
