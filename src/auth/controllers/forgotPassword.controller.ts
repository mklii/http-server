import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import {
  ForgotPasswordDto,
  resetPasswordBodyDto,
  resetPasswordQueryDto,
} from '../dto/forgotPassword.dto';
import {
  ForgotPasswordService,
  ResetPasswordService,
} from '../services/forgotPassword.service';
import { IMessage } from '../interfaces/message.interface';

@Controller('forgot')
export class ForgotPasswordController {
  constructor(
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly resetPasswordService: ResetPasswordService,
  ) {}

  @Get()
  async forgotPassword(@Query() query: ForgotPasswordDto): Promise<IMessage> {
    return this.forgotPasswordService.forgot(query.email);
  }

  @Patch()
  async resetPassword(
    @Query() query: resetPasswordQueryDto,
    @Body() body: resetPasswordBodyDto,
  ): Promise<IMessage> {
    return this.resetPasswordService.reset(
      query.email,
      query.token,
      body.newpass,
    );
  }
}
