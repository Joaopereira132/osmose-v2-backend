const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'brands',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'Brand name is required.' },
          notEmpty: { msg: 'Brand name cannot be empty.' },
          len: { args: [2, 45], msg: 'Brand name must be between 2 and 45 characters.' }
        }
      }
    },
    {
      sequelize,
      tableName: 'brands',
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
