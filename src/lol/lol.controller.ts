import { Controller, Get, Query } from '@nestjs/common';
import { LolService } from './lol.service';
import { AccountDto } from './dto/account.dto';
import { SummonerDto } from './dto/summoner.dto';

@Controller('lol')
export class LolController {
  constructor(private lolService: LolService) {}

  @Get('user')
  async getUser(@Query() accountDto: AccountDto) {
    //소환사 닉네임과 태그로 puuid 불러옴
    const puuid = await this.lolService.getUserPuuid(accountDto);

    //puuid를 이용해 소환사 정보를 불러옴
    const summoner: SummonerDto = await this.lolService.getSummoner(puuid);
    // console.log(summoner);

    //puuid를 이용해 소환사의 매치 정보를 불러옴
    const matchIds = await this.lolService.getMatchIds(puuid);
    // console.log(matchIds);

    // matchIds를 이용해 소환사의 전체 플레이 시간을 불러옴
    let totalPlaytime = 0;
    await Promise.all(
      matchIds.map(async (matchId) => {
        const playtime = await this.lolService.getPlaytime(matchId);
        totalPlaytime += playtime;
      }),
    );
    return {
      summoner,
      totalPlaytime,
    };
  }
}
