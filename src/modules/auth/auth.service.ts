import { LoginDto } from '@modules/auth/dto/login.dto';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';
import * as bcrypt from 'bcrypt'
import { User } from '@database/schemas/user.schema';
import { ObjectId } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto
  ): Promise<LoginResponseDto> {
    const data = await this.usersService.findOne({email: loginDto.username});
    
    if(data.user === null) {
      throw new UnauthorizedException()      
    }

    if (data.user.password !== loginDto.password) {
      throw new UnauthorizedException();
    }

    const {access_token, refreshToken} = await this.generateTokens(data.id, data.user) 

    await this.storeRefreshToken(data.id, refreshToken)
    
    return {
      access_token,
      refreshToken: loginDto.refresh ? refreshToken : ''
    };
  }

  async generateTokens(id: ObjectId, user: User) {
    const payload = { sub: id, email: user.email };

    const access_token = this.jwtService.sign(payload, {});

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });

    return { access_token, refreshToken };
  }

  async storeRefreshToken(userId: ObjectId, token: string) {
    const hashed = await bcrypt.hash(token, 10);
    await this.usersService.update(userId, { refreshToken: hashed });
  }
  
  async verifyRefreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });

      const user = await this.usersService.findOneById(payload.sub);

      console.log(token);
      console.log(user.user?.refreshToken);
      if (!user || !(await bcrypt.compare(token, user.user?.refreshToken))) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return user;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  } 
}
