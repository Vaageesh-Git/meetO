export declare class AuthService {
    private static instance;
    private sessions;
    private constructor();
    static getInstance(): AuthService;
    createSession(userId: string): string;
    validateSession(token: string): string | null;
    invalidateSession(token: string): void;
}
//# sourceMappingURL=AuthService.d.ts.map