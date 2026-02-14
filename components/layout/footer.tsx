import Link from 'next/link';
import { Feather, Mail, Heart, Linkedin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { siteConfig, navItems } from '@/lib/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Main footer */}
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Feather className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary w-fit"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.author.email}
              </a>
              {siteConfig.author.social.instagram && (
                <a
                  href={siteConfig.author.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary w-fit"
                >
                  Instagram
                </a>
              )}
              {siteConfig.author.social.twitter && (
                <a
                  href={siteConfig.author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary w-fit"
                >
                  Twitter / X
                </a>
              )}
              {siteConfig.author.social.linkedin && (
                <a
                  href={siteConfig.author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary w-fit"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        <Separator className="bg-border/40" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 text-primary fill-primary" /> and words
          </p>
        </div>
      </div>
    </footer>
  );
}
