import { IRepository } from './interfaces/IRepository';
import { Post } from '../models/Post';
import { PostModel } from './schemas/PostSchema';

export class PostRepository implements IRepository<Post> {
  async findById(id: string): Promise<Post | null> {
    const doc = await PostModel.findById(id);
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  async findAll(): Promise<Post[]> {
    const docs = await PostModel.find().sort({ createdAt: -1 });
    return docs.map(this.mapToDomain);
  }

  async findByUserId(userId: string): Promise<Post[]> {
    const docs = await PostModel.find({ userId }).sort({ createdAt: -1 });
    return docs.map(this.mapToDomain);
  }

  async create(post: Post): Promise<Post> {
    const doc = new PostModel({
      _id: post.getId(),
      userId: post.getUserId(),
      content: post.getContent(),
      imageUrl: post.getImageUrl(),
      likeCount: post.getLikeCount(),
      commentCount: post.getCommentCount()
    });
    await doc.save();
    return post;
  }

  async update(id: string, post: Partial<Post>): Promise<Post | null> {
    const updateData: any = {};
    if (post.getContent) updateData.content = post.getContent();
    if (post.getImageUrl) updateData.imageUrl = post.getImageUrl();
    if (post.getLikeCount) updateData.likeCount = post.getLikeCount();
    if (post.getCommentCount) updateData.commentCount = post.getCommentCount();

    const doc = await PostModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  async delete(id: string): Promise<boolean> {
    const result = await PostModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  private mapToDomain(doc: any): Post {
    const post = new Post(doc.userId, doc.content, doc.imageUrl);
    
    // Bypassing private modifiers to rehydrate state from DB
    Object.assign(post, {
      id: doc._id,
      likeCount: doc.likeCount,
      commentCount: doc.commentCount,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    });

    return post;
  }
}
