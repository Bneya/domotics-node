const cron = require('node-cron')
const { updateFlow } = require('./tasks')

function startCrons() {
  // TCada minuto
  cron.schedule(`* * * * *`, updateFlow)
}

module.exports = startCrons;