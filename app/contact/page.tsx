import { Metadata } from 'next';
import { Mail, Instagram, Youtube, Facebook, Linkedin, Feather, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact — Manisha',
  description:
    'Get in touch with Manisha — for literary collaborations, publishing inquiries, or just to share your thoughts.',
};

const socialLinks = [
  {
    label: 'Instagram',
    href: siteConfig.author.social.instagram || '#',
    icon: Instagram,
    color: 'hover:text-pink-500',
  },
  {
    label: 'YouTube',
    href: siteConfig.author.social.youtube || '#',
    icon: Youtube,
    color: 'hover:text-red-500',
  },
  {
    label: 'Facebook',
    href: siteConfig.author.social.facebook || '#',
    icon: Facebook,
    color: 'hover:text-blue-600',
  },
  {
    label: 'LinkedIn',
    href: siteConfig.author.social.linkedin || '#',
    icon: Linkedin,
    color: 'hover:text-blue-700',
  },
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Feather className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you&apos;re a reader, fellow writer, literary agent, or publisher — I&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-6">
          <Card className="h-fit">
            <CardContent className="pt-6">
              <h2 className="mb-4 text-xl font-semibold">Say Hello</h2>
              <p className="mb-6 text-muted-foreground">
                For collaborations, readings, publishing inquiries, or sharing your favorite poem — reach out anytime.
              </p>

              <a
                href={`mailto:${siteConfig.author.email}`}
                className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {siteConfig.author.email}
                  </p>
                </div>
              </a>
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardContent className="pt-6">
              <h2 className="mb-4 text-xl font-semibold">Connect</h2>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent/50 ${link.color}`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="font-medium">{link.label}</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* For Professionals */}
        <div className="space-y-6">
          <Card className="h-fit">
            <CardContent className="pt-6">
              <h2 className="mb-4 text-xl font-semibold">
                For Literary Agents & Publishers
              </h2>
              <p className="mb-4 text-muted-foreground">
                I&apos;m open to publishing opportunities, anthology contributions, and literary events. Please reach out via email with details about your project.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✦ Available for poetry readings and literary events</p>
                <p>✦ Open to anthology submissions and collaborations</p>
                <p>✦ Interested in translation projects (Hindi ↔ English)</p>
              </div>
              <a href={`mailto:${siteConfig.author.email}?subject=Publishing%20Inquiry`}>
                <Button className="mt-6 w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Inquiry
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardContent className="pt-6">
              <h2 className="mb-4 text-xl font-semibold">For Readers</h2>
              <p className="mb-4 text-muted-foreground">
                Your words mean the world to me. If a poem moved you, a story stayed with you, or you simply want to share a thought — I read every message.
              </p>
              <p className="text-sm italic text-muted-foreground">
                &ldquo;The best conversations happen between a writer and a reader who truly listens.&rdquo;
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
