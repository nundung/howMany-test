import { Controller, Get, Query } from '@nestjs/common';
import { LolService } from './lol.service';
import { GetUserDto } from './dto/getUser.dto';

@Controller('lol')
export class LolController {
  constructor(private lolService: LolService) {}

  @Get('user')
  async getUser(@Query() getUserDto: GetUserDto) {
    return await this.lolService.getUserPuuId(getUserDto);
  }
}
