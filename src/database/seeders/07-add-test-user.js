'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'user1',
        email: 'user1@mail.com',
        password: bcrypt.hashSync('user1', 10),
        roleID: 3,
        teamID: 2,
        avatarImage: 'Empty',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user2',
        email: 'user2@mail.com',
        password: bcrypt.hashSync('user2', 10),
        roleID: 3,
        teamID: 2,
        avatarImage: 'Empty',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user3',
        email: 'user3@mail.com',
        password: bcrypt.hashSync('USERuser3', 10),
        roleID: 3,
        teamID: 3,
        avatarImage: 'Empty',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user4',
        email: 'user4@mail.com',
        password: bcrypt.hashSync('user4', 10),
        roleID: 3,
        teamID: 3,
        avatarImage: 'Empty',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user5',
        email: 'user5@mail.com',
        password: bcrypt.hashSync('user5', 10),
        roleID: 3,
        teamID: 4,
        avatarImage: 'Empty',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user6',
        email: 'user6@mail.com',
        password: bcrypt.hashSync('user6', 10),
        roleID: 3,
        teamID: 4,
        avatarImage: 'Empty',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user7',
        email: 'user7@mail.com',
        password: bcrypt.hashSync('user7', 10),
        roleID: 2,
        teamID: 1,
        avatarImage: 'Empty',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user8',
        email: 'user8@mail.com',
        password: bcrypt.hashSync('user8', 10),
        roleID: 2,
        teamID: 1,
        avatarImage: 'Empty',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user9',
        email: 'user9@mail.com',
        password: bcrypt.hashSync('user9', 10),
        roleID: 3,
        teamID: 3,
        avatarImage: 'Empty',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user10',
        email: 'user10@mail.com',
        password: bcrypt.hashSync('user10', 10),
        roleID: 3,
        teamID: 4,
        avatarImage: 'Empty',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
