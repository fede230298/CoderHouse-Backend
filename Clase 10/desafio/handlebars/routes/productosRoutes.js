const express = require('express');
const router = express.Router();

let id = 3;

let listaProductos = [
    {id: 1, title: "tv32",
    price: "55000",
    thumbnail: "https://medias.musimundo.com/medias/00550002-146151-146151-01-146151-01.jpg-size515?context=bWFzdGVyfGltYWdlc3w1ODc2MnxpbWFnZS9qcGVnfGg5Ny9oODAvMTAzODQwMDUyMzQ3MTgvMDA1NTAwMDItMTQ2MTUxLTE0NjE1MV8wMS0xNDYxNTFfMDEuanBnX3NpemU1MTV8ZGNhMjUyM2VmMzM3MTRmNjkwZGJjNjNmYjE0NWI1ZDExMmM2ODliNjIwOTY1MThkZTQ4ZjU4ZDI4OWQxZDA5Yw"},
    {id: 2,title: "tv32",
    price: "55000",
    thumbnail: "https://medias.musimundo.com/medias/00550002-146151-146151-01-146151-01.jpg-size515?context=bWFzdGVyfGltYWdlc3w1ODc2MnxpbWFnZS9qcGVnfGg5Ny9oODAvMTAzODQwMDUyMzQ3MTgvMDA1NTAwMDItMTQ2MTUxLTE0NjE1MV8wMS0xNDYxNTFfMDEuanBnX3NpemU1MTV8ZGNhMjUyM2VmMzM3MTRmNjkwZGJjNjNmYjE0NWI1ZDExMmM2ODliNjIwOTY1MThkZTQ4ZjU4ZDI4OWQxZDA5Yw"},
    {id: 3,title: "tv32",
    price: "55000",
    thumbnail: "https://medias.musimundo.com/medias/00550002-146151-146151-01-146151-01.jpg-size515?context=bWFzdGVyfGltYWdlc3w1ODc2MnxpbWFnZS9qcGVnfGg5Ny9oODAvMTAzODQwMDUyMzQ3MTgvMDA1NTAwMDItMTQ2MTUxLTE0NjE1MV8wMS0xNDYxNTFfMDEuanBnX3NpemU1MTV8ZGNhMjUyM2VmMzM3MTRmNjkwZGJjNjNmYjE0NWI1ZDExMmM2ODliNjIwOTY1MThkZTQ4ZjU4ZDI4OWQxZDA5Yw"}
]

router.get('/mostrarProductos', (req,res)=>{
    res.render('productos', {productos: listaProductos})
})

router.get('/agregarProducto', (req,res)=>{
    res.render('agregarProducto')
})

router.get('/detalle/:id', (req,res)=>{
    let id =req.params.id
    let miProducto = listaProductos.filter(p=>p.id == id)
    if(miProducto.length == 0){
        return res.send(`No existe ese producto`)
    }
    res.send(miProducto)
})

router.post('/', (req,res)=>{
    let datos = req.body;
    datos.id = id++
    listaProductos=([...listaProductos, datos])

    res.redirect('/productos/agregarProducto');
})

module.exports=router;