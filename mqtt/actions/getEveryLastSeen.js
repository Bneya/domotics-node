const fs = require('fs');
const { getLastSeenByTopic } = require('../../utils/lastSeenManager');

const getEveryLastSeen = async (friendlyNames, acknowledge) => {

  // Leemos el archivo de db
  const dbFilePath = `${process.env.Z2MPATH}/data/database.db`;
  const fileInfo = ((fs.readFileSync(dbFilePath)).toString()).split('\n');
  const infoJson = fileInfo.map((entry) => JSON.parse(entry));

  // Armamos un resumen de los lastSeen según registro interno o DB
  const lastSeenInfo = {};
  infoJson.forEach(device => {

    // lastSeen según registro interno si lo tenemos o si no, de DB
    const friendlyName = friendlyNames[device.ieeeAddr] || 'unknown';
    const lastSeenInternal = getLastSeenByTopic({ topic: friendlyName });
    const lastSeenDb = device.lastSeen;
    const lastSeen = lastSeenInternal ? lastSeenInternal : lastSeenDb;

    lastSeenInfo[device.ieeeAddr] = {
      type: device.type,
      lastSeen,
    }
  });

  // Avisamos a nuestro caller del resultado de la operación
  acknowledge({
    status: 'ok',
    lastSeenInfo,
  })
}

module.exports = getEveryLastSeen;