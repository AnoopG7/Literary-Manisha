import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import Work from '@/lib/models/Work';
import { auth } from '@/lib/auth';

// GET /api/works — List all works (public)
export async function GET(request: Request) {
  try {
    const db = await dbConnect();
    if (!db) {
      return NextResponse.json(
        { error: 'Database not connected' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const language = searchParams.get('language');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const status = searchParams.get('status') || 'published';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};

    if (status && status !== 'all') query.status = status;
    if (category && category !== 'all') query.category = category;
    if (language && language !== 'all') query.language = language;
    if (tag) query.tags = tag;
    if (search) query.$text = { $search: search };

    const works = await Work.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json(works);
  } catch (error) {
    console.error('GET /api/works error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch works' },
      { status: 500 }
    );
  }
}

// POST /api/works — Create new work (auth required)
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await dbConnect();
    if (!db) {
      return NextResponse.json(
        { error: 'Database not connected' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const work = await Work.create(body);

    // Revalidate pages that show works
    revalidatePath('/works');
    revalidatePath('/');

    return NextResponse.json(work, { status: 201 });
  } catch (error) {
    console.error('POST /api/works error:', error);
    return NextResponse.json(
      { error: 'Failed to create work' },
      { status: 500 }
    );
  }
}
