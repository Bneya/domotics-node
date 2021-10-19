const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTTSERVER);

const updatePasslist = async (passlist, acknowledge) => {
  // Publicamos la nueva passlist
  const msg = JSON.stringify({
    options: {
      passlist,
    }
  });
  client.publish('zigbee2mqtt/bridge/request/options', msg);

  // Triggeramos callback para decir que funcionó
  // TODO: que compruebe el mensaje de response/options como userManagement
  acknowledge({
    status: 'ok'
  })

}

module.exports = updatePasslist;