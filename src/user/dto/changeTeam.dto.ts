import { IsInt, Max, Min } from 'class-validator';

export class ChangeTeamDto {
  @IsInt()
  @Min(3)
  @Max(4)
  teamid: number;
}
