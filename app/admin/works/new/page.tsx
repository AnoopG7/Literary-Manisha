'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TagInput } from '@/components/admin/tag-input';
import { WorkCategory, Language, WorkStatus } from '@/types';

interface WorkFormData {
  title: string;
  content: string;
  excerpt: string;
  category: WorkCategory;
  language: Language;
  tags: string[];
  status: WorkStatus;
}

export default function NewWorkPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<WorkFormData>({
    title: '',
    content: '',
    excerpt: '',
    category: 'poem',
    language: 'english',
    tags: [],
    status: 'draft',
  });

  const handleSubmit = async (status: 'draft' | 'published') => {
    setError('');
    setIsSubmitting(true);

    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const excerpt =
      formData.excerpt ||
      formData.content.replace(/\n/g, ' ').substring(0, 150).trim() + '...';

    try {
      const res = await fetch('/api/works', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug,
          excerpt,
          status,
        }),
      });

      if (res.ok) {
        router.push('/admin/works');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to create work');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isHindi = formData.language === 'hindi' || formData.language === 'bilingual';

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/admin/works">
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">New Work</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Create a new poem, story, or essay.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            size="sm"
            className="flex-shrink-0"
          >
            <Eye className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">{showPreview ? 'Edit' : 'Preview'}</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSubmit('draft')}
            disabled={isSubmitting || !formData.title || !formData.content}
            size="sm"
            className="flex-shrink-0"
          >
            <span className="text-xs sm:text-sm">Save Draft</span>
          </Button>
          <Button
            onClick={() => handleSubmit('published')}
            disabled={isSubmitting || !formData.title || !formData.content}
            size="sm"
            className="flex-shrink-0"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin sm:mr-2" />
                <span className="hidden sm:inline">Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4 sm:mr-2" />
                <span className="text-xs sm:text-sm">Publish</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {showPreview ? (
        /* Preview Mode */
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{formData.category}</Badge>
              <Badge variant="secondary">
                {formData.language === 'hindi' ? 'हिंदी' : formData.language}
              </Badge>
            </div>
            <CardTitle className={`text-2xl ${isHindi ? 'font-hindi' : ''}`}>
              {formData.title || 'Untitled'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`whitespace-pre-wrap leading-relaxed ${isHindi ? 'font-hindi text-lg leading-loose' : ''} ${formData.category === 'poem' ? 'poetry-text' : 'prose-text'}`}>
              {formData.content || 'No content yet...'}
            </div>
            {formData.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        /* Edit Mode */
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Editor */}
          <div className="space-y-4 md:col-span-2">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder={isHindi ? 'शीर्षक लिखें...' : 'Enter title...'}
                    className={isHindi ? 'font-hindi text-lg' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder={
                      isHindi
                        ? 'अपनी रचना यहाँ लिखें...'
                        : 'Write your content here...'
                    }
                    className={`min-h-[400px] resize-y ${isHindi ? 'font-hindi text-lg leading-loose' : 'leading-relaxed'}`}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="excerpt" className="text-sm font-medium">
                    Excerpt{' '}
                    <span className="text-muted-foreground">(optional — auto-generated from content)</span>
                  </label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="Brief description for cards..."
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as 'poem' | 'story' | 'essay' | 'other',
                      })
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="poem">Poetry</option>
                    <option value="story">Story</option>
                    <option value="essay">Essay</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <select
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        language: e.target.value as 'hindi' | 'english' | 'bilingual',
                      })
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="english">English</option>
                    <option value="hindi">हिंदी (Hindi)</option>
                    <option value="bilingual">Bilingual</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <TagInput
                  tags={formData.tags}
                  onChange={(tags) => setFormData({ ...formData, tags })}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Featured</CardTitle>
              </CardHeader>
              <CardContent>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.tags.includes('featured')}
                    onChange={(e) => {
                      const newTags = e.target.checked
                        ? [...formData.tags.filter(t => t !== 'featured'), 'featured']
                        : formData.tags.filter(t => t !== 'featured');
                      setFormData({ ...formData, tags: newTags });
                    }}
                    className="h-4 w-4 rounded border-input"
                  />
                  <span className="text-sm">Show on homepage</span>
                </label>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
