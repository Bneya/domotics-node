const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTTSERVER);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.on('connect', async () => {
  const msg = JSON.stringify({
    type: 'device_joined',
    data: {
      friendly_name: 'controlEmulated',
      ieee_address: '0xemulated123456'
    }
  })
  client.publish('zigbee2mqtt/bridge/event', msg);
  console.log('Se envió el msg', msg);
  
  await sleep(2000);
  process.exit();
})