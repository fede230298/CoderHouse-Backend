//import productDaoFileSystem from './productDaoFileSystem'
//import shoppingCartDaoFileSystem from './shoppingCartDaoFileSystem'
//import productDaoMongoDB from './productDaoMongoDB'
//import shoppingCartDaoMongoDB from './shoppingCartDaoMongoDB'
import productDaoFirebase from '../../store/daos/productDaoFirebase'
import shoppingCartDaoFirebase from './shoppingCartDaoFirebase'

//const productDao = productDaoFileSystem
//const shoppingCartDao = shoppingCartDaoFileSystem
//const productDao = productDaoMongoDB
//const shoppingCartDao = shoppingCartDaoMongoDB
const productDao = productDaoFirebase
const shoppingCartDao = shoppingCartDaoFirebase

export { productDao, shoppingCartDao }
