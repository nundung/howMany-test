import { IsNotEmpty } from 'class-validator';

export class AccountDto {
  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  tag: string;
}
