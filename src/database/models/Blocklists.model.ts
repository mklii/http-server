import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { IBlocklist, IBlocklistCreation } from './interfaces/IBlocklist';

@Table
export class Blocklists extends Model<IBlocklist, IBlocklistCreation> {
  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column
  blocklistID: number;

  @Column
  status: string;

  @Column
  userID: number;

  @Column
  reason: string;
}
