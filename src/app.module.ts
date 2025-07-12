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
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@common/filter/http-expection.filter';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`),
    AuthModule, 
    UsersModule, 
    CartModule, 
    CashRegisterModule, 
    BusinessModule],
  controllers: [AppController],
  providers: [AppService, 
    BusinessService, 
    { 
      provide: APP_FILTER, 
      useClass: HttpExceptionFilter 
    }
  ],
})
export class AppModule {}
