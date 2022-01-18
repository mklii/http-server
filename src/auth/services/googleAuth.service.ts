import { Injectable } from '@nestjs/common';
import {
  googleClientID,
  googleClientSecret,
  secret,
} from '../../config/auth.config';
import { google } from 'googleapis';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { DatabaseQueryService } from '../../database/query/databaseQuery.service';
import { Users } from '../../database/models/Users.model';

@Injectable()
export class GoogleAuthService {
  async googleLink(): Promise<{ link: string }> {
    const oauth2Client = new google.auth.OAuth2(
      googleClientID,
      googleClientSecret,
      process.env.REDIRECT_URL as string,
    );
    const scopes: Array<string> = [
      process.env.SCOPES_PROFILE as string,
      process.env.SCOPES_EMAIL,
    ];
    const generateAuthUrl = (): string => {
      return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
      });
    };
    return { link: generateAuthUrl() };
  }
}

@Injectable()
export class GoogleAuthCallbackService {
  constructor(private query: DatabaseQueryService) {}

  async googleCallback(code: string): Promise<{ token: string; user: Users }> {
    const oauth2Client = new google.auth.OAuth2(
      googleClientID,
      googleClientSecret,
      process.env.REDIRECT_URL as string,
    );
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });

    const { data } = await oauth2.userinfo.get();

    let user: Users = await this.query.userInfo(null, data.email, null);
    if (!user) {
      user = await this.query.userCreate(
        data.name as string,
        data.email as string,
        bcrypt.hashSync('password', 10),
        2,
      );
    }

    let userData: Users = await this.query.userInfo(null, data.email, null);
    const accessToken: string = sign(
      { email: user.email, id: user.userID },
      secret,
    );
    return { token: accessToken, user: userData };
  }
}
