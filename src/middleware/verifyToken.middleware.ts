import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  Next,
  Req,
  Res,
} from '@nestjs/common';
import { decode, verify } from 'jsonwebtoken';
import { secret } from '../config/auth.config';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  use(@Req() req, @Res() res, @Next() next: () => void): void {
    if (!req.headers.cookie)
      throw new BadRequestException('User not Authenticated');

    const accessToken = req.headers.cookie.slice(13);
    const validToken = verify(accessToken, secret);

    req.user = decode(accessToken) as {
      id: number;
      email: string;
    };
    if (validToken) {
      res.set('access-token', accessToken);
      return next();
    }
  }
}
