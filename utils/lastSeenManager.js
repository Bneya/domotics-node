const { DateTime } = require('luxon');

const lastSeenDict = {};

function updateLastSeen({ topic, last_seen }) {
  lastSeenDict[topic] = DateTime.fromISO(last_seen).ts;
}

function getLastSeenByTopic({ topic }) {
  return lastSeenDict[topic];
}

function getEveryLastSeen() {
  return lastSeenDict;
}

module.exports = { updateLastSeen, getLastSeenByTopic, getEveryLastSeen };