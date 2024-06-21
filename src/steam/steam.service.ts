import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { stringify } from 'querystring';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class SteamService {
  constructor(private readonly httpService: HttpService) {}

  async getPlayerSummaries(id: string) {
    const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${id}`;
    return await firstValueFrom(
      this.httpService
        .get(url)
        .pipe(map((response: AxiosResponse) => response.data)),
    );
  }

  async getOwnedGames(id: string) {
    const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${id}&format=json`;
    return await firstValueFrom(
      this.httpService
        .get(url)
        .pipe(map((response: AxiosResponse) => response.data)),
    );
  }

  async login() {
    const url = `https://steamcommunity.com/openid/id`;
    const response = await firstValueFrom(
      this.httpService
        .get(url)
        .pipe(map((response: AxiosResponse) => response.data)),
    );
  }
}
