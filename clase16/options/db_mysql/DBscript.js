const { options } = require('./options.js')
const knex = require('knex')(options)

async function DBscript() {
  try {
    await knex.schema.dropTableIfExists('products')
    console.log('products table deleted')

    await knex.schema.createTable('products', (table) => {
      table.increments('id').primary()
      table.string('title', 100).notNullable()
      table.decimal('price').notNullable()
      table.string('thumbnail', 200).notNullable()
    })

    console.log('products table created')
  } catch (error) {
    console.error(error)
  } finally {
    knex.destroy()
  }
}

module.exports = { DBscript }