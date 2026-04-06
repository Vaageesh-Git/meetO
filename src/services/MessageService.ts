import { Message } from "../models/Message";

export class MessageService {
  private static instance: MessageService;
  private messages: Message[] = [];

  private constructor() {}

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }
    return MessageService.instance;
  }

  public addMessage(message: Message): void {
    this.messages.push(message);
  }

  public getConversation(userA: string, userB: string): Message[] {
    return this.messages.filter(
      (m) => (m.getSenderId() === userA && m.getReceiverId() === userB) ||
             (m.getSenderId() === userB && m.getReceiverId() === userA)
    ).sort((a, b) => a['timestamp'].getTime() - b['timestamp'].getTime()); // Assuming timestamp access
  }
}
