const { Sequelize } = require('sequelize');

class BrandService {
  async getAll(models) {
    return await models.brands.findAll();
  }

  async getById(id, models) {
    return await models.brands.findByPk(id);
  }

  async checkIfExists(name, excludeId = null, models) {
    const whereCondition = { name: name };
    if (excludeId) {
      whereCondition.id = { [Sequelize.Op.ne]: excludeId };
    }

    const brand = await models.brands.findOne({ where: whereCondition });
    if (brand) {
      throw new Error(`The brand '${name}' already exists in the system.`);
    }
  }

  async create(data, models) {
    await this.checkIfExists(data.name, null, models);
    return await models.brands.create(data);
  }

  async update(id, data, models) {
    await this.checkIfExists(data.name, id, models);
    await models.brands.update(data, { where: { id } });
    return await models.brands.findByPk(id);
  }

  async delete(id, models) {
    const sensorsCount = await models.sensors.count({
      where: { brands_id: id }
    });

    if (sensorsCount > 0) {
      throw new Error(`Cannot delete this brand. There are ${sensorsCount} sensors depending on it.`);
    }
    return await models.brands.destroy({ where: { id } });
  }
}

module.exports = new BrandService();
