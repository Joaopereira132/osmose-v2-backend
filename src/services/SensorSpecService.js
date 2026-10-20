const SensorSpecService = {
  async getAll(models) {
    return await models.sensor_specifications.findAll();
  },

  async getById(id, models) {
    return await models.sensor_specifications.findByPk(id);
  },

  async create(data, models) {
    return await models.sensor_specifications.create(data);
  },

  async update(id, data, models) {
    return await models.sensor_specifications.update(data, { where: { id } });
  },

  async delete(id, models) {
    return await models.sensor_specifications.destroy({ where: { id } });
  }
};

module.exports = SensorSpecService;
