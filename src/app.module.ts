import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 사용 가능하게 설정
    }),
    HttpModule,
    AuthModule,
  ],
})
export class AppModule {}
