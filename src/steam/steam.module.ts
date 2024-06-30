import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SteamController } from './steam.controller';
import { SteamService } from './steam.service';
import { PassportModule } from '@nestjs/passport';
import { SteamStrategy } from './steam.strategy';

@Module({
  imports: [HttpModule, PassportModule.register({ session: true })],
  controllers: [SteamController],
  providers: [SteamService, SteamStrategy],
})
export class SteamModule {}
