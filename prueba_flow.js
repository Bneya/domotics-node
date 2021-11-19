const mqtt = require('mqtt');
// const axios = require('axios');

const client = mqtt.connect(process.env.MQTTSERVER);

client.on('connect', function () {
  client.subscribe('zigbee2mqtt/control', function (){});
  // client.subscribe('zigbee2mqtt/control', function (){});
})


/* Forma 1: Cada "listener" en blockly genera su propio bloque 
client.on(message) con el if (topic == <topoc>).
Todo lo que viene después del listener estaría dentro
de este "if".
// */
client.on('message', function (topic, message) {
  if (topic === 'zigbee2mqtt/control') {
    // axios.post(url, 'Se activó el trigger... con estos params...');
    console.log('Trigger 1', topic, message.toString());
  }

});

client.on('message', function (topic, message) {
  if (topic === 'zigbee2mqtt/control') {
    // axios.post(url, 'Se activó el trigger... con estos params...');
    console.log('Trigger 2', topic, message.toString());
  }
})

/* Forma 2: Existe 1 único client.on(message). Cada listener
en blockly genera un if (topic === <topic>). Todo lo que viene
después del listener estaría dentro de este if.
*/
client.on('message', function (topic, message) {
  // const messageClean = message.toString();

  if (topic === 'zigbee2mqtt/control') {
    axios.post(url, 'Se activó el trigger... con estos params...');
    console.log('Trigger 1', topic, message.toString());
  }

  if (topic === 'zigbee2mqtt/control') {
    // axios.post(url, 'Se activó el trigger... con estos params...');
    console.log('Trigger 2', topic, message.toString());
  }
})

