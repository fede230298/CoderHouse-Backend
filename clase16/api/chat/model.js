const Contenedor = require("../../options/cont_knex")
const { options } = require('../../options/db_sqlite/options')
const DB = new Contenedor(options, 'messages')

function getAllMessages() {
  return DB.getAll()
}

function addMessage({ email, message }) {
  const newMessage = { email, message }
  return DB.save(newMessage)
}

module.exports = {
  getAllMessages,
  addMessage,
}