'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sensor_specifications', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      sensors_id: {
        type: Sequelize.INTEGER,
        references: { model: 'sensors', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      specifications_id: {
        type: Sequelize.INTEGER,
        references: { model: 'specifications', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) { await queryInterface.dropTable('sensor_specifications'); }
};