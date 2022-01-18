import { Sequelize } from 'sequelize-typescript';
import { Blocklists } from './models/Blocklists.model';
import { Requests } from './models/Requests.model';
import { Roles } from './models/Roles.model';
import { Users } from './models/Users.model';
import { Teams } from './models/Teams.model';

export const DatabaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST as string,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER as string,
        password: process.env.POSTGRES_PASSWORD as string,
        database: process.env.POSTGRES_DB as string,
      });
      sequelize.addModels([Blocklists, Requests, Roles, Users, Teams]);
      await sequelize.sync();
      await sequelize
        .authenticate()
        .then(function (err) {
          console.log('Connection has been established successfully.');
        })
        .catch(function (err) {
          console.log('Unable to connect to the database:', err);
        });
      return sequelize;
    },
  },
];
