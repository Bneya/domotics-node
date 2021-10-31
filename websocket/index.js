
const {
  updatePasslist,
  updateFlow,
  getEveryLastSeen,
} = require('../mqtt/actions');
const socket = require('./websocket');

socket.on('connect', function (socket) {
  console.log('Connected!');
});

socket.on('heyy', (msg) => {
  console.log('heyy', msg);
})

socket.on('updatePasslist', updatePasslist);
socket.on('updateFlow', updateFlow);
socket.on('getEveryLastSeen', getEveryLastSeen);

module.exports = socket;