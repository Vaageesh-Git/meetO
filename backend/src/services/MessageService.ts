import { Message } from '../models/Message';

export class MessageService {
  private messages: Message[] = [];

  sendMessage(senderId: string, receiverId: string, content: string): Message {
    if (!content.trim()) throw new Error('Message cannot be empty');
    const message = new Message(senderId, receiverId, content.trim());
    this.messages.push(message);
    return message;
  }

  getConversation(userId1: string, userId2: string): Message[] {
    return this.messages
      .filter(m =>
        (m.getSenderId() === userId1 && m.getReceiverId() === userId2) ||
        (m.getSenderId() === userId2 && m.getReceiverId() === userId1)
      )
      .sort((a, b) => a.getCreatedAt().getTime() - b.getCreatedAt().getTime());
  }

  // Get list of unique conversation partner IDs for a user
  getConversationPartners(userId: string): string[] {
    const partners = new Set<string>();
    for (const m of this.messages) {
      if (m.getSenderId() === userId) partners.add(m.getReceiverId());
      if (m.getReceiverId() === userId) partners.add(m.getSenderId());
    }
    return Array.from(partners);
  }
}
