const {promises:fs} = require("fs");
const {v4: uuidv4} = require("uuid")

class productoController{
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

    async addProduct(producto){
        try {
            this.getAll()
            .then(data =>{
                let datosJSON = JSON.parse(data);
                producto.id = uuidv4();
                let date = new Date();
                producto.timestamp = date.toUTCString();
                datosJSON.push(producto);
                let newDatos = JSON.stringify(datosJSON)
                fs.writeFile(`${this.ruta}`, newDatos, "utf-8")    
            })
        }
        catch (error) {
            console.log("Could not write")
        }
    }

    async updateProduct(searchId,producto){
        try{
            this.getAll()
            .then(data=>{
                let dataJSON = JSON.parse(data);
                let index = dataJSON.findIndex(o => o.id == searchId)
                dataJSON[index]= {...producto, "id" : searchId, "timestamp" : date.toUTCString()}
                let newDatos = JSON.stringify(dataJSON)
                fs.writeFile(`${this.ruta}`, newDatos, "utf-8")
            })
            .catch((error)=>{res.send({error: error})})
        } catch (error){
            console.log("Could not update")
        }
    }

    async deleteProduct(id){
        try{
            this.getAll()
            .then(data=>{
                let dataJSON = JSON.parse(data);
                let deletedArray = dataJSON.filter(o => o.id != id)
                let newDatos = JSON.stringify(deletedArray)
                fs.writeFile(`${this.ruta}`, newDatos, "utf-8")
            })
            .catch((error)=>{res.send({error: error})})
        } catch (error){
            console.log("Could not Delete")
        }
    }

}

module.exports = productoController;