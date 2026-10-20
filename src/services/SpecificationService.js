const { Sequelize } = require('sequelize');

class SpecificationService {
  async getAll(models) {
    return await models.specifications.findAll();
  }

  async getById(id, models) {
    return await models.specifications.findByPk(id);
  }

  async delete(id, models) {
    return await models.specifications.destroy({ where: { id } });
  }

  async checkIfExists(description, excludeId = null, models) {
    const whereCondition = { description: description };

    if (excludeId) {
      whereCondition.id = { [Sequelize.Op.ne]: excludeId };
    }

    const spec = await models.specifications.findOne({ where: whereCondition });
    if (spec) {
      throw new Error(`The specification '${description}' already exists in the catalog.`);
    }
  }

  async create(data, models) {
    await this.checkIfExists(data.description, null, models);
    return await models.specifications.create(data);
  }

  async update(id, data, models) {
    if (data.description) {
      await this.checkIfExists(data.description, id, models);
    }
    return await models.specifications.update(data, { where: { id } });
  }
}

module.exports = new SpecificationService();
