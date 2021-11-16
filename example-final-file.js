const mqtt = require('mqtt')
const client = mqtt.connect(process.env.MQTTSERVER)

client.on('connect', function () {
  client.subscribe('zigbee2mqtt/control', function (err) {
    if (!err) {
      // client.publish('presence', 'Hello mqtt')
      // const msg = JSON.stringify({ id: 'control', force: true });
      // client.publish('zigbee2mqtt/bridge/request/device/remove', msg)
    }
  })
})


client.on('message', function (topic, message) {

  const msg = JSON.stringify({ state: 'TOGGLE' });
  // console.log('msg', msg);
  client.publish('zigbee2mqtt/huelight/set', msg)
  
  // console.log('topic', topic)
  // console.log('message cooked', message.toString(), typeof message.toString())
})