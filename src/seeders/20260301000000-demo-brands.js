'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brands', null, {});
    await queryInterface.bulkInsert('brands', [
      {
        id: 1, 
        name: 'Siemens', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 2, 
        name: 'Bosch', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brands', null, {});
  }
};