import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(32)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(32)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 30)
  password: string;
}
