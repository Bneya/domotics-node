const mqtt = require('mqtt')
const subscribe = require('./subscribe')
const { bridgeEvent } = require('./topics')

const client = mqtt.connect(process.env.MQTTSERVER)

client.on('connect', function () {
  subscribe({ client, topic: 'zigbee2mqtt/control' });
  subscribe({ client, topic: 'zigbee2mqtt/bridge/event' });
})


client.on('message', function (topic, message) {

  const msg = JSON.parse(message.toString())

  // Una función diferente para cada topic
  switch (topic) {
    case 'zigbee2mqtt/bridge/event':
      bridgeEvent({ msg })
      break;
    case 'zigbee2mqtt/control':
      console.log('controlllllllllllll', msg);
      break
    default:
      console.log('Topic suscrito, pero no manejado', topic, msg);
      break;
  }
})