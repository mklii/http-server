import { Optional } from 'sequelize';

export interface IUsers {
  userID: number;
  username: string;
  email: string;
  password: string;
  roleID: number;
  teamID: number;
  avatarImage: string;
}

export interface IUsersCreation extends Optional<IUsers, 'userID'> {}
