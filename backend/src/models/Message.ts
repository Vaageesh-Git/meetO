import { v4 as uuidv4 } from 'uuid';

export class Message {
  private id: string;
  private senderId: string;
  private receiverId: string;
  private content: string;
  private createdAt: Date;

  constructor(senderId: string, receiverId: string, content: string) {
    this.id = uuidv4();
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.content = content;
    this.createdAt = new Date();
  }

  getId(): string { return this.id; }
  getSenderId(): string { return this.senderId; }
  getReceiverId(): string { return this.receiverId; }
  getContent(): string { return this.content; }
  getCreatedAt(): Date { return this.createdAt; }

  toJSON() {
    return {
      id: this.id,
      senderId: this.senderId,
      receiverId: this.receiverId,
      content: this.content,
      createdAt: this.createdAt,
    };
  }
}
