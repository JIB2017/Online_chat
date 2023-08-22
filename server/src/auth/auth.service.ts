import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Validamos al usuario
  async validateUser(username: string, password: string): Promise<any> {
    const user = this.userService.getUser({ username });
    if (!user) {
      throw new NotFoundException();
    }

    const isMatch = await bcrypt.compare(password, (await user).password);
    if (user && isMatch) {
      return user;
    }
  }

  // Registramos al usuario
  // async register(username: string, pass: string): Promise<any> {
  //   const user = this.userService.getUser(username);
  //   if (user?.password !== user) {
  //     throw new UnauthorizedException();
  //   }
  // }

  async login(loginUser: any) {
    const user = await this.validateUser(
      loginUser.username,
      loginUser.password,
    );

    if (user) {
      const payload = { user: user.username, sub: user._id };

      return {
        accesToken: this.jwtService.sign(payload),
      };
    }
  }
}
