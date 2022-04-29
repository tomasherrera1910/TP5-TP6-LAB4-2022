const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log('db connected'))
.catch(error => console.log(`error in connection: ${error}`))

process.on('uncaughtException', error => {
    console.error(error)
    mongoose.disconnect()
  })
  
module.exports = mongoose