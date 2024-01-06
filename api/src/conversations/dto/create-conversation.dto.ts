import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  recipientId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;
}
