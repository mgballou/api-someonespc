// require dependencies

require('dotenv').config();
require('./config/db.connection')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

// require routers


// config 

const app = express()
const { PORT } = process.env || 5000


// middleware

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cors())
app.use(morgan("dev"))

////// mount routers as middleware



// test home route

app.get('/', (req,res)=>res.send('hello pokemon'))

// init server
app.listen(PORT, ()=>console.log(`Listening on PORT: ${PORT}`))