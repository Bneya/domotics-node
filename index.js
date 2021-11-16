const express = require('express')
const cors = require('cors')
require('dotenv').config()

// mqtt
require('./mqtt')

// websocket
require('./websocket')



const app = express();
app.use(cors())

const port = process.env.PORT || 5000;


app.get('/', function (req, res) {
    res.send('GET request to homepage')
  })

const { getEveryLastSeen } = require('./mqtt/actions');
app.get('/test', function (req, res) {
  getEveryLastSeen(function (answer) {
    console.log('answer', answer);
  });
  res.send('ok');
})


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 