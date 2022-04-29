require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json()) //bodyparser
//conexion a db
require('./db/connect.js')
const instrumentosRouter = require('./controllers/instrumentos')

app.get('/', (req,res) => {
    res.json({"server":"on"})
})
app.use('/instrumentos', instrumentosRouter)

const PORT = 3001 || process.env.PORT
app.listen(PORT, () => {
    console.log(`server on in port ${PORT}`)
})
