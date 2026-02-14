import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBook extends Document {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  amazonLink: string;
  genre: string;
  publicationYear: number;
  language: 'hindi' | 'english' | 'bilingual';
  featured: boolean;
  createdAt: Date;
}

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    coverImage: {
      type: String,
      default: '/images/book-placeholder.jpg',
    },
    amazonLink: {
      type: String,
      required: [true, 'Amazon link is required'],
    },
    genre: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      enum: ['hindi', 'english', 'bilingual'],
      default: 'english',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

BookSchema.pre('validate', function () {
  if (this.title && !this.slug) {
    // Use Unicode-friendly slug generation for Hindi/Devanagari characters
    const baseSlug = this.title
      .toLowerCase()
      .trim()
      // Keep Unicode letters, numbers, spaces, and hyphens
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      // Replace spaces with hyphens
      .replace(/\s+/g, '-')
      // Replace multiple hyphens with single hyphen
      .replace(/-+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '');
    
    // If slug is empty or too short, use a timestamp-based slug
    this.slug = baseSlug && baseSlug.length > 0 ? baseSlug : `book-${Date.now()}`;
  }
});


const Book: Model<IBook> =
  mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);

export default Book;
