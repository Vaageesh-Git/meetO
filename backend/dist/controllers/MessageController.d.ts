import { Response } from 'express';
import { MessageService } from '../services/MessageService';
import { UserService } from '../services/UserService';
import { AuthRequest } from '../middleware/authMiddleware';
export declare class MessageController {
    private messageService;
    private userService;
    constructor(messageService: MessageService, userService: UserService);
    sendMessage: (req: AuthRequest, res: Response) => void;
    getConversation: (req: AuthRequest, res: Response) => void;
    getConversationPartners: (req: AuthRequest, res: Response) => void;
}
//# sourceMappingURL=MessageController.d.ts.map