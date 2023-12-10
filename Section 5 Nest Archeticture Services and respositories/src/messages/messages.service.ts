import { NotFoundException } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

export class MessagesService {
    messagesRepository: MessagesRepository;
    constructor() {
        this.messagesRepository = new MessagesRepository();
    }

    async findOne(id: string) {
        const message = await this.messagesRepository.findOne(id);
        if (!message) {
            throw new NotFoundException("Message not found");
        }
        return message;
    }

    findAll() {
        return this.messagesRepository.findAll();
    }

    create(content: string) {
        return this.messagesRepository.create(content);
    }
}