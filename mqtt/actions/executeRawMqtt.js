const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTTSERVER);

const executeRawMqtt = (rawMqtt) => {
  // Stringify payload and publish to topic
  const { mqttTopic, mqttPayload } = rawMqtt;
  console.log('para ejecutar', mqttTopic, mqttPayload);
  // const payloadString = JSON.stringify(mqttPayload)
  client.publish(mqttTopic, mqttPayload);
}

module.exports = executeRawMqtt;