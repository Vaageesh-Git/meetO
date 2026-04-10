export declare class Profile {
    private id;
    private userId;
    private bio;
    private avatarUrl;
    private updatedAt;
    constructor(id: string, userId: string);
    getId(): string;
    getUserId(): string;
    getBio(): string;
    getAvatarUrl(): string;
    getUpdatedAt(): Date;
    setBio(bio: string): void;
    setAvatarUrl(url: string): void;
    toJSON(): {
        id: string;
        userId: string;
        bio: string;
        avatarUrl: string;
        updatedAt: Date;
    };
}
//# sourceMappingURL=Profile.d.ts.map