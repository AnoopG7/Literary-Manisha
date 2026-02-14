import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Work from '@/lib/models/Work';
import { auth } from '@/lib/auth';

// PUT /api/works/[id] — Update work
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();

    const work = await Work.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!work) {
      return NextResponse.json({ error: 'Work not found' }, { status: 404 });
    }

    return NextResponse.json(work);
  } catch (error) {
    console.error('PUT /api/works/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update work' },
      { status: 500 }
    );
  }
}

// DELETE /api/works/[id] — Delete work
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const work = await Work.findByIdAndDelete(id);

    if (!work) {
      return NextResponse.json({ error: 'Work not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Work deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/works/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete work' },
      { status: 500 }
    );
  }
}
