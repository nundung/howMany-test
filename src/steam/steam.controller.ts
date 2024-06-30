import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { SteamService } from './steam.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('steam')
export class SteamController {
  constructor(private readonly steamService: SteamService) {}

  @Get('login')
  @UseGuards(AuthGuard('steam'))
  async steamLogin() {
    // Passport가 자동으로 리디렉션합니다.
  }

  @Get('return')
  @UseGuards(AuthGuard('steam'))
  steamReturn(@Req() req: Request, @Res() res: Response) {
    res.redirect('/steam');
  }

  @Get('')
  root(@Res() res: Response) {
    res.send('Hello World!'); // 기본 라우트 핸들러
  }

  @Get('search')
  async serchUser(@Res() res: Response) {
    const search = await this.steamService.searchUser;
  }

  @Get('userinfo')
  async getUserInfo(@Query('id') id: string) {
    const games = await this.steamService.getOwnedGames(id);
    const user = await this.steamService.getPlayerSummaries(id);
    return { games, user };
  }
}
