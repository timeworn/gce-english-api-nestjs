import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostAnswerDto {

  @ApiProperty()
  @IsString()
  answer: string;

}
