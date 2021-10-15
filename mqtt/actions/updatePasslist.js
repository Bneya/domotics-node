const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTTSERVER);

const updatePasslist = (passlist) => {
  // Publicamos la nueva passlist
  const msg = JSON.stringify({
    options: {
      passlist,
    }
  });
  client.publish('zigbee2mqtt/bridge/request/options', msg);
}

module.exports = updatePasslist;