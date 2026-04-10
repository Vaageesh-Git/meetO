import { Post } from '../models/Post';
export declare class PostService {
    private posts;
    createPost(userId: string, content: string, imageUrl?: string): Post;
    getPostById(id: string): Post | undefined;
    getPostsByUserId(userId: string): Post[];
    getAllPosts(): Post[];
    editPost(postId: string, userId: string, content: string, imageUrl?: string): Post;
    deletePost(postId: string, userId: string): void;
    getPostsByIds(ids: string[]): Post[];
}
//# sourceMappingURL=PostService.d.ts.map