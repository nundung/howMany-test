import { Controller, Get, Query } from '@nestjs/common';
import { LolService } from './lol.service';

@Controller('lol')
export class LolController {
  constructor(private lolService: LolService) {}

  @Get('user')
  async getUser(@Query('nickname') nickname: string) {
    return await this.lolService.getUser(nickname);
  }
}
