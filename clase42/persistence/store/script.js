/* const { config } = require('./db_sqlite/config') */
import { config } from './db_sqlite/config'
/* const knex = require('knex')(config) */
import knex from 'knex'

const myKnex = knex(config)

createProduct()
createUser()
// createMessage()

async function createProduct() {
  try {
    await myKnex.schema.dropTableIfExists('products')
    console.log('products table deleted')

    await myKnex.schema.createTable('products', (table) => {
      table.increments('id').primary()
      table.string('title', 100).notNullable()
      table.decimal('price').notNullable()
      table.string('thumbnail', 200).notNullable()
    })

    console.log('products table created')
  } catch (error) {
    console.error(error)
  } finally {
    myKnex.destroy()
  }
}

async function createMessage() {
  try {
    await myKnex.schema.dropTableIfExists('messages')
    console.log('messages table deleted')

    await myKnex.schema.createTable('messages', (table) => {
      table.increments('id').primary()
      table.string('email', 100).notNullable()
      table.timestamp('date').defaultTo(myKnex.fn.now())
      table.string('message', 100).notNullable()
    })

    console.log('messages table created')
  } catch (error) {
    console.error(error)
  } finally {
    myKnex.destroy()
  }
}

async function createUser() {
  try {
    await myKnex.schema.dropTableIfExists('users')
    console.log('users table deleted')

    await myKnex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.string('email', 100).notNullable()
      table.timestamp('password').notNullable()
      table.timestamp('date').defaultTo(myKnex.fn.now())
    })

    console.log('user table created')
  } catch (error) {
    console.error(error)
  } finally {
    myKnex.destroy()
  }
}
