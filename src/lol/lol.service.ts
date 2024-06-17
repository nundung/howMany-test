import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { parse } from 'path';
import { Observable, Subscriber, map } from 'rxjs';
import { GetUserDto } from './dto/getUser.dto';

@Injectable()
export class LolService {
  constructor(private readonly httpService: HttpService) {}

  async getUserPuuId(
    getUserDto: GetUserDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    const apiKey = process.env.RIOT_API_KEY;
    const encodedNickname = encodeURIComponent(getUserDto.nickname);

    const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodedNickname}/${getUserDto.tag}?api_key=${apiKey}`;

    return this.httpService
      .get(url)
      .pipe(map((response: AxiosResponse) => response.data));
  }
}
