const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'hospitals',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'Hospital name is required.' },
          notEmpty: { msg: 'Hospital name cannot be empty.' },
          len: { args: [3, 255], msg: 'Hospital name must be between 3 and 255 characters.' }
        }
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false,
        validate: {
          notNull: { msg: 'Hospital address is required.' },
          notEmpty: { msg: 'Hospital address cannot be empty.' },
          len: { args: [5, 255], msg: 'Address must be between 5 and 255 characters.' }
        }
      }
    },
    {
      sequelize,
      tableName: 'hospitals',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }]
        }
      ]
    }
  );
};
