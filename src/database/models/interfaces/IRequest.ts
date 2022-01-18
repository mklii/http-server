import { Optional } from 'sequelize';

export interface IRequest {
  requestID: number;
  userID: number;
  value: string;
  requestType: string;
}

export interface IRequestCreation extends Optional<IRequest, 'requestID'> {}
