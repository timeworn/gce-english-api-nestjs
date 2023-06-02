import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    const flag = await compare(pass, user.password);
    if (!user) {
      return null;
    }
    if (flag) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {username: user.username, sub: user.id, role: user.role};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
