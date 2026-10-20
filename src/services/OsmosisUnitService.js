const { Sequelize } = require('sequelize');

class OsmosisUnitService {
  async getAll(models) {
    return await models.osmosis_units.findAll();
  }

  async getById(id, models) {
    return await models.osmosis_units.findByPk(id);
  }

  async validateRelations(data, models) {
    if (data.hospitals_id) {
      const hospital = await models.hospitals.findByPk(data.hospitals_id);
      if (!hospital) {
        throw new Error(`Operation cancelled: Hospital with ID ${data.hospitals_id} does not exist.`);
      }
    }
    if (data.osmosis_types_id) {
      const type = await models.osmosis_types.findByPk(data.osmosis_types_id);
      if (!type) {
        throw new Error(`Operation cancelled: Osmosis type with ID ${data.osmosis_types_id} does not exist.`);
      }
    }
  }

  async validateStatus(status) {
    if (status) {
      const allowedStatuses = ['Active', 'Inactive', 'Under maintenance'];
      if (!allowedStatuses.includes(status)) {
        throw new Error(`Invalid status! Use only: ${allowedStatuses.join(', ')}`);
      }
    }
  }

  async checkIfExists(data, excludeId = null, models) {
    const { Op } = Sequelize;

    if (!excludeId && !data.serial_number) {
      throw new Error('Serial number is required to register a new unit.');
    }

    const whereCondition = { [Op.or]: [] };

    if (data.name) whereCondition[Op.or].push({ name: data.name });
    if (data.serial_number) whereCondition[Op.or].push({ serial_number: data.serial_number });

    if (whereCondition[Op.or].length === 0) return;

    if (excludeId) {
      whereCondition.id = { [Op.ne]: excludeId };
    }

    const unit = await models.osmosis_units.findOne({ where: whereCondition });

    if (unit) {
      if (data.name && unit.name === data.name) {
        throw new Error(`Conflict: A unit with the name '${data.name}' already exists.`);
      }
      if (data.serial_number && unit.serial_number === data.serial_number) {
        throw new Error(`Conflict: The serial number '${data.serial_number}' is already registered.`);
      }
    }
  }

  async create(data, models) {
    await this.validateRelations(data, models);
    await this.validateStatus(data.status);
    await this.checkIfExists(data, null, models);
    return await models.osmosis_units.create(data);
  }

  async update(id, data, models) {
    await this.validateRelations(data, models);
    await this.validateStatus(data.status);
    await this.checkIfExists(data, id, models);

    const [updatedRows] = await models.osmosis_units.update(data, { where: { id } });

    if (updatedRows === 0) {
      const unit = await models.osmosis_units.findByPk(id);
      if (!unit) throw new Error('Error: Osmosis Unit not found.');
    }

    return await models.osmosis_units.findByPk(id);
  }

  async delete(id, models) {
    return await models.osmosis_units.destroy({ where: { id } });
  }
}

module.exports = new OsmosisUnitService();
