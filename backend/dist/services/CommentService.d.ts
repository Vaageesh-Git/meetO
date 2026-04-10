import { Comment } from '../models/Comment';
import { PostService } from './PostService';
import { NotificationService } from './NotificationService';
export declare class CommentService {
    private postService;
    private notificationService;
    private comments;
    constructor(postService: PostService, notificationService: NotificationService);
    addComment(postId: string, userId: string, content: string): Comment;
    getCommentsByPostId(postId: string): Comment[];
    editComment(commentId: string, userId: string, content: string): Comment;
    deleteComment(commentId: string, userId: string): void;
}
//# sourceMappingURL=CommentService.d.ts.map