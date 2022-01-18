import { IsInt, IsString } from 'class-validator';

export class StatusDto {
  @IsInt()
  id: number;

  @IsString()
  status: string;

  @IsString()
  reason: string;
}
