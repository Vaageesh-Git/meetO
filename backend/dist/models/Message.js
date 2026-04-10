"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const uuid_1 = require("uuid");
class Message {
    constructor(senderId, receiverId, content) {
        this.id = (0, uuid_1.v4)();
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.createdAt = new Date();
    }
    getId() { return this.id; }
    getSenderId() { return this.senderId; }
    getReceiverId() { return this.receiverId; }
    getContent() { return this.content; }
    getCreatedAt() { return this.createdAt; }
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
exports.Message = Message;
//# sourceMappingURL=Message.js.map