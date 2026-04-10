import { Response } from 'express';
import { NotificationService } from '../services/NotificationService';
import { AuthRequest } from '../middleware/authMiddleware';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    getNotifications: (req: AuthRequest, res: Response) => void;
    markAsRead: (req: AuthRequest, res: Response) => void;
}
//# sourceMappingURL=NotificationController.d.ts.map