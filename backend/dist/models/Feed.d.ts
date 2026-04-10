export declare class Feed {
    private userId;
    private postIds;
    private generatedAt;
    constructor(userId: string);
    getUserId(): string;
    getPostIds(): string[];
    getGeneratedAt(): Date;
    setPostIds(postIds: string[]): void;
    toJSON(): {
        userId: string;
        postIds: string[];
        generatedAt: Date;
    };
}
//# sourceMappingURL=Feed.d.ts.map