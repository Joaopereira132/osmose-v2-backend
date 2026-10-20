const { Sequelize } = require('sequelize');

class OsmosisTypeService {
  // GET ALL
  async getAll(models) {
    return await models.osmosis_types.findAll();
  }

  // GET SPECIFIC
  async getById(id, models) {
    return await models.osmosis_types.findByPk(id);
  }

  // CREATE
  async create(data, models) {
    // Check if the name already exists before creating
    const exists = await models.osmosis_types.findOne({ where: { name: data.name } });
    if (exists) throw new Error('An osmosis type with this name already exists.');

    return await models.osmosis_types.create(data);
  }

  // UPDATE
  async update(id, data, models) {
    if (data.name) {
      const exists = await models.osmosis_types.findOne({
        where: {
          name: data.name,
          id: { [Sequelize.Op.ne]: id }
        }
      });
      if (exists) throw new Error('Another osmosis type with this name already exists.');
    }

    return await models.osmosis_types.update(data, { where: { id } });
  }

  // DELETE
  async delete(id, models) {
    return await models.osmosis_types.destroy({ where: { id } });
  }
}

module.exports = new OsmosisTypeService();
