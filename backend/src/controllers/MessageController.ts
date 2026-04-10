import { Response } from 'express';
import { MessageService } from '../services/MessageService';
import { UserService } from '../services/UserService';
import { AuthRequest } from '../middleware/authMiddleware';

export class MessageController {
  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {}

  sendMessage = (req: AuthRequest, res: Response): void => {
    try {
      const { receiverId, content } = req.body;
      if (!receiverId || !content) { res.status(400).json({ error: 'receiverId and content required' }); return; }
      const receiver = this.userService.getUserById(receiverId as string);
      if (!receiver) { res.status(404).json({ error: 'Receiver not found' }); return; }
      const message = this.messageService.sendMessage(req.userId!, receiverId as string, content);
      res.status(201).json({ message: message.toJSON() });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  };

  getConversation = (req: AuthRequest, res: Response): void => {
    const messages = this.messageService.getConversation(req.userId!, req.params.userId as string);
    res.json({ messages: messages.map(m => m.toJSON()) });
  };

  getConversationPartners = (req: AuthRequest, res: Response): void => {
    const partnerIds = this.messageService.getConversationPartners(req.userId!);
    const partners = partnerIds.map(id => {
      const user = this.userService.getUserById(id);
      const profile = this.userService.getProfileByUserId(id);
      return user ? { ...user.toJSON(), profile: profile?.toJSON() } : null;
    }).filter(Boolean);
    res.json({ partners });
  };
}
