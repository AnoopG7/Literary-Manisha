import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import Award from '@/lib/models/Award';
import { auth } from '@/lib/auth';

// GET /api/awards — List all awards (public)
export async function GET() {
  try {
    const db = await dbConnect();
    if (!db) {
      return NextResponse.json(
        { error: 'Database not connected' },
        { status: 503 }
      );
    }

    const awards = await Award.find().sort({ year: -1 }).lean();
    return NextResponse.json(awards);
  } catch (error) {
    console.error('GET /api/awards error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch awards' },
      { status: 500 }
    );
  }
}

// POST /api/awards — Create new award (auth required)
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
    const award = await Award.create(body);

    // Revalidate pages that show awards
    revalidatePath('/about');
    revalidatePath('/');

    return NextResponse.json(award, { status: 201 });
  } catch (error) {
    console.error('POST /api/awards error:', error);
    return NextResponse.json(
      { error: 'Failed to create award' },
      { status: 500 }
    );
  }
}
