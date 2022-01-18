import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { LoginService } from '../services/login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(
    @Res({ passthrough: true }) res,
    @Body() loginDto: LoginDto,
  ): Promise<{ message: string; token: string }> {
    const token: string = await this.loginService.login(
      loginDto.email,
      loginDto.password,
    );
    await res.cookie('access-token', token, {
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });
    return { message: `User login`, token: token };
  }
}
