const { updateLastSeen } = require('../../utils/lastSeenManager');

// Mantiene actualizazdo los last_seen de los dispositivos
const handleLastSeen = ({ topic, msg }) => {
  const deviceTopic = topic.replace('zigbee2mqtt/', '');
  const { last_seen } = msg;
  updateLastSeen({ topic: deviceTopic, last_seen });
}

module.exports = handleLastSeen;