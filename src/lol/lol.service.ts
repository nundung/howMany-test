import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosResponse, HttpStatusCode } from 'axios';
import { firstValueFrom, map } from 'rxjs';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class LolService {
  constructor(private readonly httpService: HttpService) {}

  async getUserPuuid(accountDto: AccountDto): Promise<AccountDto> {
    const apiKey = process.env.RIOT_API_KEY;
    const encodedNickname = encodeURIComponent(accountDto.nickname);
    const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodedNickname}/${accountDto.tag}?api_key=${apiKey}`;

    try {
      const response = await firstValueFrom(
        this.httpService
          .get(url)
          .pipe(map((response: AxiosResponse) => response.data)),
      );
      return response.puuid;
    } catch (error) {
      if (error.response && error.response.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('일치하는 소환사 없음', HttpStatus.NOT_FOUND);
      }
    }
  }

  async getSummoner(puuid) {
    const apiKey = process.env.RIOT_API_KEY;

    const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`;

    return this.httpService
      .get(url)
      .pipe(map((response: AxiosResponse) => response.data));
  }
}
