'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sensor_specifications', [
      { sensors_id: 1, specifications_id: 1, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sensor_specifications', null, {});
  }
};