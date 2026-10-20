'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('osmosis_types', null, {});

    await queryInterface.bulkInsert('osmosis_types', [
      {
        id: 1, // Forçamos o ID 1
        name: 'Osmose Inversa Standard (RO)',
        description: 'Sistema principal de purificação de água por osmose inversa a frio.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2, // Forçamos o ID 2
        name: 'Osmose Inversa Térmica (ROT)',
        description: 'Sistema de osmose inversa com ciclo de desinfeção térmica automatizado.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3, // Forçamos o ID 3
        name: 'Unidade de Segurança',
        description: 'Módulo de proteção e ultrafiltração (ex: Nephro Safe).',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('osmosis_types', null, {});
  }
};