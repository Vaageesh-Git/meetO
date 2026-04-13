import { IRepository } from './interfaces/IRepository';
import { User } from '../models/User';
import { UserModel } from './schemas/UserSchema';

export class UserRepository implements IRepository<User> {
  
  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email });
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  async findByUsername(username: string): Promise<User | null> {
    const doc = await UserModel.findOne({ username });
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  async findAll(): Promise<User[]> {
    const docs = await UserModel.find();
    return docs.map(this.mapToDomain);
  }

  async create(user: User): Promise<User> {
    const doc = new UserModel({
      _id: user.getId(),
      username: user.getUsername(),
      email: user.getEmail(),
      passwordHash: user.getPasswordHash(),
      profileId: user.getProfileId()
      // createdAt is handled by mongoose timestamps, or we could pass user.getCreatedAt()
    });
    await doc.save();
    return user;
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const updateData: any = {};
    // Extract values that can be updated
    if (user.getUsername) updateData.username = user.getUsername();
    if (user.getEmail) updateData.email = user.getEmail();
    if (user.getPasswordHash) updateData.passwordHash = user.getPasswordHash();

    const doc = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  private mapToDomain(doc: any): User {
    // Reconstruct domain object logic. 
    // Using an adapter pattern to inject properties without modifying constructor
    const user = new User(doc.username, doc.email, doc.passwordHash);
    
    // Bypassing private modifiers to rehydrate state from DB
    Object.assign(user, {
      id: doc._id,
      profileId: doc.profileId,
      createdAt: doc.createdAt
    });
    
    return user;
  }
}
