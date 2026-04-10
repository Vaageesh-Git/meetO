import { Like } from '../models/Like';
import { PostService } from './PostService';
import { NotificationService } from './NotificationService';
export declare class LikeService {
    private postService;
    private notificationService;
    private likes;
    constructor(postService: PostService, notificationService: NotificationService);
    private key;
    likePost(postId: string, userId: string): Like;
    unlikePost(postId: string, userId: string): void;
    isLiked(postId: string, userId: string): boolean;
    getLikesByPostId(postId: string): Like[];
}
//# sourceMappingURL=LikeService.d.ts.map