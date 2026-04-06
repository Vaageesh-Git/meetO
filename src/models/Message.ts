import { MessageService } from "../services/MessageService";

export class Message {
  private messageId: string;
  private senderId: string;
  private receiverId: string;
  private content: string;
  private timestamp: Date;

  constructor(messageId: string, senderId: string, receiverId: string, content: string) {
    this.messageId = messageId;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.content = content;
    this.timestamp = new Date();
  }

  public getMessageId(): string { return this.messageId; }
  public getSenderId(): string { return this.senderId; }
  public getReceiverId(): string { return this.receiverId; }
  public getContent(): string { return this.content; }

  public sendMessage(): void {
    MessageService.getInstance().addMessage(this);
  }

  public static getConversation(userA: string, userB: string): Message[] {
    return MessageService.getInstance().getConversation(userA, userB);
  }
}
