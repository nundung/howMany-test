import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map } from 'rxjs';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class LolService {
  constructor(private readonly httpService: HttpService) {}

  // ACCOUNT-V1 문서: Get account by riot id
  async getUserPuuid(accountDto: AccountDto): Promise<string> {
    const apiKey = process.env.RIOT_API_KEY;
    const encodedNickname = encodeURIComponent(accountDto.nickname);
    const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodedNickname}/${accountDto.tag}?api_key=${apiKey}`;

    const response = await firstValueFrom(
      this.httpService
        .get(url)
        .pipe(map((response: AxiosResponse) => response.data)),
    );
    return response.puuid;
  }

  // SUMMONER-V4 문서: Get a summoner by account ID
  async getSummoner(puuid) {
    const apiKey = process.env.RIOT_API_KEY;

    const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`;

    return this.httpService
      .get(url)
      .pipe(map((response: AxiosResponse) => response.data));
  }
}
