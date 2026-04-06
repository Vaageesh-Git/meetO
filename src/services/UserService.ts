import { User } from "../models/User";
import { Follow } from "../models/Follow";
import { ISubject, IObserver } from "../patterns/Observer";
import { NotificationService } from "./NotificationService";

export class UserService implements ISubject {
  private static instance: UserService;
  public users: Map<string, User> = new Map();
  public follows: Follow[] = [];
  private observers: IObserver[] = [];

  private constructor() {
    this.addObserver(NotificationService.getInstance());
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  public notifyObservers(actionType: string, payload: any): void {
    for (const obs of this.observers) {
      obs.update(actionType, payload);
    }
  }

  public addUser(user: User): void {
    this.users.set(user.getUserId(), user);
  }

  public getUser(userId: string): User | undefined {
    return this.users.get(userId);
  }

  public addFollow(followerId: string, followeeId: string): void {
    const exists = this.follows.some(f => f.getFollowerId() === followerId && f.getFolloweeId() === followeeId);
    if (!exists) {
      this.follows.push(new Follow(followerId, followeeId));
      this.notifyObservers("FOLLOW_USER", { actorId: followerId, targetUserId: followeeId, resourceId: null });
    }
  }

  public removeFollow(followerId: string, followeeId: string): void {
    this.follows = this.follows.filter(f => !(f.getFollowerId() === followerId && f.getFolloweeId() === followeeId));
  }

  public getFollowingIds(userId: string): string[] {
    return this.follows.filter(f => f.getFollowerId() === userId).map(f => f.getFolloweeId());
  }
}
