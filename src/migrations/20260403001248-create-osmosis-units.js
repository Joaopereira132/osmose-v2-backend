'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('osmosis_units', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      serial_number: { type: Sequelize.STRING(100), allowNull: true },
      status: { type: Sequelize.STRING(45), allowNull: true },
      osmosis_types_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'osmosis_types', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      hospitals_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'hospitals', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) { await queryInterface.dropTable('osmosis_units'); }
};