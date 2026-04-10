export declare class Post {
    private id;
    private userId;
    private content;
    private imageUrl;
    private likeCount;
    private commentCount;
    private createdAt;
    private updatedAt;
    constructor(userId: string, content: string, imageUrl?: string);
    getId(): string;
    getUserId(): string;
    getContent(): string;
    getImageUrl(): string;
    getLikeCount(): number;
    getCommentCount(): number;
    getCreatedAt(): Date;
    getUpdatedAt(): Date;
    setContent(content: string): void;
    setImageUrl(url: string): void;
    incrementLikeCount(): void;
    decrementLikeCount(): void;
    incrementCommentCount(): void;
    decrementCommentCount(): void;
    toJSON(): {
        id: string;
        userId: string;
        content: string;
        imageUrl: string;
        likeCount: number;
        commentCount: number;
        createdAt: Date;
        updatedAt: Date;
    };
}
//# sourceMappingURL=Post.d.ts.map