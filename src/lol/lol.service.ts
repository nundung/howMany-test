import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class LolService {
  constructor(private readonly httpService: HttpService) {}

  async getUser(nickname: string): Promise<Observable<AxiosResponse<any>>> {
    const api_key = process.env.RIOT_API_KEY;
    const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${api_key}`;

    const userInfo = await this.httpService.get(url);
    console.log(userInfo);
    return userInfo;
  }
}
