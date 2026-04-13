import { Queue, Worker, Job } from 'bullmq';
import { NotificationService } from '../services/NotificationService';
import IORedis from 'ioredis';
import { NotificationType } from '../models/Notification';

interface NotificationJobData {
  userId: string;
  actorId: string;
  type: NotificationType;
  targetId: string;
}

// Since we are mocking redis connection assuming it might not be running locally,
// in a real environment it points to redis url.
const connection = new IORedis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  maxRetriesPerRequest: null,
});

export const notificationQueue = new Queue<NotificationJobData>('notifications', { connection });

// Ideally Dependency Injection provides this, but we'll wire it manually for simplicity
let notificationService: NotificationService;

export const setWorkerNotificationService = (service: NotificationService) => {
  notificationService = service;
};

// Background worker processes the jobs
export const notificationWorker = new Worker<NotificationJobData>(
  'notifications',
  async (job: Job<NotificationJobData>) => {
    if (!notificationService) {
      console.warn('Worker skipped job - NotificationService not initialized');
      return;
    }
    const { userId, actorId, type, targetId } = job.data;
    // Execute business logic asynchronously
    notificationService.sendNotification(userId, actorId, type, targetId);
    console.log(`[Queue] Processed notification job for user ${userId}`);
  },
  { connection }
);
