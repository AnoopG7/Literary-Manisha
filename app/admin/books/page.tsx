'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { DeleteDialog } from '@/components/admin/delete-dialog';
import { Book, Language } from '@/types';

interface BookFormData {
  title: string;
  description: string;
  coverImage: string;
  amazonLink: string;
  genre: string;
  publicationYear: number;
  language: Language;
  featured: boolean;
}

const emptyBook: BookFormData = {
  title: '',
  description: '',
  coverImage: '/images/book-placeholder.jpg',
  amazonLink: '',
  genre: '',
  publicationYear: new Date().getFullYear(),
  language: 'english',
  featured: false,
};

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Book | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<BookFormData>(emptyBook);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/books');
      if (res.ok) {
        setBooks(await res.json());
      }
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const openCreateForm = () => {
    setEditingBook(null);
    setFormData(emptyBook);
    setShowForm(true);
  };

  const openEditForm = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      description: book.description,
      coverImage: book.coverImage,
      amazonLink: book.amazonLink,
      genre: book.genre,
      publicationYear: book.publicationYear,
      language: book.language,
      featured: book.featured,
    });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();

      if (editingBook) {
        const res = await fetch(`/api/books/${editingBook._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, slug }),
        });
        if (res.ok) {
          await fetchBooks();
          setShowForm(false);
        }
      } else {
        const res = await fetch('/api/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, slug }),
        });
        if (res.ok) {
          await fetchBooks();
          setShowForm(false);
        }
      }
    } catch (error) {
      console.error('Failed to save book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/books/${deleteTarget._id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBooks(books.filter((b) => b._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (error) {
      console.error('Failed to delete book:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Books</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Manage your published books.
          </p>
        </div>
        <Button onClick={openCreateForm} size="sm" className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Book
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            All Books ({books.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : books.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              No books yet. Add your first one!
            </p>
          ) : (
            <div className="divide-y divide-border">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-medium">{book.title}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {book.genre}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {book.publicationYear}
                      </span>
                      {book.featured && (
                        <Badge className="text-xs">Featured</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <a
                      href={book.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditForm(book)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(book)}
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

      {/* Create/Edit Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Book title..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Book description..."
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Genre</label>
                <Input
                  value={formData.genre}
                  onChange={(e) =>
                    setFormData({ ...formData, genre: e.target.value })
                  }
                  placeholder="e.g., Poetry"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Year</label>
                <Input
                  type="number"
                  value={formData.publicationYear}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      publicationYear: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amazon Link</label>
              <Input
                value={formData.amazonLink}
                onChange={(e) =>
                  setFormData({ ...formData, amazonLink: e.target.value })
                }
                placeholder="https://www.amazon.in/..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cover Image URL</label>
              <Input
                value={formData.coverImage}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value })
                }
                placeholder="/images/book-cover.jpg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                  <option value="hindi">Hindi</option>
                  <option value="bilingual">Bilingual</option>
                </select>
              </div>
              <div className="flex items-end gap-2 pb-1">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="rounded"
                  />
                  Featured
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowForm(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.title || !formData.amazonLink}
            >
              {isSubmitting
                ? 'Saving...'
                : editingBook
                  ? 'Update Book'
                  : 'Add Book'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={deleteTarget?.title || 'this book'}
        isLoading={isDeleting}
      />
    </div>
  );
}
