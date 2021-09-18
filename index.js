import express from 'express';
// import formidable from 'express-formidable';
import formidable from 'formidable';
import fs from 'fs';

const app = express();

const port = 5000;

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

app.post('/flow', function (req, res) {

    console.log('Empenzando función');
        
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        // console.log('files', files);
        var oldpath = files.flow.path;
        var newpath = './uploads/' + 'flow.json';
        fs.rename(oldpath, newpath, function (err) {});
        console.log('error', err);
    });

    res.send('POST /flow');
            
})


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 