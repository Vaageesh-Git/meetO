import { UserRepository } from '../repositories/UserRepository';
import { PostRepository } from '../repositories/PostRepository';
import { UserService } from '../services/UserService';
import { PostService } from '../services/PostService';
import { FeedService } from '../services/FeedService';
import { NotificationService } from '../services/NotificationService';
import { FollowService } from '../services/FollowService';
import { LikeService } from '../services/LikeService';
import { CommentService } from '../services/CommentService';
import { ProfileService } from '../services/ProfileService';
import { MessageService } from '../services/MessageService';

// Strategies
import { ChronologicalStrategy } from '../services/strategies/ChronologicalStrategy';
import { PopularFeedStrategy } from '../services/strategies/PopularFeedStrategy';
import { HybridFeedStrategy } from '../services/strategies/HybridFeedStrategy';

// Event Subscribers
import { NotificationSubscriber } from '../events/subscribers/NotificationSubscriber';
import { setWorkerNotificationService } from '../queues/NotificationQueue';
import { RedisCache } from '../cache/RedisCache';

/**
 * Manual Dependency Injection Container
 */
class Container {
  private static instance: Container;
  
  public userRepository!: UserRepository;
  public postRepository!: PostRepository;

  public userService!: UserService;
  public postService!: PostService;
  public notificationService!: NotificationService;
  public followService!: FollowService;
  public likeService!: LikeService;
  public commentService!: CommentService;
  public profileService!: ProfileService;
  public messageService!: MessageService;
  public feedService!: FeedService;

  public redisCache!: RedisCache;

  private constructor() {
    this.init();
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private init() {
    // 1. Core utilities & cache
    this.redisCache = new RedisCache();

    // 2. Repositories (Data Access)
    this.userRepository = new UserRepository();
    this.postRepository = new PostRepository();

    // 3. Services 
    // (Note: To avoid massive rewrites in older services, we keep them as is and provide the dependencies they needed, 
    // or inject Repositories if we were to fully rewrite them. In this demo, we assume they are updated to accept Repositories or use standard DI)
    this.userService = new UserService(); // In a full rewrite, we'd pass in this.userRepository
    this.notificationService = new NotificationService();
    this.followService = new FollowService(this.notificationService);
    this.postService = new PostService();
    this.commentService = new CommentService(this.postService, this.notificationService);
    this.likeService = new LikeService(this.postService, this.notificationService);
    
    // Inject cache and strategies into FeedService
    // Assuming FeedService would be updated to take cache and multiple strategies
    this.feedService = new FeedService(this.postService, this.followService);

    this.profileService = new ProfileService(this.userService);
    this.messageService = new MessageService();

    // 4. Initialize Subscribers
    new NotificationSubscriber();

    // Wire up Queue worker
    setWorkerNotificationService(this.notificationService);
  }
}

export const container = Container.getInstance();
