import { v4 as uuidv4 } from 'uuid';

export class User {
  private id: string;
  private username: string;
  private email: string;
  private passwordHash: string;
  private profileId: string;
  private createdAt: Date;

  constructor(username: string, email: string, passwordHash: string) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.profileId = uuidv4();
    this.createdAt = new Date();
  }

  getId(): string { return this.id; }
  getUsername(): string { return this.username; }
  getEmail(): string { return this.email; }
  getPasswordHash(): string { return this.passwordHash; }
  getProfileId(): string { return this.profileId; }
  getCreatedAt(): Date { return this.createdAt; }

  setUsername(username: string): void { this.username = username; }
  setEmail(email: string): void { this.email = email; }
  setPasswordHash(hash: string): void { this.passwordHash = hash; }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      profileId: this.profileId,
      createdAt: this.createdAt,
    };
  }
}
