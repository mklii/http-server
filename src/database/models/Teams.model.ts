import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { ITeams, ITeamsCreation } from './interfaces/ITeams';
import { Users } from './Users.model';

@Table
export class Teams extends Model<ITeams, ITeamsCreation> {
  @AutoIncrement
  @Unique
  @PrimaryKey
  @ForeignKey(() => Users)
  @Column
  teamID: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  teamUser;

  @Unique
  @Column
  teamName: string;

  @HasMany(() => Users)
  users: Users[];
}
