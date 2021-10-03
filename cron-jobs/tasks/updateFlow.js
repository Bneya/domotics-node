const axios = require('axios')
const fs = require('fs')
// require('dotenv').config()


const updateFlow = async () => {
  console.log('ejecutando updateFlow', process.env.API_URL);
  const url = `${process.env.API_URL}/flow?id=${process.env.RASPBERRY_ID}`;
  console.log('url', url);
  const response = await axios.get(url, { timeout: 3000 })

  const newFlow = JSON.stringify(response.data);
  console.log('newFlow', newFlow);

  // Guarda el archivo flow con la nueva info descargada
  const filePath = `${process.env.filePath}/flow.json`;
  console.log('filePath', filePath);

  fs.writeFile(filePath, newFlow, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Escritura correcta');
    }
  })

}

module.exports = updateFlow;