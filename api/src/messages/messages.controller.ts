import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Routes, Services } from '../utils/constants';
import { IMessageService } from './message';
import { GetUser } from '../auth/decorators/user.decorator';
import { User } from '../utils/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Messages')
@Controller(Routes.MESSAGES)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGES)
    private readonly messagesService: IMessageService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async create(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) conversationId: number,
    @Body()
    createMessageDto: CreateMessageDto,
  ) {
    const message = await this.messagesService.create({
      ...createMessageDto,
      conversationId,
      user,
    });

    this.eventEmitter.emit('message.create', message);

    return;
  }

  @Get()
  getMessagesFromConversations(@GetUser() user: User, @Param('id') id: number) {
    return this.messagesService.getMessagesByConversationId(id);
  }
  // @Get(':conversationId')
  // getMessagesFromConversations(
  //   @Param('conversationId') conversationId: number,
  // ) {
  //   // return this.messagesService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    // return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':messageId')
  async remove(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) conversationId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
  ) {
    const message = await this.messagesService.deleteMessage({
      userId: user.id,
      messageId,
      conversationId,
    });

    this.eventEmitter.emit('message.deleted', {
      userId: user.id,
      message,
      conversationId,
    });
    return message;
  }
}
