var DataTypes = require('sequelize').DataTypes;
var _hospitals = require('./Hospital');
var _SequelizeMeta = require('./SequelizeMeta');
var _brands = require('./Brand');
var _osmosis_types = require('./OsmosisType');
var _osmosis_units = require('./OsmosisUnit');
var _sensor_specifications = require('./SensorSpecification');
var _sensors = require('./Sensor');
var _specifications = require('./Specification');
var _measurement_units = require('./MeasurementUnits');
var _users = require('./Users');

function initModels(sequelize) {
  var hospitals = _hospitals(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var brands = _brands(sequelize, DataTypes);
  var osmosis_types = _osmosis_types(sequelize, DataTypes);
  var osmosis_units = _osmosis_units(sequelize, DataTypes);
  var sensor_specifications = _sensor_specifications(sequelize, DataTypes);
  var sensors = _sensors(sequelize, DataTypes);
  var specifications = _specifications(sequelize, DataTypes);
  var measurement_units = _measurement_units(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  osmosis_units.belongsTo(hospitals, { as: 'hospital', foreignKey: 'hospitals_id' });
  hospitals.hasMany(osmosis_units, { as: 'osmosis_units', foreignKey: 'hospitals_id' });

  sensors.belongsTo(brands, { as: 'brand', foreignKey: 'brand_id' });
  brands.hasMany(sensors, { as: 'sensors', foreignKey: 'brand_id' });

  osmosis_units.belongsTo(osmosis_types, { as: 'osmosis_type', foreignKey: 'osmosis_types_id' });
  osmosis_types.hasMany(osmosis_units, { as: 'osmosis_units', foreignKey: 'osmosis_types_id' });

  sensors.belongsTo(osmosis_units, { as: 'osmosis_unit', foreignKey: 'osmosis_units_id' });
  osmosis_units.hasMany(sensors, { as: 'sensors', foreignKey: 'osmosis_units_id' });

  sensor_specifications.belongsTo(sensors, { as: 'sensor', foreignKey: 'sensors_id' });
  sensors.hasMany(sensor_specifications, { as: 'sensor_specifications', foreignKey: 'sensors_id' });

  sensor_specifications.belongsTo(specifications, { as: 'specification', foreignKey: 'specifications_id' });
  specifications.hasMany(sensor_specifications, { as: 'sensor_specifications', foreignKey: 'specifications_id' });

  sensors.belongsTo(measurement_units, { as: 'measurement_unit', foreignKey: 'measurement_unit_id' });
  measurement_units.hasMany(sensors, { as: 'sensors', foreignKey: 'measurement_unit_id' });

  return {
    hospitals,
    SequelizeMeta,
    brands,
    osmosis_types,
    osmosis_units,
    sensor_specifications,
    sensors,
    specifications,
    measurement_units,
    users
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
