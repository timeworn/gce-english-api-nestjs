import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Optional } from '@nestjs/common';

export class QuestionQueryDto {

  @ApiProperty()
  @Optional()
  @IsUUID()
  readonly category?: string;

  @ApiProperty()
  @Optional()
  readonly limit?: number;

  @ApiProperty()
  @Optional()
  readonly skip?: number;
}
