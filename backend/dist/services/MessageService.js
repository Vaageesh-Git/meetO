"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const Message_1 = require("../models/Message");
class MessageService {
    constructor() {
        this.messages = [];
    }
    sendMessage(senderId, receiverId, content) {
        if (!content.trim())
            throw new Error('Message cannot be empty');
        const message = new Message_1.Message(senderId, receiverId, content.trim());
        this.messages.push(message);
        return message;
    }
    getConversation(userId1, userId2) {
        return this.messages
            .filter(m => (m.getSenderId() === userId1 && m.getReceiverId() === userId2) ||
            (m.getSenderId() === userId2 && m.getReceiverId() === userId1))
            .sort((a, b) => a.getCreatedAt().getTime() - b.getCreatedAt().getTime());
    }
    // Get list of unique conversation partner IDs for a user
    getConversationPartners(userId) {
        const partners = new Set();
        for (const m of this.messages) {
            if (m.getSenderId() === userId)
                partners.add(m.getReceiverId());
            if (m.getReceiverId() === userId)
                partners.add(m.getSenderId());
        }
        return Array.from(partners);
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=MessageService.js.map