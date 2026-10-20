const mongoose = require('mongoose');

const ReadingSchema = new mongoose.Schema({
  sensorId: { type: Number, required: true },
  sensorName: { type: String },
  value: { type: Number, required: true },
  unit: { type: String },
  isAlert: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reading', ReadingSchema);
