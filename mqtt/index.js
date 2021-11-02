const mqtt = require('mqtt')
const subscribe = require('./subscribe')
const {
  bridgeEvent,
  responseOptions,
  handleLastSeen
} = require('./topics')

const client = mqtt.connect(process.env.MQTTSERVER)

client.on('connect', function () {
  subscribe({ client, topic: 'zigbee2mqtt/bridge/event' });
  subscribe({ client, topic: 'zigbee2mqtt/bridge/response/options' });
  subscribe({ client, topic: 'zigbee2mqtt/+' }); // Any topic
})


client.on('message', function (topic, message) {

  const msg = JSON.parse(message.toString())

  // Una función diferente para cada topic
  switch (topic) {
    case 'zigbee2mqtt/bridge/event':
      bridgeEvent({ msg });
      break;
    case 'zigbee2mqtt/bridge/response/options':
      responseOptions({ msg, client });
      break;
    default:
      console.log('Topic suscrito, pero no manejado', topic, msg);
      break;
  }

  // Manejo para tener actualizado el last_seen
  handleLastSeen({ topic, msg });
})