import { NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import dbConnect from '@/lib/db';
import Book from '@/lib/models/Book';
import { auth } from '@/lib/auth';

// PUT /api/books/[id]
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

    const book = await Book.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error('PUT /api/books/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update book' },
      { status: 500 }
    );
  }
}

// DELETE /api/books/[id]
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
    
    // Find the book first to get the coverImage URL
    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    // Delete blob image if it exists and is a Vercel Blob URL
    if (book.coverImage && book.coverImage.includes('blob.vercel-storage.com')) {
      try {
        await del(book.coverImage);
      } catch (blobError) {
        console.error('Failed to delete blob:', blobError);
        // Continue with deletion even if blob deletion fails
      }
    }

    // Delete the book from database
    await Book.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/books/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete book' },
      { status: 500 }
    );
  }
}
