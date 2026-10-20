module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'measurement_units',
    {
      id: { autoIncrement: true, type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      name: { type: DataTypes.STRING(45), allowNull: false, unique: true },
      symbol: { type: DataTypes.STRING(10), allowNull: false }
    },
    { sequelize, tableName: 'measurement_units', timestamps: true }
  );
};
