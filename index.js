const express = require("express"); //inicializar express
const app = express(); //este es el servidor




//rutas
app.use(express.json()); //se usa para que se vea el json

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


app.get("/",(req,res) => {
    res.json({
        username: "sancho",
        lastname: "panza"
    });
});

app.get("/about",(req,res) => {
    res.send("get recieved");
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


app.listen(3000,() => {
    console.log("Server is runnign on port 3000");
});

