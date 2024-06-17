import { Controller, Get, Query } from '@nestjs/common';
import { LolService } from './lol.service';
import { AccountDto } from './dto/account.dto';

@Controller('lol')
export class LolController {
  constructor(private lolService: LolService) {}

  @Get('user')
  async getUser(@Query() accountDto: AccountDto) {
    const puuid = await this.lolService.getUserPuuid(accountDto);

    return await this.lolService.getSummoner(puuid);
  }
}
