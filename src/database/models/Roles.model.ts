import {
  AutoIncrement,
  Column,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { IRoles, IRolesCreation } from './interfaces/IRoles';
import { Users } from './Users.model';

@Table
export class Roles extends Model<IRoles, IRolesCreation> {
  @AutoIncrement
  @Unique
  @PrimaryKey
  @ForeignKey(() => Users)
  @Column
  roleID: number;

  @Column
  name: string;

  @HasOne(() => Users)
  user: Users;
}
