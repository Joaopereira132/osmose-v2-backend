const UserService = {
  async listAll(models) {
    return await models.users.findAll({
      where: { active: true },
      attributes: { exclude: ['password', 'auth_token', 'refresh_token'] }
    });
  },
  async getById(id, models) {
    const user = await models.users.findByPk(id, {
      attributes: { exclude: ['password', 'auth_token', 'refresh_token'] }
    });
    if (!user || !user.active) return null;
    return user;
  },
  async update(id, data, models) {
    const user = await models.users.findByPk(id);
    if (!user) return null;
    return await user.update({ name: data.name, email: data.email });
  },
  async inactivate(id, models) {
    const user = await models.users.findByPk(id);
    if (!user) return null;
    return await user.update({ active: false, auth_token: null, refresh_token: null });
  },
  async activate(id, models) {
    const user = await models.users.findByPk(id);
    if (!user) return null;
    return await user.update({ active: true });
  }
};
module.exports = UserService;
