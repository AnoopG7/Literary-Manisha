import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { del } from '@vercel/blob';
import dbConnect from '@/lib/db';
import Award from '@/lib/models/Award';
import { auth } from '@/lib/auth';

// PUT /api/awards/[id]
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

    const award = await Award.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!award) {
      return NextResponse.json({ error: 'Award not found' }, { status: 404 });
    }

    // Revalidate pages that show awards
    revalidatePath('/about');
    revalidatePath('/');

    return NextResponse.json(award);
  } catch (error) {
    console.error('PUT /api/awards/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update award' },
      { status: 500 }
    );
  }
}

// DELETE /api/awards/[id]
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
    
    // Find the award first to get the image URL
    const award = await Award.findById(id);

    if (!award) {
      return NextResponse.json({ error: 'Award not found' }, { status: 404 });
    }

    // Delete blob image if it exists and is a Vercel Blob URL
    if (award.image && award.image.includes('blob.vercel-storage.com')) {
      try {
        await del(award.image);
      } catch (blobError) {
        console.error('Failed to delete blob:', blobError);
        // Continue with deletion even if blob deletion fails
      }
    }

    // Delete the award from database
    await Award.findByIdAndDelete(id);

    // Revalidate pages that show awards
    revalidatePath('/about');
    revalidatePath('/');

    return NextResponse.json({ message: 'Award deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/awards/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete award' },
      { status: 500 }
    );
  }
}
