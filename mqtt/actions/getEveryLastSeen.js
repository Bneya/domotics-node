const fs = require('fs');

const getEveryLastSeen = async (acknowledge) => {
  console.log('getEveryLastSeen ejecutándose');
  console.log('Z2MPATH', process.env.Z2MPATH);

  // Leemos el archivo de db
  const dbFilePath = `${process.env.Z2MPATH}/data/database.db`;
  const fileInfo = ((fs.readFileSync(dbFilePath)).toString()).split('\n');
  const infoJson = fileInfo.map((entry) => JSON.parse(entry));
  
  // console.log('fileInfo', fileInfo);
  // console.log('infoJson', infoJson);

  // Armamos un resumen de los lastSeen de los dispositivos
  const lastSeenInfo = {};
  infoJson.forEach(device => {
    lastSeenInfo[device.ieeeAddr] = {
      type: device.type,
      lastSeen: device.lastSeen,
    }
  });
  // const everyLastSeen = infoJson.map((device) => {
  //   return {
  //     ieeeAddr: device.ieeeAddr,
  //     type: device.type,
  //     lastSeen: device.lastSeen,
  //   }
  // });
  console.log('everyLastSeen', lastSeenInfo);

  // Avisamos a nuestro caller del resultado de la operación
  acknowledge({
    status: 'ok',
    lastSeenInfo,
  })
}

module.exports = getEveryLastSeen;