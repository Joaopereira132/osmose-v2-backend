'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    // Limpamos para evitar duplicados
    await queryInterface.bulkDelete('sensors', null, {});

    await queryInterface.bulkInsert('sensors', [
      {
        name: 'Pressão de Entrada (P1)',
        measurement_unit: 'bar',
        min_safe_value: 1.5,
        max_safe_value: 4.0,
        osmosis_units_id: 1, // Existe! (RO 1)
        brand_id: 1,         // Siemens
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Condutividade Permeada',
        measurement_unit: 'µS/cm',
        min_safe_value: 0.0,
        max_safe_value: 15.0,
        osmosis_units_id: 1, // Existe! (RO 1)
        brand_id: 2,         // Bosch
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Temperatura de Desinfeção',
        measurement_unit: '°C',
        min_safe_value: 80.0,
        max_safe_value: 95.0,
        osmosis_units_id: 2, // <--- MUDEI DE 3 PARA 2 (ROT 3)
        brand_id: 1,         // Siemens
        createdAt: new Date(), updatedAt: new Date()
      }
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sensors', null, {});
  }
};