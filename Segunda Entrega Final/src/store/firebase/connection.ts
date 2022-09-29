const admin = require('firebase-admin')

import config from '../../../config'

const serviceAccount = config.FIREBASE_KEY

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coderhouse-backend-pq.firebaseio.com"
})

console.log('Connection to Firebase successful')
