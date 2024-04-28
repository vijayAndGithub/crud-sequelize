'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint('users', {
      fields: [ 'email' ],
      type: 'unique',
      name: 'uniqueEmail',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'uniqueEmail')
  }
};
