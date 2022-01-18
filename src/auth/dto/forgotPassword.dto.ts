import { IsString, Matches } from 'class-validator';

export class ForgotPasswordDto {
  @IsString()
  email: string;
}

export class resetPasswordBodyDto {
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must be minimum 8 characters, at least one letter and one number',
  })
  newpass: string;
}

export class resetPasswordQueryDto {
  @IsString()
  email: string;

  @IsString()
  token: string;
}
