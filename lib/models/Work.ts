import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWork extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: 'poem' | 'story' | 'essay' | 'other';
  tags: string[];
  language: 'hindi' | 'english' | 'bilingual';
  status: 'draft' | 'published';
  featuredImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkSchema = new Schema<IWork>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    excerpt: {
      type: String,
      maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    },
    category: {
      type: String,
      enum: ['poem', 'story', 'essay', 'other'],
      default: 'poem',
    },
    tags: {
      type: [String],
      default: [],
    },
    language: {
      type: String,
      enum: ['hindi', 'english', 'bilingual'],
      default: 'english',
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    featuredImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate excerpt from content if not provided
WorkSchema.pre('save', function () {
  if (!this.excerpt && this.content) {
    this.excerpt =
      this.content
        .replace(/\n/g, ' ')
        .substring(0, 150)
        .trim() + '...';
  }
});

// Auto-generate slug from title if not provided
WorkSchema.pre('validate', function () {
  if (this.title && !this.slug) {
    // Use transliteration for Hindi/Devanagari characters or generate unique slug
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
    
    // If slug is empty or too short (just punctuation was removed), use a timestamp-based slug
    this.slug = baseSlug && baseSlug.length > 0 ? baseSlug : `work-${Date.now()}`;
  }
});

// Index for text search (use default language, don't let our 'language' field override it)
WorkSchema.index(
  { title: 'text', content: 'text', tags: 'text' },
  { 
    default_language: 'none',
    language_override: 'textSearchLanguage' // Use a non-existent field to prevent override
  }
);
WorkSchema.index({ category: 1, language: 1, status: 1 });

const Work: Model<IWork> =
  mongoose.models.Work || mongoose.model<IWork>('Work', WorkSchema);

export default Work;
