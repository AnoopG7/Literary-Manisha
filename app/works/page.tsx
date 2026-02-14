'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { categories, languages } from '@/lib/config';
import type { Work } from '@/types';

export default function WorksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLanguage, setActiveLanguage] = useState<string>('all');
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch works from API
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/works');
        if (!response.ok) {
          throw new Error('Failed to fetch works');
        }
        const data = await response.json();
        setWorks(data);
      } catch (err) {
        console.error('Error fetching works:', err);
        setError('Failed to load works. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorks();
  }, []);

  const publishedWorks = works.filter((w) => w.status === 'published');

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    publishedWorks.forEach((w) => w.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).filter((t) => t !== 'featured');
  }, [publishedWorks]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter works
  const filteredWorks = useMemo(() => {
    return publishedWorks.filter((work) => {
      // Category filter
      if (activeCategory !== 'all' && work.category !== activeCategory) return false;

      // Language filter
      if (activeLanguage !== 'all' && work.language !== activeLanguage) return false;

      // Tag filter
      if (selectedTags.length > 0 && !selectedTags.some((t) => work.tags.includes(t))) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          work.title.toLowerCase().includes(query) ||
          work.content.toLowerCase().includes(query) ||
          work.tags.some((t) => t.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [publishedWorks, activeCategory, activeLanguage, selectedTags, searchQuery]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Works</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Explore my collection of poetry, stories, and essays — in Hindi and English.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search works..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full bg-secondary/50 border-border/50 focus-visible:ring-primary/30"
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap items-center gap-4">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-secondary/50 rounded-full h-9">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.value}
                    value={cat.value}
                    className="rounded-full text-xs px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Language filter */}
            <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
              <TabsList className="bg-secondary/50 rounded-full h-9">
                {languages.map((lang) => (
                  <TabsTrigger
                    key={lang.value}
                    value={lang.value}
                    className="rounded-full text-xs px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {lang.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Tag chips */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mr-2">
              <Filter className="h-3 w-3" />
              Tags:
            </div>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                className="cursor-pointer text-xs rounded-full transition-colors hover:bg-primary/10"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="text-xs text-primary hover:underline ml-2"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-muted-foreground">
          Showing {filteredWorks.length} of {publishedWorks.length} works
        </p>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Loading works...</p>
            </div>
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <p className="text-lg text-destructive">{error}</p>
          </div>
        ) : filteredWorks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorks.map((work) => (
              <Link key={work._id} href={`/works/${work.slug}`}>
                <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 border-border/50 bg-card hover:border-primary/20">
                  <CardContent className="p-6">
                    {/* Category + Language */}
                    <div className="mb-4 flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {work.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {work.language === 'hindi' ? 'हिंदी' : work.language === 'bilingual' ? 'Bilingual' : 'English'}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className={`mb-3 text-lg font-semibold transition-colors group-hover:text-primary leading-tight ${work.language === 'hindi' ? 'font-hindi' : ''}`}>
                      {work.title}
                    </h3>

                    {/* Excerpt */}
                    <p className={`text-sm text-muted-foreground leading-relaxed line-clamp-3 ${work.language === 'hindi' ? 'font-hindi' : ''}`}>
                      {work.excerpt}
                    </p>

                    {/* Tags + Date */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex gap-1 flex-wrap">
                        {work.tags.filter((t) => t !== 'featured').slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs text-muted-foreground/60">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground/60">
                        {new Date(work.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No works found matching your filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setActiveLanguage('all');
                setSelectedTags([]);
              }}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
