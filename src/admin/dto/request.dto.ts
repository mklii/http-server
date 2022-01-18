import { IsInt, IsString } from 'class-validator';

export class RequestDto {
  @IsInt()
  requestid: number;

  @IsString()
  status: string;
}
