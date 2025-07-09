import { Module } from '@nestjs/common';
import { AppController } from '@modules/app/app.controller';
import { AppService } from '@modules/app/app.service';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
