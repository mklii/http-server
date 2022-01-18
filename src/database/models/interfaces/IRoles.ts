import { Optional } from 'sequelize';

export interface IRoles {
  roleID: number;
  name: string;
}

export interface IRolesCreation extends Optional<IRoles, 'roleID'> {}
