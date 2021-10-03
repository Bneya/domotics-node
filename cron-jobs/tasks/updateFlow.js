const axios = require('axios')
const fs = require('fs')
const { exec } = require('child_process')
// require('dotenv').config()


const updateFlow = async () => {
  console.log('ejecutando updateFlow', process.env.API_URL);
  const url = `${process.env.API_URL}/flow?id=${process.env.RASPBERRY_ID}`;
  console.log('url', url);
  const response = await axios.get(url, { timeout: 3000 })

  // const newFlow = JSON.stringify(response.data.flow);
  const newFlow = response.data.flow;
  console.log('newFlow', newFlow);

  // Guarda el archivo flow con la nueva info descargada
  const filePath = `${process.env.FILEPATH}/flow.json`;
  console.log('filePath', filePath);

  // Escribe el archivo descargado
  fs.writeFile(filePath, newFlow, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Escritura correcta');
    }
  })

  // Reinicia node-red para reconocer el nuevo flujo
  if (process.env.ISRASPBERRY) {
    exec('node-red-restart', (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }
  
}

module.exports = updateFlow;