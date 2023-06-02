import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUUID } from 'class-validator';

export class CreateQuestionDto {

  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsUUID()
  categoryId: string;

  @ApiProperty()
  @IsArray()
  options: string[];

  @ApiProperty()
  @IsString()
  answer: string;
}
