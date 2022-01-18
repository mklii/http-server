import { Optional } from 'sequelize';

export interface ITeams {
  teamID: number;
  teamUser: number[];
  teamName: string;
}

export interface ITeamsCreation extends Optional<ITeams, 'teamID'> {}
