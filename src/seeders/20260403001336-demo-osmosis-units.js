'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('osmosis_units', null, {});

    await queryInterface.bulkInsert('osmosis_units', [
      {
        id: 1,
        name: 'RO 1 - Piso 0',
        hospitals_id: 1,      // Aponta para o Hospital ID 1
        osmosis_types_id: 1,  // Aponta para o Tipo Standard (ID 1)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'ROT 3 - Piso 1',
        hospitals_id: 1,      // Aponta para o Hospital ID 1
        osmosis_types_id: 2,  // Aponta para o Tipo Térmica (ID 2)
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('osmosis_units', null, {});
  }
};