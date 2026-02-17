'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { DeleteDialog } from '@/components/admin/delete-dialog';
import { ImageUpload } from '@/components/admin/image-upload';
import { Award } from '@/types';

const emptyAward = {
  title: '',
  issuingBody: '',
  year: new Date().getFullYear(),
  description: '',
  image: '',
};

export default function AdminAwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Award | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState(emptyAward);

  const fetchAwards = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/awards');
      if (res.ok) {
        setAwards(await res.json());
      }
    } catch (error) {
      console.error('Failed to fetch awards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  const openCreateForm = () => {
    setEditingAward(null);
    setFormData(emptyAward);
    setShowForm(true);
  };

  const openEditForm = (award: Award) => {
    setEditingAward(award);
    setFormData({
      title: award.title,
      issuingBody: award.issuingBody,
      year: award.year,
      description: award.description,
      image: award.image || '',
    });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (editingAward) {
        const res = await fetch(`/api/awards/${editingAward._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          await fetchAwards();
          setShowForm(false);
          toast.success('Award updated successfully!');
        } else {
          const error = await res.json();
          toast.error(error.error || 'Failed to update award');
        }
      } else {
        const res = await fetch('/api/awards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          await fetchAwards();
          setShowForm(false);
          toast.success('Award created successfully!');
        } else {
          const error = await res.json();
          toast.error(error.error || 'Failed to create award');
        }
      }
    } catch (error) {
      console.error('Failed to save award:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/awards/${deleteTarget._id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setAwards(awards.filter((a) => a._id !== deleteTarget._id));
        setDeleteTarget(null);
        toast.success('Award deleted successfully!');
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to delete award');
      }
    } catch (error) {
      console.error('Failed to delete award:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Awards</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Manage your awards and recognition.
          </p>
        </div>
        <Button onClick={openCreateForm} size="sm" className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Award
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            All Awards ({awards.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : awards.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              No awards yet. Add your first one!
            </p>
          ) : (
            <div className="divide-y divide-border">
              {awards.map((award) => (
                <div
                  key={award._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {award.image ? (
                      <div className="relative h-10 w-10 rounded-full border border-border flex-shrink-0 overflow-hidden">
                        <Image
                          src={award.image}
                          alt={award.title}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                        <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{award.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {award.issuingBody} · {award.year}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 self-end sm:self-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditForm(award)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(award)}
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
              {editingAward ? 'Edit Award' : 'Add New Award'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Award Title</label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Award name..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Issuing Body</label>
                <Input
                  value={formData.issuingBody}
                  onChange={(e) =>
                    setFormData({ ...formData, issuingBody: e.target.value })
                  }
                  placeholder="Organization name..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Year</label>
                <Input
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      year: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Award description..."
                className="min-h-[80px]"
              />
            </div>
            <ImageUpload
              value={formData.image}
              onChange={(url) =>
                setFormData({ ...formData, image: url })
              }
              label="Award Image (optional)"
              placeholder="Upload award certificate or badge"
            />
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
              disabled={
                isSubmitting ||
                !formData.title ||
                !formData.issuingBody ||
                !formData.description
              }
            >
              {isSubmitting
                ? 'Saving...'
                : editingAward
                  ? 'Update Award'
                  : 'Add Award'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={deleteTarget?.title || 'this award'}
        isLoading={isDeleting}
      />
    </div>
  );
}
