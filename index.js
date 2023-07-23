const express = require ('express') // importa paquete express
const app = express () //crear instancia


const fs = require('fs')

app.listen(3000, () => {console.log("Servidor iniciado en puerto 3000")});

//MIDDLEWARES
app.use(express.json()); 



app.post("/canciones", (req, res) => { 

    const cancion = req.body; // almacenando payload de la consulta
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8")); // almacena contenido parseado en json

    canciones.push(cancion); // agregando objeto recibido al arreglo
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones)); // sobreescribiendo json con el objeto recibido

    res.send("Canción agregada con exito al repertorio"); //respondiendo al cliente
  });


// ENTREGAR INFORMACIÓN A PARTIR DE UNA CONSULTA

app.get("/canciones", (req, res) => { // ruta + callback (res) para devolver json

    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));

    res.json(canciones);
});

app.delete("/canciones/:id", (req, res) => {

    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
    const index = canciones.findIndex (c=> c.id == id)
    

    canciones.splice(index, 1);

    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));

    res.send ("Canción eliminada")
  });

  //MODIFICANDO UN RECURSO

app.put("/canciones/:id", (req, res) => { //crear la ruta que recibe el id de los objetos almacenados en el json

    const data = req.body;
    const {id} = req.params; //recibir el id del objeto y modificar como parámentro de la ruta, esperar el payload para modificar
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8')); //sobrescribir archivo
    const index = canciones.findIndex(c => c.id == id);

    canciones[index] = data;

    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));

    res.send("Canción actualizada correctamete");
});

// DEVOLVER HTML DESDE EL SERVIDOR

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');

})

