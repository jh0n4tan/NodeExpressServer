const { static } = require("express");
const express = require("express"); //inicializar express
const app = express(); //este es el servidor
const morgan = require("morgan"); //middleware de tercero

//settings

app.set("appName","Variable de Configuracion");
app.set("port","5000");
app.set("veiw engine","ejs");




//se ejecuta antes que llegue a la ruta original
//el middleware se ejecuta antes de cualquier ruta
function logger(req,res,next){
    console.log("Request Received by protocol: " + req.protocol + "://" + req.get("host") + req.originalUrl);
    next();
}



//middlewares
app.use(express.json()); //se usa para que se vea el json(tambien es un middleware)
//app.use(logger);//lamando al middelware
app.use(morgan('dev')); //middelware morgan(terceros)













//routes


//se ejecutara primero all en todas las rutas que se llamen
//como la misma
/*
app.all("/about",(req,res)=>{
    console.log("esto sale primero");
    res.send("End");
});
*/

//si se quiere pasar a la siguiente ruta se usa next
app.all("/",(req,res,next)=>{
    console.log("esto sale primero");
    next();
});

/*
app.get("/",(req,res) => {
    res.json({
        username: "sancho",
        lastname: "panza"
    });
});
*/

app.get("/",(req,res) => {
    const data = [{name:"olivia"},{name:"cocoliso"},{name:"pilon"}]
    res.render("index.ejs",{people:data});
});


app.post("/about/:id",(req,res) => {
    console.log(req.params);//datos del cuerpo de la peticion
    console.log(req.body);//parametros de la peticion(url)
});


app.put("/about/:user",(req,res) => {
    res.send("user " + req.params.user + " will be updated");
});


app.delete("/about/:user",(req,res) => {
    res.send("user " + req.params.user + " will be deleted");
});



app.use(express.static("public"));


app.listen(app.get("port"),() => {
    console.log(app.get("appName"));
    console.log("Server is runnign on port ", app.get("port"));
});

