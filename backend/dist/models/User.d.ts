export declare class User {
    private id;
    private username;
    private email;
    private passwordHash;
    private profileId;
    private createdAt;
    constructor(username: string, email: string, passwordHash: string);
    getId(): string;
    getUsername(): string;
    getEmail(): string;
    getPasswordHash(): string;
    getProfileId(): string;
    getCreatedAt(): Date;
    setUsername(username: string): void;
    setEmail(email: string): void;
    setPasswordHash(hash: string): void;
    toJSON(): {
        id: string;
        username: string;
        email: string;
        profileId: string;
        createdAt: Date;
    };
}
//# sourceMappingURL=User.d.ts.map