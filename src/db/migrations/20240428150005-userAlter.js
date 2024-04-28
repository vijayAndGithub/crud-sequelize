'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('inside add column')
    await queryInterface.addColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    }, {
      after: 'email' // after option is only supported by MySQL
    });
  },

  async down(queryInterface, Sequelize) {
    console.log('inside remove column')
    await queryInterface.removeColumn('users', 'password')
  }
};
