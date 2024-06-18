import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map } from 'rxjs';
import { AccountDto } from './dto/account.dto';
import { SummonerDto } from './dto/summoner.dto';

@Injectable()
export class LolService {
  constructor(private readonly httpService: HttpService) {}

  // ACCOUNT-V1 문서: Get account by riot id
  async getUserPuuid(accountDto: AccountDto): Promise<string> {
    const encodedNickname = encodeURIComponent(accountDto.nickname);
    const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodedNickname}/${accountDto.tag}?api_key=${process.env.RIOT_API_KEY}`;

    const response = await firstValueFrom(
      this.httpService
        .get(url)
        .pipe(map((response: AxiosResponse) => response.data)),
    );
    return response.puuid;
  }

  // SUMMONER-V4 문서: Get a summoner by account ID
  async getSummoner(puuid): Promise<SummonerDto> {
    const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.RIOT_API_KEY}`;

    return await firstValueFrom(
      this.httpService
        .get(url)
        .pipe(map((response: AxiosResponse) => response.data)),
    );
  }
}
