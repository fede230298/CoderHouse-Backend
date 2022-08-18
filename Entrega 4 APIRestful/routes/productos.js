const express = require('express');
const router = express.Router();
const ContenedorMemoria = require('../contenedor/contenedorMemoria');
const data = new ContenedorMemoria();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //Devuelve todos los productos
  res.send({data:data.getAll()});
});

router.get('/:id',(req,res)=>{
  //Devuelve un producto por Id
  let producto = data.getById(req.params.id)
  if(producto.length == 0){
    res.send({error : "Producto no encontrado"})
  }else{
    res.send({data:producto})
  }
})

router.post('/',({body},res)=>{
  //Enviamos los datos
  data.addOne(body)
  res.send({datos:body})
})

router.put('/:id',(req,res)=>{
  //Modificar según Id
  let id = req.params.id
  res.send({datos:req.body})
})

router.delete('/:id',(req,res)=>{
  //Elimina según Id
  let newData = data.deleteById(req.params.id)
  res.send({datos: newData})
})

module.exports = router;