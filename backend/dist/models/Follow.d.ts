export declare class Follow {
    private id;
    private followerId;
    private followeeId;
    private createdAt;
    constructor(followerId: string, followeeId: string);
    getId(): string;
    getFollowerId(): string;
    getFolloweeId(): string;
    getCreatedAt(): Date;
    toJSON(): {
        id: string;
        followerId: string;
        followeeId: string;
        createdAt: Date;
    };
}
//# sourceMappingURL=Follow.d.ts.map