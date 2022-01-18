import { Controller, Get, Query, Res } from '@nestjs/common';
import {
  GoogleAuthCallbackService,
  GoogleAuthService,
} from '../services/googleAuth.service';
import { Users } from '../../database/models/Users.model';

@Controller('google')
export class GoogleAuthController {
  constructor(
    private readonly googleAuthCallbackService: GoogleAuthCallbackService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Get()
  async google(): Promise<{ link: string }> {
    return await this.googleAuthService.googleLink();
  }

  @Get('callback')
  async googleCallback(
    @Res({ passthrough: true }) res,
    @Query('code') code: string,
  ): Promise<Users> {
    const { token, user }: { token: string; user: Users } =
      await this.googleAuthCallbackService.googleCallback(code);

    res.cookie('access-token', token, {
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });

    return user;
  }
}
