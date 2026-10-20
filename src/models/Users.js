const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      password_updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      auth_token: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      auth_token_updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      refresh_token_updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'users',
      timestamps: true
    }
  );
};
