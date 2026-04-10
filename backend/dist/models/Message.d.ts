export declare class Message {
    private id;
    private senderId;
    private receiverId;
    private content;
    private createdAt;
    constructor(senderId: string, receiverId: string, content: string);
    getId(): string;
    getSenderId(): string;
    getReceiverId(): string;
    getContent(): string;
    getCreatedAt(): Date;
    toJSON(): {
        id: string;
        senderId: string;
        receiverId: string;
        content: string;
        createdAt: Date;
    };
}
//# sourceMappingURL=Message.d.ts.map