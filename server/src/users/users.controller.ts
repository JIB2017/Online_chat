import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltOrRounds);
    const result = await this.UsersService.createUser(username, hashedPass);
    return result;
  }
}
