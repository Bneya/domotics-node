const websocket = require('../../websocket');

const bridgeEvent = ({ msg }) => {
  console.log('device_announce', msg);

  // Avisa al server si se conectó algo
  if (msg.type === 'device_joined') {
    const { friendly_name, ieee_address } = msg.data;
    const socketMsg = {
      description: `Se unió el dispositivo ${friendly_name}, ieee ${ieee_address}`,
      data: { friendly_name, ieee_address },
    }
    console.log(socketMsg);
    websocket.emit('deviceJoined', socketMsg);
  }
}

module.exports = bridgeEvent;