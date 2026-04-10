import { v4 as uuidv4 } from 'uuid';

// Singleton pattern — one instance manages all sessions
export class AuthService {
  private static instance: AuthService;
  // token -> userId
  private sessions: Map<string, string> = new Map();

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  createSession(userId: string): string {
    const token = uuidv4();
    this.sessions.set(token, userId);
    return token;
  }

  validateSession(token: string): string | null {
    return this.sessions.get(token) ?? null;
  }

  invalidateSession(token: string): void {
    this.sessions.delete(token);
  }
}
