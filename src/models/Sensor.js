const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'sensors',
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
          notNull: { msg: 'Sensor name is required.' },
          notEmpty: { msg: 'Sensor name cannot be empty.' },
          len: { args: [2, 100], msg: 'Sensor name must be between 2 and 100 characters.' }
        }
      },

      measurement_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'measurement_units', key: 'id' },
        validate: {
          notNull: { msg: 'Measurement unit (ID) is required.' }
        }
      },

      min_safe_value: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: { msg: 'Minimum safe value must be a number.' }
        }
      },
      max_safe_value: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: { msg: 'Maximum safe value must be a number.' }
        }
      },
      osmosis_units_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'osmosis_units', key: 'id' },
        validate: {
          notNull: { msg: 'The sensor must be associated with an Osmosis Unit.' }
        }
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'brands', key: 'id' },
        validate: {
          notNull: { msg: 'The sensor must be associated with a Brand.' }
        }
      }
    },
    {
      sequelize,
      tableName: 'sensors',
      timestamps: true,
      validate: {
        checkMinMax() {
          if (this.min_safe_value !== null && this.max_safe_value !== null) {
            if (parseFloat(this.min_safe_value) > parseFloat(this.max_safe_value)) {
              throw new Error('Inconsistency: Minimum safe value cannot be greater than the maximum safe value.');
            }
          }
        }
      },
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }]
        },
        {
          name: 'sensor_unico_por_unidade',
          unique: true,
          fields: ['name', 'osmosis_units_id']
        }
      ]
    }
  );
};
