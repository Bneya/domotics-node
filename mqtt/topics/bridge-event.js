const websocket = require('../../websocket');

const bridgeEvent = ({ msg }) => {
  console.log('device_announce', msg);

  // Avisa al server si se conectó algo
  if (msg.type === 'device_joined') {
    const socketMsg = `Se unió el dispositivo ${msg.data.friendly_name}, ieee ${msg.data.ieee_address}`
    console.log(socketMsg);
    websocket.emit('deviceJoined', socketMsg);
  }
}

module.exports = bridgeEvent;