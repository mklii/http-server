import { Optional } from 'sequelize';

export interface IBlocklist {
  blocklistID: number;
  status: string;
  userID: number;
  reason: string;
}
export interface IBlocklistCreation
  extends Optional<IBlocklist, 'blocklistID'> {}
