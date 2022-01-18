import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST as string,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
  },
  test: {
    dialect: 'postgres',
    host: process.env.DB_HOST as string,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
  },
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST as string,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
  },
};
