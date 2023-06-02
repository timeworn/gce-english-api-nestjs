import { ApiProperty } from '@nestjs/swagger';

export class Pagination<T> {

  @ApiProperty({isArray: true})
  data: T[];

  @ApiProperty()
  count: number;

  constructor(data: T[]) {
    this.data = data;
    this.count = data.length;
  }
}
