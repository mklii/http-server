import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  Next,
  Req,
  Res,
} from '@nestjs/common';
import { Blocklists } from '../database/models/Blocklists.model';
import { Op } from 'sequelize';

@Injectable()
export class BanCheckMiddleware implements NestMiddleware {
  async use(@Req() req, @Res() res, @Next() next: () => void): Promise<void> {
    if (
      await Blocklists.findOne({
        where: { [Op.and]: [{ userID: req.user.id }, { status: 'Banned!' }] },
      })
    ) {
      throw new BadRequestException('banned');
    }
    return next();
  }
}
