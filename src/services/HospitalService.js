const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

class HospitalService {
  async getAll(models) {
    return await models.hospitals.findAll();
  }

  async getById(id, models) {
    return await models.hospitals.findByPk(id);
  }

  async checkIfExists(name, excludeId = null, models) {
    const whereCondition = { name: name };

    if (excludeId) {
      whereCondition.id = { [Sequelize.Op.ne]: excludeId };
    }

    const hospital = await models.hospitals.findOne({ where: whereCondition });
    if (hospital) {
      throw new Error(`The hospital '${name}' is already registered.`);
    }
  }

  async create(data, models) {
    await this.checkIfExists(data.name, null, models);
    return await models.hospitals.create(data);
  }

  async update(id, data, models) {
    await this.checkIfExists(data.name, id, models);
    await models.hospitals.update(data, { where: { id } });
    return await models.hospitals.findByPk(id);
  }

  async delete(id, models) {
    logger.info({ hospitalId: id }, 'Starting hospital removal verification');

    const unitsCount = await models.osmosis_units.count({
      where: { hospitals_id: id }
    });

    logger.info({ hospitalId: id, foundUnits: unitsCount }, 'Osmosis units validation completed');

    if (unitsCount > 0) {
      logger.warn({ hospitalId: id, unitsCount }, 'Removal blocked: Hospital has active osmosis units');
      throw new Error(`Cannot delete hospital. There are ${unitsCount} osmosis units associated with it.`);
    }

    logger.info({ hospitalId: id }, 'Removal authorized. Deleting hospital record');
    return await models.hospitals.destroy({ where: { id } });
  }
}

module.exports = new HospitalService();
