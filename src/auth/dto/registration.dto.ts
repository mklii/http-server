import { IsInt, IsString, Matches, Max, Min } from 'class-validator';

export class RegistrationDto {
  @IsString()
  @Matches(/^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, {
    message:
      'Username must be minimum 8 and maximum 20 characters, allow upper letter and number',
  })
  username: string;

  @IsString()
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Email not valid' })
  email: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must be minimum 8 characters, at least one letter and one number',
  })
  password: string;

  @IsInt()
  @Min(2)
  @Max(3)
  role: number;
}
