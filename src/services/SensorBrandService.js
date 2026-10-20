const SensorBrandService = {
  async getAll(models) {
    return await models.sensor_brands.findAll();
  },

  async getById(id, models) {
    return await models.sensor_brands.findByPk(id);
  },

  async create(data, models) {
    return await models.sensor_brands.create(data);
  },

  async update(id, data, models) {
    const [updated] = await models.sensor_brands.update(data, { where: { id } });
    if (!updated) return null;
    return await models.sensor_brands.findByPk(id);
  },

  async delete(id, models) {
    return await models.sensor_brands.destroy({ where: { id } });
  }
};

module.exports = SensorBrandService;
