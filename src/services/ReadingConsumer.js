const { consumer } = require('../config/kafka');
const Reading = require('../models/Reading');

const runConsumer = async () => {
  try {
    await consumer.connect();
    // where sensors send data
    await consumer.subscribe({ topic: 'sensor-readings', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const data = JSON.parse(message.value.toString());
          // Automatically saves to Mongo
          await Reading.create(data);
          console.log('Kafka -> MongoDB: Reading saved for sensor', data.sensorId);
        } catch (err) {
          console.error('Error processing Kafka message:', err.message);
        }
      }
    });
  } catch (error) {
    console.error('Error connecting to Kafka Consumer:', error.message);
  }
};

module.exports = { runConsumer };
