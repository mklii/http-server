'use strict';

const bcrypt = require('bcrypt');
const adminPass = 'Admin_password1';
const hashAdminPass = bcrypt.hashSync(adminPass, 10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'Admin',
        email: 'admin@admin.com',
        password: hashAdminPass,
        roleID: 1,
        teamID: 1,
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
