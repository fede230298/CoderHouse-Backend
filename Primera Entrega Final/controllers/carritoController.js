const {promises:fs} = require("fs");
const {v4: uuidv4} = require("uuid");

class carritoController{
    constructor(ruta){
        this.ruta = ruta;
    }

    async getAll(){
        try {
            let datos = await fs.readFile(this.ruta, 'utf-8')
            return datos
        } catch (error) {
            return "Could not load"
        }
    }

    async getCartProducts(searchId){
        try{
            let pFinal = await this.getAll()
            .then(data=>{
                let dataJSON = JSON.parse(data);
                let index = dataJSON.findIndex(o => o.id == searchId)
                console.log(dataJSON[index].productos)
                return dataJSON[index].productos
            })
            return pFinal
        } catch (error){
            console.log("Could not update")
        }
    }

    async createCart(){
        try {
            let carrito= {};
            this.getAll()
            .then(data =>{
                let datosJSON = JSON.parse(data);
                carrito.id = uuidv4();
                let date = new Date();
                carrito.timestamp = date.toUTCString();
                datosJSON = [...datosJSON, {...carrito, "productos" : {}}]
                let newDatos = JSON.stringify(datosJSON)
                fs.writeFile(`${this.ruta}`, newDatos, "utf-8")
            })
        }
        catch (error) {
            console.log("Could not write")
        }
    }

    async addProductToCart(searchId, newProducto){
        try{
            this.getAll()
            .then(data=>{
                let dataJSON = JSON.parse(data);
                let index = dataJSON.findIndex(o => o.id == searchId)
                let product = {...newProducto}
                let date = new Date();
                if(dataJSON[index].productos.length > 0){
                    dataJSON[index]= {"id" : dataJSON[index].id, "timestamp" : dataJSON[index].timestamp, "productos" : [...dataJSON[index].productos, {"timestamp": date.toUTCString(), ...product}]}
                } else {
                    dataJSON[index]= {"id" : dataJSON[index].id, "timestamp" : dataJSON[index].timestamp, "productos" : [{"timestamp": date.toUTCString(), ...product}]}
                }
                let newDatos = JSON.stringify(dataJSON)
                fs.writeFile(`${this.ruta}`, newDatos, "utf-8")
            })
        } catch (error){
            console.log("Could not update")
        }
    }

    async deleteCart(id){
        try{
            this.getAll()
            .then(data=>{
                let dataJSON = JSON.parse(data);
                let deletedArray = dataJSON.filter(o => o.id != id)
                let newDatos = JSON.stringify(deletedArray)
                fs.writeFile(`${this.ruta}`, newDatos, "utf-8")
            })
        } catch (error){
            console.log("Could not update")
        }
    }

    async deleteProductFromCart(idCarrito, idProducto){
        try{
            this.getAll()
            .then(data=>{
                let dataJSON = JSON.parse(data);
                let index = dataJSON.findIndex(o => o.id == idCarrito)
                let indexP= dataJSON[index].productos.findIndex(o => o.id == idProducto)
                delete dataJSON[index].productos[indexP]
                let deletedArray = dataJSON[index].productos.filter(o => {
                    return o !== null
                })
                dataJSON[index].productos = deletedArray
                let newData = JSON.stringify(dataJSON)
                fs.writeFile(`${this.ruta}`, newData, "utf-8")
            })
        } catch (error){
            console.log("Could not update")
        }
    }

}

module.exports = carritoController;