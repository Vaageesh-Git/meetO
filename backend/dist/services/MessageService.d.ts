import { Message } from '../models/Message';
export declare class MessageService {
    private messages;
    sendMessage(senderId: string, receiverId: string, content: string): Message;
    getConversation(userId1: string, userId2: string): Message[];
    getConversationPartners(userId: string): string[];
}
//# sourceMappingURL=MessageService.d.ts.map