const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const cController = require("../controllers/carritoController");
const cContainer = new cController("./data/carrito.txt");

router.get("/:id", (req,res,next)=>{
    let productos;
    cContainer.getCartProducts(req.params.id)
    .then(data=>{
        console.log("entre al finally")
        productos = data
    })
    res.send({status: productos})
})

router.post("/", (req,res,next)=>{
    cContainer.createCart();
    res.send({"status" : "finished"})
})

router.post("/:id/productos", (req,res,next)=>{
    cContainer.addProductToCart(req.params.id,req.body);
    res.send({"status" : "finished"})
})

router.delete("/:id", (req,res,next)=>{
    cContainer.deleteCart(req.params.id);
    res.send({"status" : "finished"})
})

router.delete("/:id/productos/:id_prod", (req,res,next)=>{
    cContainer.deleteProductFromCart(req.params.id,req.params.id_prod);
    res.send({"status" : "finished"})
})

module.exports = router