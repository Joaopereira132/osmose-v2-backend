const path = require('path');
process.loadEnvFile(path.resolve(__dirname, './.env'));

const { Kafka } = require('kafkajs');
const logger = require('./src/utils/logger');

const kafka = new Kafka({
  clientId: 'sensor-simulator',
  brokers: [process.env.KAFKA_BROKERS || 'localhost:9092']
});

const producer = kafka.producer();

const sensors = [
  { id: 1, name: 'Sensor de Pressão Principal', unit: 'bar', min: 1.5, max: 4.0 },
  { id: 2, name: 'Sensor de Pressão Norte', unit: 'bar', min: 1.5, max: 4.0 },
  { id: 3, name: 'Sensor de Pressão Oeste', unit: 'bar', min: 1.5, max: 4.0 },
  { id: 4, name: 'Sensor de Temperatura de Desinfeção', unit: '°C', min: 80, max: 95 },
  { id: 5, name: 'Sensor de Condutividade', unit: 'µS/cm', min: 0, max: 15 }
];
let index = 0;

const sendReadings = async () => {
  await producer.connect();
  logger.info('Simulator: Connected to Kafka successfully!');

  setInterval(async () => {
    const sensor = sensors[index % sensors.length];
    index++;

    const value = parseFloat((Math.random() * (sensor.max - sensor.min) + sensor.min).toFixed(2));

    const reading = {
      sensorId: sensor.id,
      sensorName: sensor.name,
      value: value,
      unit: sensor.unit,
      isAlert: false,
      timestamp: new Date()
    };

    await producer.send({
      topic: 'sensor-readings',
      messages: [{ value: JSON.stringify(reading) }]
    });

    logger.info(`Reading sent -> Sensor: ${sensor.name} | Value: ${value} ${sensor.unit}`);
  }, 5000);
};

sendReadings().catch((err) => {
  logger.error(err, 'Fatal error in Kafka simulator');
});
