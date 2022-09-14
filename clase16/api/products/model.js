const Contenedor = require("../../options/cont_knex")
const { options } = require('../../options/db_mysql/options')
const DB = new Contenedor(options, 'products')

function getAllProducts() {
  return DB.getAll()
}

function addProduct({ title, price, thumbnail }) {
  const newProduct = { title, price, thumbnail }
  return DB.save(newProduct)
}

module.exports = {
  getAllProducts,
  addProduct,
}