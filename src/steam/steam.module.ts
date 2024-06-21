import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SteamController } from './steam.controller';
import { SteamService } from './steam.service';

@Module({
  imports: [HttpModule],
  controllers: [SteamController],
  providers: [SteamService],
})
export class SteamModule {}
