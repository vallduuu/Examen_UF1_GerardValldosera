const cors = require('cors');
const express = require('express');
const fs = require("node:fs");
const path = require("path");
const app= express()
const stream = require("stream")
const concat = require("stream-concat")

app.use(express.json());

app.use(cors());

port = 3000;

app.listen(port,() => {
    console.log('Server listening on the port ::'+ port);
});

//EX1 BOOO

app.post('/api/ex1', (req, res) => {

    const ruta = 'C:\\Users\\Valldu\\Desktop\\programacions\\FitxersAngular\\UF1_ExamenAaD';
    DirectorMostrar(ruta);

    function DirectorMostrar(ruta) {
        console.log(ruta);
        fs.readdir(ruta, (err, files) => {
            if (err) {
                console.error("No s'ha trobat cap directori");
            } else {
                files.forEach(file => {
                    const FitxerDirectori = ruta + '/' + file;
                    const estat = fs.statSync(FitxerDirectori);
                    if (estat.isDirectory()) {
                        DirectorMostrar(FitxerDirectori);
                    } else {
                        console.log(ruta+'/'+file);
                    }
                });
            }
        });
    }

});

//EX 2 BOOOO

 app.post('/api/ex2', (req, res) => {
     const copiar = "C:\\Users\\Valldu\\Desktop\\programacions\\FitxersAngular\\UF1_ExamenAaD\\Documents\\FitxerOrigen.txt";
     const Desti = "C:\\Users\\Valldu\\Desktop\\programacions\\FitxersAngular\\UF1_ExamenAaD\\Documents\\Docs1\\FitxerDesti.txt";

     fs.readFile(copiar, 'utf8', (err, data) => {
         if (err) {
             throw err;
         }

         if (!fs.existsSync(Desti)) {
             fs.writeFile(Desti, data, (err) => {
                 if (err) {
                     throw err;
                 }
                 console.log(`Del fitxer ${copiar} s'ha copiat al fitxer ${Desti}.`);
             });
         } else {
             fs.appendFile(Desti, data, (err) => {
                 if (err) {
                     throw err;
                 }
                 console.log(`Del fitxer ${copiar} s'ha copiat al fitxer ${Desti}.`);
             });
         }
     });
});

// Ex3 BOOOOo
app.post("/api/ex3", (req, res) => {
    const ex3 = "C:\\Users\\Valldu\\Desktop\\programacions\\FitxersAngular\\UF1_ExamenAaD\\Imatges\\Imatge1.jpg";
    const readableStream = fs.createReadStream(ex3, { highWaterMark: 16384 });
    console.log(`${path.basename(ex3)}`);
    readableStream.on('data', (chunk) => {
            console.log(chunk);
        }
    );
});








