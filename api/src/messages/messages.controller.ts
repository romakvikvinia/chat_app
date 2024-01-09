import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Routes, Services } from '../utils/constants';
import { IMessageService } from './message';
import { GetUser } from '../auth/decorators/user.decorator';
import { User } from '../utils/typeorm';

@Controller(Routes.MESSAGES)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGES)
    private readonly messagesService: IMessageService,
  ) {}

  @Post()
  create(@GetUser() user: User, @Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create({ ...createMessageDto, user });
  }

  @Get()
  findAll() {
    // return this.messagesService.findAll();
  }

  @Get(':id')
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.messagesService.remove(+id);
  }
}
