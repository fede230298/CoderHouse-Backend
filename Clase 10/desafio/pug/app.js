const express = require('express');
const path = require('path');
const productosRoutes = require('./routes/productosRoutes')

const PORT = 3000 || process.env.PORT;

const app = express();

app.set('views', './views');
app.set('view engine', 'pug')

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/productos', productosRoutes)

const server = app.listen(PORT, ()=>{
    console.log(`Se está escuchando por el port ${PORT}`);
})

server.on('error', err=>{
    console.log(err)
})