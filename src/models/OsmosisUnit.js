const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'osmosis_units',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: { msg: 'Unit name is required.' },
          notEmpty: { msg: 'Name cannot be empty.' }
        }
      },
      serial_number: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true
      },
      status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'Under maintenance'),
        allowNull: false,
        defaultValue: 'Active'
      },
      hospitals_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'hospitals', key: 'id' }
      },
      osmosis_types_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'osmosis_types', key: 'id' }
      }
    },
    {
      sequelize,
      tableName: 'osmosis_units',
      timestamps: true
    }
  );
};
