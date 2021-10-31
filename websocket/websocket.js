const io = require('socket.io-client');

const socket = io(process.env.WEBSOCKET_URL, {
  reconnect: true,
  query: {
    coordinatorId: process.env.RASPBERRY_ID,
    type: 'coordinator',
  }
})

module.exports = socket;