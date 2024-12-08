/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 5000,
      limit: 1,
    }]),
    MongooseModule.forRoot('mongodb://localhost:27017/autenticacion'),
    AuthModule,
    BookModule,
  ],
})
export class AppModule {}
