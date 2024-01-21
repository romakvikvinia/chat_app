import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Inject,
} from '@nestjs/common';

import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Routes, Services } from '../utils/constants';
import { AuthenticatedGuard } from '../auth/guards/session.guard';
import { IConversationsService } from './conversations';
import { GetUser } from '../auth/decorators/user.decorator';
import { User } from '../utils/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { EventEmitter2 } from '@nestjs/event-emitter';

@ApiTags('Conversations')
@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async create(
    @GetUser() user: User,
    @Body() createConversationDto: CreateConversationDto,
  ) {
    const conversation = await this.conversationsService.create(
      user,
      createConversationDto,
    );

    this.eventEmitter.emit('conversation.created', conversation);

    return conversation;
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.conversationsService.getConversations(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.conversationsService.findConversationById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    // return this.conversationsService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.conversationsService.remove(+id);
  }
}
