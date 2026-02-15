import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import Book from '@/lib/models/Book';
import { auth } from '@/lib/auth';

// GET /api/books — List all books (public)
export async function GET() {
  try {
    const db = await dbConnect();
    if (!db) {
      return NextResponse.json(
        { error: 'Database not connected' },
        { status: 503 }
      );
    }

    const books = await Book.find().sort({ publicationYear: -1 }).lean();
    return NextResponse.json(books);
  } catch (error) {
    console.error('GET /api/books error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

// POST /api/books — Create new book (auth required)
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
    const book = await Book.create(body);

    // Revalidate pages that show books
    revalidatePath('/books');
    revalidatePath('/');

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error('POST /api/books error:', error);
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    );
  }
}
