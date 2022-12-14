import mongoose from 'mongoose'
import config from '../../../config'

const password = config.MONGODB_PASSWORD
const user = config.MONGODB_USER
const connectionString = `mongodb+srv://${user}:${password}@cluster0.orutqe7.mongodb.net/?retryWrites=true&w=majority`

mongoose
  .connect(connectionString)
  .then(() => console.log('Connection to mongoDB successful'))
  .catch((error) => console.error(error))
