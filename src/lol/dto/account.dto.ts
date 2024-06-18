import { Length } from 'class-validator';

export class AccountDto {
  @Length(3, 16)
  nickname: string;

  @Length(3, 5)
  tag: string;
}
