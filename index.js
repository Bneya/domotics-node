// import express from 'express';
const express = require('express')
const formidable = require('formidable')
const fs = require('fs')
const { exec } = require('child_process')
const cors = require('cors')
const startCrons = require('./cron-jobs')
require('dotenv').config()

const { updateFlow } = require('./cron-jobs/tasks')

const app = express();
app.use(cors())

const port = process.env.PORT || 5000;

// Para poder subir archivos
// app.use(formidable({
//     uploadDir: './uploads',
//     filename: function (n, ofn, mt) { return 'flow.json' },
// }));
//req.fields contains non-file fields 
//req.files contains files

// app.use(express.json())

app.get('/', function (req, res) {
    res.send('GET request to homepage')
  })

app.get(`/status`, function (req, res) {
    // Ruta para pingear el status
    const { ip } = req.query;
    res.status(200).send({ ping: 'ok', ip })
})

app.get(`/exec`, function (req, res) {
    console.log('params', req.query);
    res.send('EXEC done')

    const { command } = req.query;

    exec(command, (error, stdout, stderr) => {
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
})

app.post('/flow', function (req, res) {

    console.log('Empenzando función');
        
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

        console.log('files', files);
        var oldpath = files.flow.path;
        var newpath = '../node-red-flows/' + 'flow.json';
        fs.rename(oldpath, newpath, function (err) {
            console.log('rename err', err);
        });
        console.log('error', err);
    });

    exec("node-red-restart", (error, stdout, stderr) => {
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

    res.send('POST /flow');
            
})

app.get('/updateFlow', function (req, res) {
    updateFlow();
    res.send('adsad');
})

// Inicia cronJobs
startCrons();


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 