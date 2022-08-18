class ContenedorMemoria {
    miId = 0
    constructor(){
        this.productos = [];
    }

    getAll(){
        return this.productos;
    }

    getById(id){
        let producto = this.productos.filter(p=> p.id == Number(id))
        return producto
    }

    addOne(producto){
        producto.id = this.miId++
        this.productos = [...this.productos, producto]
    }

    updateById(id,producto){
        this.productos.forEach(p=>{
            if(p.id == Number(id)){
                p = producto
            }
        })
        return this.productos
    }

    deleteById(id){
        let producto = this.productos.filter(p=> p.id != Number(id))
        this.productos = producto
        return producto
    }

}

module.exports = ContenedorMemoria