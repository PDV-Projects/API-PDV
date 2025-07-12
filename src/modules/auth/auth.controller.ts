import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedRequest, AuthGuard } from 'src/common/guards/auth.guard';
import { Response } from 'express';
import { LoginValidationPipe } from '@common/pipes/login-validation.pipe';
import { LoginDto } from './dto/login.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileFieldsInterceptor([]))
  @Post('login')
  async signIn(@Body(new LoginValidationPipe()) loginDto: LoginDto, @Res() res: Response) {
    
    const user = await this.authService.signIn({username: loginDto.username, password: loginDto.password, refresh: loginDto.refresh});
  
    res.status(200).json(user);
  }

  @UseInterceptors(FileFieldsInterceptor([]))
  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    const data = await this.authService.verifyRefreshToken(body.refreshToken);
    const tokens = await this.authService.generateTokens(data.id, data.user!);
    await this.authService.storeRefreshToken(data.id, tokens.refreshToken);
    return tokens;
  }


  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: AuthenticatedRequest) {
    return req.user;
  }

  

  @UseGuards(AuthGuard)
  @Get('validateToken')
  validateToken(@Req() req:Request, @Res() res: Response) {
    res.status(200).json()
  }
}
