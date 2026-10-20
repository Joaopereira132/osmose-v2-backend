const Reading = require('../models/Reading');

const ReadingService = {
  async create(data) {
    return await Reading.create({
      sensorId: data.sensorId,
      value: data.value,
      timestamp: data.timestamp
    });
  },

  async getAll() {
    return await Reading.find().sort({ timestamp: -1 });
  }
};

module.exports = ReadingService;
