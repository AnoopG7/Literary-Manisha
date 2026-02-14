'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteDialog } from '@/components/admin/delete-dialog';
import { Work } from '@/types';

export default function AdminWorksPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Work | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchWorks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/works?status=all');
      if (res.ok) {
        const data = await res.json();
        setWorks(data);
      }
    } catch (error) {
      console.error('Failed to fetch works:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/works/${deleteTarget._id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setWorks(works.filter((w) => w._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (error) {
      console.error('Failed to delete work:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredWorks = works.filter(
    (w) =>
      w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.category.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'poem': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'story': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'essay': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Works</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Manage your poems, stories, and essays.
          </p>
        </div>
        <Link href="/admin/works/new">
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Work
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search works..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Works List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            All Works ({filteredWorks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : filteredWorks.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                {search ? 'No works match your search.' : 'No works yet. Create your first one!'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredWorks.map((work) => (
                <div
                  key={work._id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{work.title}</h3>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getCategoryColor(work.category)}`}>
                        {work.category}
                      </span>
                      <Badge
                        variant={work.status === 'published' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {work.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {work.language === 'hindi' ? 'हिंदी' : work.language}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(work.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/works/${work._id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(work)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <DeleteDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={deleteTarget?.title || 'this work'}
        description="This will permanently delete this work. This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
}
