import { Post } from '../models/Post';

export class PostService {
  private posts: Map<string, Post> = new Map();

  createPost(userId: string, content: string, imageUrl: string = ''): Post {
    const post = new Post(userId, content, imageUrl);
    this.posts.set(post.getId(), post);
    return post;
  }

  getPostById(id: string): Post | undefined {
    return this.posts.get(id);
  }

  getPostsByUserId(userId: string): Post[] {
    return Array.from(this.posts.values())
      .filter(p => p.getUserId() === userId)
      .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime());
  }

  getAllPosts(): Post[] {
    return Array.from(this.posts.values())
      .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime());
  }

  editPost(postId: string, userId: string, content: string, imageUrl?: string): Post {
    const post = this.posts.get(postId);
    if (!post) throw new Error('Post not found');
    if (post.getUserId() !== userId) throw new Error('Unauthorized');
    post.setContent(content);
    if (imageUrl !== undefined) post.setImageUrl(imageUrl);
    return post;
  }

  deletePost(postId: string, userId: string): void {
    const post = this.posts.get(postId);
    if (!post) throw new Error('Post not found');
    if (post.getUserId() !== userId) throw new Error('Unauthorized');
    this.posts.delete(postId);
  }

  getPostsByIds(ids: string[]): Post[] {
    return ids
      .map(id => this.posts.get(id))
      .filter((p): p is Post => p !== undefined)
      .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime());
  }
}
