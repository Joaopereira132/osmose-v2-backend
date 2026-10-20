'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sensors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      measurement_unit: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      min_safe_value: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      max_safe_value: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      osmosis_units_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'osmosis_units', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sensors');
  }
};