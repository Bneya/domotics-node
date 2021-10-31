const fs = require('fs');
const execa = require('execa');

const updateFlow = (newFlowString, acknowledge) => {
  // console.log('newFlowString', newFlowString);

  // Crea la carpeta flow si no existe y crea el file ahí
  const dir = __dirname + '/../../../flows';
  const filePath = `${dir}/flow.js`;
  // console.log('dir, filePath', dir, filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log('Hemos creado la carpeta que no estaba');
  }
  fs.writeFile(filePath, newFlowString, function (err) {
    if (err) console.log(err);

    console.log('Funcionó lña aescritura del archivo');

    // Finalmente corre el archivo guardado como server de node
    // a propósito no detached, solo corre si el server raspberry corre
    execa.node(filePath);
  })

  
}

module.exports = updateFlow;