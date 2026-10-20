const { Sequelize } = require('sequelize');

class MeasurementUnitService {
  // GET ALL
  async getAll(models) {
    return await models.measurement_units.findAll();
  }

  // GET SPECIFIC
  async getById(id, models) {
    return await models.measurement_units.findByPk(id);
  }

  // CREATE
  async create(data, models) {
    const exists = await models.measurement_units.findOne({ where: { name: data.name } });
    if (exists) throw new Error('This measurement unit already exists.');
    return await models.measurement_units.create(data);
  }

  // UPDATE
  async update(id, data, models) {
    if (data.name) {
      const exists = await models.measurement_units.findOne({
        where: {
          name: data.name,
          id: { [Sequelize.Op.ne]: id }
        }
      });
      if (exists) throw new Error('Another unit with this name already exists.');
    }
    return await models.measurement_units.update(data, { where: { id } });
  }

  // DELETE
  async delete(id, models) {
    return await models.measurement_units.destroy({ where: { id } });
  }
}

module.exports = new MeasurementUnitService();
