import dbConnect from '@/lib/db';
import WorkModel from '@/lib/models/Work';
import BookModel from '@/lib/models/Book';
import AwardModel from '@/lib/models/Award';
import { Work, Book, Award } from '@/types';

// Helper to convert Mongoose document to plain object
function toPlainObject<T>(doc: unknown): T {
  const obj = JSON.parse(JSON.stringify(doc));
  if (obj._id) {
    obj._id = obj._id.toString();
  }
  return obj as T;
}

// ===== Works =====

export async function getWorks(options?: {
  category?: string;
  language?: string;
  tag?: string;
  search?: string;
  status?: string;
}): Promise<Work[]> {
  const db = await dbConnect();

  if (!db) {
    console.error('Database connection failed');
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: Record<string, any> = {
    status: options?.status || 'published',
  };

  if (options?.category && options.category !== 'all') {
    query.category = options.category;
  }
  if (options?.language && options.language !== 'all') {
    query.language = options.language;
  }
  if (options?.tag) {
    query.tags = options.tag;
  }
  if (options?.search) {
    query.$text = { $search: options.search };
  }

  const works = await WorkModel.find(query)
    .sort({ createdAt: -1 })
    .lean();

  return works.map((w) => toPlainObject<Work>(w));
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const db = await dbConnect();

  if (!db) {
    console.error('Database connection failed');
    return null;
  }

  const work = await WorkModel.findOne({ slug }).lean();
  return work ? toPlainObject<Work>(work) : null;
}

export async function getFeaturedWorks(limit = 3): Promise<Work[]> {
  const db = await dbConnect();

  if (!db) {
    console.error('Database connection failed');
    return [];
  }

  const works = await WorkModel.find({
    status: 'published',
    tags: 'featured',
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return works.map((w) => toPlainObject<Work>(w));
}

export async function getAllWorkSlugs(): Promise<string[]> {
  const db = await dbConnect();

  if (!db) {
    console.error('Database connection failed');
    return [];
  }

  const works = await WorkModel.find({ status: 'published' })
    .select('slug')
    .lean();

  return works.map((w) => w.slug);
}

// ===== Books =====

export async function getBooks(): Promise<Book[]> {
  const db = await dbConnect();

  if (!db) {
    console.error('Database connection failed');
    return [];
  }

  const books = await BookModel.find()
    .sort({ publicationYear: -1 })
    .lean();

  return books.map((b) => toPlainObject<Book>(b));
}

export async function getFeaturedBooks(limit = 3): Promise<Book[]> {
  const db = await dbConnect();

  if (!db) {
    console.error('Database connection failed');
    return [];
  }

  const books = await BookModel.find({ featured: true })
    .sort({ publicationYear: -1 })
    .limit(limit)
    .lean();

  return books.map((b) => toPlainObject<Book>(b));
}

// ===== Awards =====

export async function getAwards(): Promise<Award[]> {
  const db = await dbConnect();

  if (!db) {
    console.error('Database connection failed');
    return [];
  }

  const awards = await AwardModel.find()
    .sort({ year: -1 })
    .lean();

  return awards.map((a) => toPlainObject<Award>(a));
}

// ===== Admin: All Works (including drafts) =====

export async function getAllWorks(): Promise<Work[]> {
  const db = await dbConnect();

  if (!db) {
    console.error('Database connection failed');
    return [];
  }

  const works = await WorkModel.find()
    .sort({ createdAt: -1 })
    .lean();

  return works.map((w) => toPlainObject<Work>(w));
}

// ===== Stats =====

export async function getStats(): Promise<{
  works: number;
  books: number;
  awards: number;
}> {
  const db = await dbConnect();

  if (!db) {
    console.error('Database connection failed');
    return { works: 0, books: 0, awards: 0 };
  }

  const [works, books, awards] = await Promise.all([
    WorkModel.countDocuments({ status: 'published' }),
    BookModel.countDocuments(),
    AwardModel.countDocuments(),
  ]);

  return { works, books, awards };
}
