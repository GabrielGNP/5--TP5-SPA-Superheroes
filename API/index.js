const express = require('express');
const pc = require('picocolors')
const mongo = require('mongodb')

const app = express();

const port = process.env.PORT ?? 5000;

app.disable('x-powered-by');
app.use((req, res, next) => {
    // Permitir solicitudes desde cualquier origen
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Permitir los métodos HTTP que se pueden utilizar en las solicitudes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
    // Permitir ciertos encabezados en las solicitudes
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization', 'Content-Type, ');
  
    // Permitir que las cookies se incluyan en las solicitudes (si es necesario)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
  });
app.options('*', (req, res) => {
    // Respondemos con éxito a las solicitudes OPTIONS
    res.status(200).end();
});
app.use(express.json());


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new mongo.MongoClient(url);
const dbName = 'dbHeroe';
const colection = "heroes";
var db;
var collection;



app.get('/', (req, res) => {
    try {
        res.status(200).send("Funcionamiento correcto")
    } catch (error) {
        res.status(404).send("Error " + error)
    }
});

app.get('/allHeroes', async (req, res) =>{
    let data = await collection.find({}).project({ _id: 0, nombre: 1, casa: 1, nombrePJ: 1, biografía: 1}).sort({"nombre":1}).toArray();
    let htmlToSend = await constructCardsHTML(data)
    //console.log(htmlToSend)
    res.status(200).send(htmlToSend)
})

app.get('/allHeroes/Marvel', async (req, res) =>{
    let data = await collection.find({casa:"Marvel"}).project({ _id: 0, nombre: 1, casa: 1, nombrePJ: 1, biografía: 1}).sort({"nombre":1}).toArray();
    let htmlToSend = await constructCardsHTML(data)
    res.status(200).send(htmlToSend)
})

app.get('/allHeroes/DC', async (req, res) =>{
    let data = await collection.find({casa:"DC"}).project({ _id: 0, nombre: 1, casa: 1, nombrePJ: 1, biografía: 1}).sort({"nombre":1}).toArray();
    //console.log(data);
    let htmlToSend = await constructCardsHTML(data)
    //console.log(htmlToSend);
    res.status(200).send(htmlToSend)
})

app.get('/heroData/:name', async (req,res) =>{
    const {name} = req.params;
    try {
        console.log(pc.cyan("name: "+name))
        let data = await collection.find({nombre: name}).toArray();
        console.log(data);
        res.status(200).send(data[0])

    } catch (error) {
        console.error(pc.red(error));
        res.status(404).send("error" + error);
    }
})

app.get('/AllHeroes/AllData', async (req, res) =>{
    let data = await collection.find({}).toArray();
    //console.log(data)
    res.status(200).send(data)
})

app.post('/newHero', async (req, res) =>{
    //console.log(pc.magenta("stape1-Init"));
   const {
        nombre,
        nombrePJ,
        añoAparición,
        casa,
        biografía,
        equipamiento,
        NumImages,
    } = req.body;

    let data = await collection.find({nombre:nombre}).toArray();
    if(data[0].nombre.toLowerCase() != nombre.toLowerCase()){
        await collection.insertOne({"nombre": nombre,"nombrePJ": nombrePJ,"añoAparición": añoAparición,"casa": casa,"biografía": biografía,"equipamiento": equipamiento,"NumImages": NumImages})
        res.status(200).send("OK")
    }else{
        res.status(400).send("Este heroes ya está guardado");
        console.log(pc.bgRed("Ya existe un heroes con este nombre"));
    }
    //console.log(pc.magenta("stape2-Init"));
    
});


app.use((req, res) => {
    res.status(404).send('<h1> error 404 </h1>');
})

app.listen(port, () => {
    console.log(pc.cyan(`server listening port: http://localhost:${port}`));
    console.log(pc.bgCyan("=================")+pc.cyan(" INICIADO ")+pc.bgCyan("================="));
    console.log(pc.bgCyan("=================")+pc.cyan("  Listo   ")+pc.bgCyan("================="));   
    conectDB()
});

async function conectDB(){
    await client.connect();
    console.log(pc.green("DB conectada ✅"));
    db = client.db(dbName);
    collection = db.collection(colection);
    
    //await client.close();
    //console.log(pc.yellow("DB desconectada ✅"));
}

async function constructCardsHTML(data){
    let htmlToSend = ""
    let count = 0;
    data.forEach(heroe => {
        htmlToSend = htmlToSend 
        +` <div class="ContCard" id="card${heroe.nombre}">\n`
        +`  <section class="card ${heroe.casa}" id="C${heroe.casa}${count}">\n`
        +`      <button class="deleteCard" onclick="showAlert('C${heroe.casa}${count}')">X</button>\n`
        +`      <p class="titleCard">${heroe.nombre}</p>\n`
        +`      <article class="imgContainer">\n`       
        +`      </article>\n`
        +`      <div class="namePJ">${heroe.nombrePJ}</div>\n`
        +`      <article class="infoContainer">\n`
        +`      <p>${heroe.biografía}<p>\n`
        +`      </article>\n`
        +`      <div class="containerShowInfo">\n`
        +`          <button class="showInfo" onclick="showDialogInfo('${heroe.nombre}', 'C${heroe.casa}${count}')">Ver</button>\n`
        +`      </div>\n`
        +`  </section>\n`
        +` </div>\n`
        count++;
    });
    //console.log(htmlToSend)
    return htmlToSend;
}
