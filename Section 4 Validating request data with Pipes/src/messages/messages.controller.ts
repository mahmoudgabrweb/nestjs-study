import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages() { }

    @Post()
    createMessage(@Body() body: CreateMessageDto) { }

    @Get("/:id")
    getMessage() { }
}
