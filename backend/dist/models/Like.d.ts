export declare class Like {
    private id;
    private postId;
    private userId;
    private createdAt;
    constructor(postId: string, userId: string);
    getId(): string;
    getPostId(): string;
    getUserId(): string;
    getCreatedAt(): Date;
    toJSON(): {
        id: string;
        postId: string;
        userId: string;
        createdAt: Date;
    };
}
//# sourceMappingURL=Like.d.ts.map