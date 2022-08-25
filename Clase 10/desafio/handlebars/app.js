const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const path = require('path');
const productosRoutes = require("./routes/productosRoutes")

app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultlayout: "productos.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
})
);

app.set("views", "./views");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({extended:true}))

//app.use(express.static("public"));

app.get("/productos", productosRoutes);

app.get('/', (req, res) => {
    res.render(productosRoutes, {layout : 'index'});
});

const PORT = 8080;

const server = app.listen(PORT, err =>{
    if(err) throw new Error (`Error en el servidor ${err}`)
    console.log(`El servidor está ecuchando por el puerto ${PORT}`)
})

server.on("error", err=>{
    console.log(err)
})