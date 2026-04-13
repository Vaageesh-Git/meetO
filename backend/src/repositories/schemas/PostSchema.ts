import mongoose, { Document, Schema } from 'mongoose';

export interface IPostDocument extends Document<string> {
  _id: string; // Sticking to string ID from UUID
  userId: string;
  content: string;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
}

const PostSchema = new Schema<IPostDocument>({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  likeCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
}, {
  timestamps: true // Gives createdAt and updatedAt automatically
});

// Index for getting posts by user
PostSchema.index({ userId: 1, createdAt: -1 });

export const PostModel = mongoose.model<IPostDocument>('Post', PostSchema);
