const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'sensor_specifications',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      sensors_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'sensors', key: 'id' },
        validate: {
          notNull: { msg: 'Sensor ID is required.' }
        }
      },
      specifications_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'specifications', key: 'id' },
        validate: {
          notNull: { msg: 'Specification ID is required.' }
        }
      },
      value: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: { msg: 'Value is required.' },
          notEmpty: { msg: 'Specification value cannot be empty.' }
        }
      }
    },
    {
      sequelize,
      tableName: 'sensor_specifications',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }]
        },
        {
          name: 'unique_sensor_spec',
          unique: true,
          fields: ['sensors_id', 'specifications_id']
        }
      ]
    }
  );
};
