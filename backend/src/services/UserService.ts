import { createHash } from 'crypto';
import { User } from '../models/User';
import { Profile } from '../models/Profile';
import { AuthService } from './AuthService';

export class UserService {
  private users: Map<string, User> = new Map();
  private profiles: Map<string, Profile> = new Map();
  private authService = AuthService.getInstance();

  private hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }

  register(username: string, email: string, password: string): { user: User; token: string } {
    const existing = Array.from(this.users.values()).find(
      u => u.getEmail() === email || u.getUsername() === username
    );
    if (existing) throw new Error('Username or email already taken');

    const user = new User(username, email, this.hashPassword(password));
    this.users.set(user.getId(), user);

    const profile = new Profile(user.getProfileId(), user.getId());
    this.profiles.set(profile.getId(), profile);

    const token = this.authService.createSession(user.getId());
    return { user, token };
  }

  login(email: string, password: string): { user: User; token: string } {
    const user = Array.from(this.users.values()).find(
      u => u.getEmail() === email && u.getPasswordHash() === this.hashPassword(password)
    );
    if (!user) throw new Error('Invalid credentials');

    const token = this.authService.createSession(user.getId());
    return { user, token };
  }

  logout(token: string): void {
    this.authService.invalidateSession(token);
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  updateAccount(userId: string, updates: { username?: string; email?: string }): User {
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found');
    if (updates.username) user.setUsername(updates.username);
    if (updates.email) user.setEmail(updates.email);
    return user;
  }

  deleteAccount(userId: string): void {
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found');
    this.profiles.delete(user.getProfileId());
    this.users.delete(userId);
  }

  getProfileByUserId(userId: string): Profile | undefined {
    return Array.from(this.profiles.values()).find(p => p.getUserId() === userId);
  }

  getProfileById(profileId: string): Profile | undefined {
    return this.profiles.get(profileId);
  }
}
