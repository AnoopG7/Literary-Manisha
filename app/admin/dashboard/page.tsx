export const dynamic = 'force-dynamic';

import Link from 'next/link';
import {
  PenTool,
  BookOpen,
  Award,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getStats, getAllWorks } from '@/lib/data';

export default async function AdminDashboardPage() {
  const stats = await getStats();
  const recentWorks = (await getAllWorks()).slice(0, 5);

  const statCards = [
    {
      label: 'Published Content',
      value: stats.works,
      icon: PenTool,
      href: '/admin/works',
      color: 'text-blue-600',
    },
    {
      label: 'Books',
      value: stats.books,
      icon: BookOpen,
      href: '/admin/books',
      color: 'text-green-600',
    },
    {
      label: 'Awards',
      value: stats.awards,
      icon: Award,
      href: '/admin/awards',
      color: 'text-amber-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Welcome back! Here&apos;s an overview of your content.
          </p>
        </div>
        <Link href="/admin/works/new">
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Content
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Content */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Content</CardTitle>
          <Link href="/admin/works">
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentWorks.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No content yet. Create your first piece!
            </p>
          ) : (
            <div className="space-y-3">
              {recentWorks.map((work) => (
                <div
                  key={work._id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{work.title}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {work.category}
                      </Badge>
                      <Badge
                        variant={work.status === 'published' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {work.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(work.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <Link href={`/admin/works/${work._id}/edit`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
