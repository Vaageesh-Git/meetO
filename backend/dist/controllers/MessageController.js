"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
class MessageController {
    constructor(messageService, userService) {
        this.messageService = messageService;
        this.userService = userService;
        this.sendMessage = (req, res) => {
            try {
                const { receiverId, content } = req.body;
                if (!receiverId || !content) {
                    res.status(400).json({ error: 'receiverId and content required' });
                    return;
                }
                const receiver = this.userService.getUserById(receiverId);
                if (!receiver) {
                    res.status(404).json({ error: 'Receiver not found' });
                    return;
                }
                const message = this.messageService.sendMessage(req.userId, receiverId, content);
                res.status(201).json({ message: message.toJSON() });
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
        this.getConversation = (req, res) => {
            const messages = this.messageService.getConversation(req.userId, req.params.userId);
            res.json({ messages: messages.map(m => m.toJSON()) });
        };
        this.getConversationPartners = (req, res) => {
            const partnerIds = this.messageService.getConversationPartners(req.userId);
            const partners = partnerIds.map(id => {
                const user = this.userService.getUserById(id);
                const profile = this.userService.getProfileByUserId(id);
                return user ? { ...user.toJSON(), profile: profile?.toJSON() } : null;
            }).filter(Boolean);
            res.json({ partners });
        };
    }
}
exports.MessageController = MessageController;
//# sourceMappingURL=MessageController.js.map