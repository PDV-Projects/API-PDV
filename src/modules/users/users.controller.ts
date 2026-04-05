import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserValidationPipe } from '@common/pipes/create-user-validation.pipe';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@common/guards/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([]))
  @Post('createUser')
  async createUser(
    @Body(new CreateUserValidationPipe()) createUserDto: CreateUserDto,
  ) {
    const user = this.userService.createUser(createUserDto);
    return user;
  }
}
