import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto.tos';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {
  }

  findUserByUsername(username: string): Promise<User | undefined> {
    return this.repository.findOne({username: username.toLowerCase()});
  }

  async add(body: CreateUserDto, throwError = true): Promise<User> {
    const found = await this.findUserByUsername(body.username);
    if (found) {
      if (throwError) {
        throw new BadRequestException('Email already exists.');
      } else {
        return found;
      }
    }
    const user = new User();
    user.username = body.username.toLowerCase();
    user.password = body.password;
    user.role = body.role;
    return this.repository.save(user);
  }

}
