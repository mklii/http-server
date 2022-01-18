import { IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Email not valid' })
  email: string;

  @IsString()
  password: string;
}
