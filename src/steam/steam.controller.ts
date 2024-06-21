import { Controller, Get, Post, Query } from '@nestjs/common';
import { SteamService } from './steam.service';

@Controller('steam')
export class SteamController {
  constructor(private steamService: SteamService) {}

  @Post('login')
  async login() {
    // await this.steamService.
  }

  @Get('user')
  async getUserInfo(@Query('id') id: string) {
    const games = await this.steamService.getOwnedGames(id);
    const user = await this.steamService.getPlayerSummaries(id);
    return { games, user };
  }
}
