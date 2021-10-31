
const responseOptions = ({ msg, client }) => {
  console.log('responseOptions', msg);

  if (msg.data.restart_required) {
    const rstMsg = JSON.stringify({});
    client.publish('zigbee2mqtt/bridge/request/restart', rstMsg);
  }
}

module.exports = responseOptions;