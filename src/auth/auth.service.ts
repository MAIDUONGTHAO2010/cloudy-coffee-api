import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async logIn(
    loginDto: LoginDto
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(loginDto.email);

    if (!user || !await bcrypt.compare(loginDto.password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async me ()
  {}
}
