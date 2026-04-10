export declare class Comment {
    private id;
    private postId;
    private userId;
    private content;
    private createdAt;
    constructor(postId: string, userId: string, content: string);
    getId(): string;
    getPostId(): string;
    getUserId(): string;
    getContent(): string;
    getCreatedAt(): Date;
    setContent(content: string): void;
    toJSON(): {
        id: string;
        postId: string;
        userId: string;
        content: string;
        createdAt: Date;
    };
}
//# sourceMappingURL=Comment.d.ts.map