export class AuthService {
  private static instance: AuthService;
  private sessions: Map<string, string> = new Map(); // token -> userId

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public createSession(userId: string): string {
    const token = `token-${Date.now()}-${Math.random()}`;
    this.sessions.set(token, userId);
    return token;
  }

  public validateSession(token: string): string | null {
    return this.sessions.get(token) || null;
  }

  public invalidateSession(token: string): void {
    this.sessions.delete(token);
  }
}
