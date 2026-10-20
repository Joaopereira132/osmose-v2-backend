'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Limpamos a tabela para garantir que o "Unique" não bloqueia o seeder
    await queryInterface.bulkDelete('hospitals', null, {});

    // 2. Inserimos dados frescos
    await queryInterface.bulkInsert('hospitals', [
      {
        id: 1,
        name: 'Hospital de São João',
        address: 'Alameda Prof. Hernâni Monteiro, Porto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Hospital de São Sebastião',
        address: 'Rua Dr. Cândido de Pinho, Santa Maria da Feira',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Hospital de Braga',
        address: 'Sete Fontes, São Victor, Braga',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('hospitals', null, {});
  }
};