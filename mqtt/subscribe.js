
const subscribe = ({ client, topic }) => {
  client.subscribe(topic, function (err) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(`Suscrito correcta al topic ${topic}`);
    }
  })
}

module.exports = subscribe;