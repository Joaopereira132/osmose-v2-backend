const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'osmose-app',
  brokers: [process.env.KAFKA_BROKERS || 'kafka:29092']
});

const consumer = kafka.consumer({ groupId: 'reading-group' });

module.exports = { kafka, consumer };