import { Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { connect } from 'mongoose';
import { atlasUrl, logModel } from '../database/mongo.database';

@Injectable()
export class LogCreateMiddleware implements NestMiddleware {
  async use(@Req() req, @Res() res, @Next() next: () => void): Promise<void> {
    await connect(`${atlasUrl}`);
    const doc = new logModel({
      timestamp: new Date(),
      url: req.originalUrl,
      method: req.method,
      body: req.body,
    });
    console.log(req);
    await doc.save();
    return next();
  }
}
