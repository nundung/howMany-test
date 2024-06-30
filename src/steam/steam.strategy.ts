import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';
import { SteamService } from './steam.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor(private steamService: SteamService) {
    super({
      returnURL: 'http://localhost:3000/steam/return',
      realm: 'http://localhost:3000/',
      apiKey: process.env.STEAM_API_KEY,
    });
  }

  async validate(identifier: string, profile: any, done: Function) {
    const user = await this.steamService.validateUser(profile);
    done(null, user);
  }
}
