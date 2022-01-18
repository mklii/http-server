import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  Next,
  Req,
  Res,
} from '@nestjs/common';
import { Users } from '../database/models/Users.model';

@Injectable()
export class AccessCheckMiddleware implements NestMiddleware {
  async use(@Req() req, @Res() res, @Next() next: () => void): Promise<void> {
    const userInformation = await Users.findOne({
      where: { email: req.user.email },
    });
    if (!(userInformation.roleID === 1)) {
      throw new BadRequestException('Access Error');
    }
    return next();
  }
}

@Injectable()
export class AccessManagerCheckMiddleware implements NestMiddleware {
  async use(@Req() req, @Res() res, @Next() next: () => void): Promise<void> {
    const userInformation = await Users.findOne({
      where: { email: req.user.email },
    });
    if (!(userInformation.roleID === 1 || userInformation.roleID === 1)) {
      throw new BadRequestException('Access Error');
    }
    return next();
  }
}
