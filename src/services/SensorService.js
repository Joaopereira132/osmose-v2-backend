const { Sequelize } = require('sequelize');

class SensorService {
  async validateForeignKeys(data, models) {
    if (data.brand_id) {
      const brandExists = await models.brands.findByPk(data.brand_id);
      if (!brandExists) throw new Error('The selected brand does not exist.');
    }
    if (data.osmosis_units_id) {
      const unitExists = await models.osmosis_units.findByPk(data.osmosis_units_id);
      if (!unitExists) throw new Error('The Osmosis Unit does not exist.');
    }
    if (data.measurement_unit_id) {
      const muExists = await models.measurement_units.findByPk(data.measurement_unit_id);
      if (!muExists) throw new Error('The selected Measurement Unit does not exist.');
    }
  }

  async checkIfExists(name, osmosis_units_id, excludeId = null, models) {
    const whereCondition = { name: name, osmosis_units_id: osmosis_units_id };
    if (excludeId) whereCondition.id = { [Sequelize.Op.ne]: excludeId };
    const sensor = await models.sensors.findOne({ where: whereCondition });
    if (sensor) throw new Error(`The sensor '${name}' already exists in this unit.`);
  }

  // LIST ALL WITH RELATIONS
  async getAll(models) {
    return await models.sensors.findAll({
      include: [
        { model: models.brands, as: 'brand' },
        { model: models.measurement_units, as: 'measurement_unit' },
        { model: models.sensor_specifications, as: 'sensor_specifications' }
      ]
    });
  }

  // GET SPECIFIC WITH RELATIONS
  async getById(id, models) {
    return await models.sensors.findByPk(id, {
      include: [
        { model: models.brands, as: 'brand' },
        { model: models.measurement_units, as: 'measurement_unit' },
        {
          model: models.sensor_specifications,
          as: 'sensor_specifications',
          include: [{ model: models.specifications, as: 'specification' }]
        }
      ]
    });
  }

  async create(data, models) {
    try {
      if (data.min_safe_value >= data.max_safe_value) {
        throw new Error('The minimum safe value must be less than the maximum.');
      }
      await this.validateForeignKeys(data, models);
      await this.checkIfExists(data.name, data.osmosis_units_id, null, models);

      const sensor = await models.sensors.create({
        name: data.name,
        min_safe_value: data.min_safe_value,
        max_safe_value: data.max_safe_value,
        osmosis_units_id: data.osmosis_units_id,
        brand_id: data.brand_id,
        measurement_unit_id: data.measurement_unit_id
      });

      if (data.specs && Array.isArray(data.specs)) {
        const specsToSave = data.specs.map((s) => ({
          sensors_id: sensor.id,
          specifications_id: s.id,
          value: s.value
        }));
        await models.sensor_specifications.bulkCreate(specsToSave);
      }

      return await this.getById(sensor.id, models);
    } catch (error) {
      throw error;
    }
  }

  async update(id, data, models) {
    if (data.min_safe_value && data.max_safe_value && data.min_safe_value >= data.max_safe_value) {
      throw new Error('The minimum safe value must be less than the maximum.');
    }
    await this.validateForeignKeys(data, models);
    await models.sensors.update(data, { where: { id } });
    return await this.getById(id, models);
  }

  async delete(id, models) {
    return await models.sensors.destroy({ where: { id } });
  }
}

module.exports = new SensorService();
