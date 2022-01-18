import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { IRequest, IRequestCreation } from './interfaces/IRequest';
import { Users } from './Users.model';

@Table
export class Requests extends Model<IRequest, IRequestCreation> {
  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column
  requestID: number;

  @ForeignKey(() => Users)
  @Column
  userID: number;

  @Column
  value: string;

  @Column
  requestType: string;

  @BelongsTo(() => Users)
  user: Users;
}
