const express = require('express');
const pc = require('picocolors')
const mongo = require('mongodb')

const {saveAllData} = require('./reWriteData');

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
const url = 'mongodb://db-mongo:27017';
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
    try {
        let data = await collection.find({}).project({ _id: 0, nombre: 1, casa: 1, nombrePJ: 1, biografía: 1, imgs:1}).sort({"nombre":1}).toArray();
        let htmlToSend = await constructCardsHTML(data)
        //console.log(htmlToSend)
        res.status(200).send(htmlToSend)    
    } catch (error) {
        console.log(error)
    }
    
})

app.get('/allHeroes/Marvel', async (req, res) =>{
    let data = await collection.find({casa:"Marvel"}).project({ _id: 0, nombre: 1, casa: 1, nombrePJ: 1, biografía: 1, imgs:1}).sort({"nombre":1}).toArray();
    let htmlToSend = await constructCardsHTML(data)
    res.status(200).send(htmlToSend)
})

app.get('/allHeroes/DC', async (req, res) =>{
    let data = await collection.find({casa:"DC"}).project({ _id: 0, nombre: 1, casa: 1, nombrePJ: 1, biografía: 1, imgs:1}).sort({"nombre":1}).toArray();
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
        imgs,
    } = req.body;

 
    let data = await collection.find({nombre:nombre}).toArray();

    if(data == "[]" || data == null || data.length == 0){
        await collection.insertOne({"nombre": nombre,"nombrePJ": nombrePJ,"añoAparición": añoAparición,"casa": casa,"biografía": biografía,"equipamiento": equipamiento,"NumImages": NumImages, "imgs": imgs})
        res.status(200).send("OK")
    }else{
        res.status(400).send("Este heroes ya está guardado");
        console.log(pc.bgRed("Ya existe un heroes con este nombre"));
    }
    //console.log(pc.magenta("stape2-Init"));
    
});

app.delete('/deleteHero/:name', async (req, res)=>{
    try {
        const {name} = req.params;
        let algo = collection.deleteOne({nombre: name});
        res.send("DELETE Confirmed")   
    } catch (error) {
        res.send(error);
    }
})

app.post('/updateHero', async (req, res) =>{
   const {
        editarHeroe,
        nombre,
        nombrePJ,
        añoAparición,
        casa,
        biografía,
        equipamiento,
        NumImages,
        imgs,
    } = req.body;

    //let data = await collection.find({nombre:nombre}).toArray();
    try {
        let data = await collection.updateOne({nombre:editarHeroe},{$set:{nombre:nombre,nombrePJ:nombrePJ,añoAparición:añoAparición,casa:casa,biografía:biografía,equipamiento:equipamiento,NumImages:NumImages,imgs:imgs}})
        console.log(data)
        res.status(200).send("OK")
    } catch (error) {
        res.status(400).send("Este heroes ya está guardado");
        console.log(pc.bgRed("Ya existe un heroes con este nombre"));
    }
});

app.get('/allImages/DC', async (req, res) =>{
    res.status(200).send(["Aquaman.png","Batgirl.png","Batman.png",
        "Black Canary.png","Blue Beetle.png","Cyborg.png",
        "Dr fate.png","Flash.png","Green-Lantern.png",
        "Harley-Queen.png","Hawkgirl.png","Joker.png",
        "Martian Manhunter.png","Mr-Freeze.png","Nightwing.png",
        "Peacemaker.png","Penguin.png","Red Tornado.png",
        "shazam.png","Supergirl.png","Superman.png",
        "Wonder Woman.png","Zatanna.png"
    ])
})
app.get('/allImages/Marvel', async (req, res) =>{
    res.status(200).send(["Annihilus.png",
        "Ant-Man.png","black panther.png","Black Widow.png",
        "captain america.png","Daredevil.png","Deadpool.png",
        "Dr Strange.png","Dr-Doom.png","Falcon.png",
        "Green-Goblin.png","Hawkeye.png","Hulk.png",
        "Iron-Man.png","Juggernaut.png","Loki.png",
        "Magneto.png","Punisher.png","Scarlet Witch.png",
        "She Hulk.png","Spiderman 1.png","Spiderman 2.png",
        "Star-Lord.png","Storm.png","Thor.png",
        "vision.png","Wolverine 1.png","Wolverine 2.png"])
})

app.use((req, res) => {
    res.status(404).send('<h1> error 404 </h1>');
})

app.listen(port, async () => {
    console.log(pc.cyan(`server listening port: http://localhost:${port}`));
    console.log(pc.bgCyan("=================")+pc.cyan(" INICIANDO... ")+pc.bgCyan("================="));
    await conectDB()
    console.log(pc.bgCyan("=================")+pc.cyan("  Listo   ")+pc.bgCyan("================="));   
});

async function conectDB(){
    await saveAllData();
    
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

    data.sort((a, b) => {
        const nameA = a.nombre.toLowerCase();
        const nameB = b.nombre.toLowerCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    if(data.length == 0){
        return "No hay heroes guardados"
    }
    data.forEach(heroe => {
        try {
            // console.log(heroe.imgs.length);
            // console.log(heroe.imgs);
            // console.log("=====================");
            htmlToSend = htmlToSend 
            +` <div class="ContCard" id="card${heroe.nombre}">\n`
            +`  <section class="card ${heroe.casa}" id="C${heroe.casa}${count}">\n`
            +`      <button class="deleteCard" onclick="showAlert('C${heroe.casa}${count}')">X</button>\n`
            +`      <p class="titleCard">${heroe.nombre}</p>\n`
            +`      <article class="imgContainer">\n`
            +`           <div class="switchImages" id="switchImg${count}" style="transform: translateY(0px);">`;
            if(Array.isArray(heroe.imgs) && heroe.imgs.length > 0){
                heroe.imgs.forEach(image => {
                    htmlToSend = htmlToSend 
            +`              <img src="imgs/${heroe.casa}/${image}" width="100%"> \n`;
                })
            }else{
                htmlToSend = htmlToSend 
            +`              <p>¿?</p> \n`;    
            }
            htmlToSend = htmlToSend   
            +           `</div>`    
            +`      </article>\n`
            +`      <div class="namePJ">${heroe.nombrePJ}</div>\n`
            +`      <article class="infoContainer">\n`
            +`      <p>${heroe.biografía}<p>\n`
            +`      </article>\n`
            +`      <div class="containerShowInfo">\n`
            +`          <button class="showInfo" onclick="showDialogInfo('${heroe.nombre}', 'C${heroe.casa}${count}')">Ver</button>\n`
            +`      </div>\n`
            +`  </section>\n`
            +` </div>\n`;
            count++;
        } catch (error) {
            console.log(pc.bgRed(error))
        }
        
    });
    //console.log(htmlToSend)
    return htmlToSend;
}


