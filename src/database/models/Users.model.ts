import {
  AutoIncrement,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { IUsers, IUsersCreation } from './interfaces/IUsers';
import { Requests } from './Requests.model';
import { Roles } from './Roles.model';
import { Teams } from './Teams.model';

@Table
export class Users extends Model<IUsers, IUsersCreation> {
  @AutoIncrement
  @Unique
  @PrimaryKey
  @ForeignKey(() => Requests)
  @Column
  userID: number;

  @Unique
  @Column
  username: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Default(3)
  @ForeignKey(() => Roles)
  @Column
  roleID: number;

  @Default(2)
  @ForeignKey(() => Teams)
  @Column
  teamID: number;

  @Column
  avatarImage: string;

  @HasMany(() => Requests)
  requests: Requests[];

  @BelongsTo(() => Roles)
  role: Roles;

  @BelongsTo(() => Teams)
  team: Teams;
}
