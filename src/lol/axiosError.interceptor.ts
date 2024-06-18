import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

export const AxiosErrorInterceptor = axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('애러발생');
    if (error.response && error.response.status === 401) {
      throw new HttpException('일치하는 소환사 없음', HttpStatus.NOT_FOUND);
    } else if (error.response && error.response.status === 404) {
      throw new HttpException('일치하는 소환사 없음', HttpStatus.NOT_FOUND);
    } else if (error.response && error.response.status === 500) {
      throw new HttpException('서버 내부 에러', HttpStatus.NOT_FOUND);
    } else {
      throw new HttpException('서버 내부 에러', HttpStatus.NOT_FOUND);
    }
  },
);
