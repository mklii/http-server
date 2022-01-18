import { IsString, Matches } from 'class-validator';

export class ChangeProfileNameDto {
  @IsString()
  @Matches(/^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, {
    message:
      'Username must be minimum 8 and maximum 20 characters, allow upper letter and number',
  })
  name: string;
}

export class ChangeProfilePasswordDto {
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must be minimum 8 characters, at least one letter and one number',
  })
  password: string;
}
