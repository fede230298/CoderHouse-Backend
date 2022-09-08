const express = require("express");
const path = require('path');
const productosRouter = require("./routes/productosRouter");
const carritoRouter = require("./routes/carritoRouter");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);

app.get("/", (req,res,next)=>{
    res.send("This is working")
})


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})