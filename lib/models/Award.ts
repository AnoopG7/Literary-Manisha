import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAward extends Document {
  title: string;
  issuingBody: string;
  year: number;
  description: string;
  image?: string;
  createdAt: Date;
}

const AwardSchema = new Schema<IAward>(
  {
    title: {
      type: String,
      required: [true, 'Award title is required'],
      trim: true,
    },
    issuingBody: {
      type: String,
      required: [true, 'Issuing body is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

AwardSchema.index({ year: -1 });

const Award: Model<IAward> =
  mongoose.models.Award || mongoose.model<IAward>('Award', AwardSchema);

export default Award;
