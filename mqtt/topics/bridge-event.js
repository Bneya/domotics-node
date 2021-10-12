const bridgeEvent = ({ msg }) => {
  console.log('device_announce', msg);
}

module.exports = bridgeEvent;