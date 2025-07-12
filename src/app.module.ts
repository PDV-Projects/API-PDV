import { Module } from '@nestjs/common';
import { AppController } from '@modules/app/app.controller';
import { AppService } from '@modules/app/app.service';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { CartModule } from '@modules/cart/cart.module';
import { CashRegisterModule } from '@modules/cash-register/cash-register.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessService } from '@modules/business/business.service';
import { BusinessModule } from '@modules/business/business.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`),
    AuthModule, UsersModule, CartModule, CashRegisterModule, BusinessModule],
  controllers: [AppController],
  providers: [AppService, BusinessService],
})
export class AppModule {}
