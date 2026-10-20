'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('specifications', [
      { description: 'Proteção IP67', createdAt: new Date(), updatedAt: new Date() },
      { description: 'Protocolo Modbus', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('specifications', null, {});
  }
};