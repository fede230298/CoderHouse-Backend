const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const pController = require("../controllers/productosController");
const pContainer = new pController("./data/products.txt");

router.get("/", (req,res,next)=>{
    pContainer.getAll()
    .then(data=>res.send(data))
    .catch((err)=>{res.send("fuck")})
})

router.post("/", ({body},res,next)=>{
    pContainer.addProduct(body)
    res.send(body)
})

router.put("/:id", (req,res,next)=>{
    pContainer.updateProduct(req.params.id,req.body)
    .then(res.send({status: "finished"}))
    .catch((err)=>{res.send("fuck")})
})

router.delete("/:id", (req,res,next)=>{
    pContainer.deleteProduct(req.params.id)
    .then(res.send({status: "finished"}))
    .catch((err)=>{res.send("fuck")})
})

module.exports = router