'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('osmosis_units', 'status', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.sequelize.query(`UPDATE osmosis_units SET status = 'Active' WHERE status = 'Ativo'`);
    await queryInterface.sequelize.query(`UPDATE osmosis_units SET status = 'Inactive' WHERE status = 'Desativo'`);
    await queryInterface.sequelize.query(`UPDATE osmosis_units SET status = 'Under maintenance' WHERE status = 'Em manutenção'`);

    await queryInterface.changeColumn('osmosis_units', 'status', {
      type: Sequelize.ENUM('Active', 'Inactive', 'Under maintenance'),
      defaultValue: 'Active',
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('osmosis_units', 'status', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.sequelize.query(`UPDATE osmosis_units SET status = 'Ativo' WHERE status = 'Active'`);
    await queryInterface.sequelize.query(`UPDATE osmosis_units SET status = 'Desativo' WHERE status = 'Inactive'`);
    await queryInterface.sequelize.query(`UPDATE osmosis_units SET status = 'Em manutenção' WHERE status = 'Under maintenance'`);

    await queryInterface.changeColumn('osmosis_units', 'status', {
      type: Sequelize.ENUM('Ativo', 'Desativo', 'Em manutenção'),
      defaultValue: 'Ativo',
      allowNull: false
    });
  }
};
