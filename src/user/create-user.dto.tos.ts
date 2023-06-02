import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../common/role';

export class CreateUserDto {

  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty({enum: Role})
  @IsEnum(Role)
  readonly role: Role;
}
