import mongoose, { Document, Schema } from 'mongoose';

export interface IUserDocument extends Document<string> {
  _id: string; // Sticking to your string IDs or we can let mongoose manage it
  username: string;
  email: string;
  passwordHash: string;
  profileId: string;
}

const UserSchema = new Schema<IUserDocument>({
  _id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  profileId: { type: String, required: true }
}, {
  timestamps: true
});

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
