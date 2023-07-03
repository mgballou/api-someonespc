// require dependencies

require('dotenv').config();
require('./config/db.connection')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

// require routers
const pokemonRouter = require('./routes/pokemon-router')
const authRouter = require('./routes/auth-router')
const teamsRouter = require('./routes/teams-router')

// config 

const app = express()
const { PORT } = process.env || 5000




// middleware

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cors())
app.use(morgan("dev"))




////// mount routers as middleware

app.use('/pokemon', pokemonRouter)
app.use('/auth', authRouter)
app.use('/teams', teamsRouter)
// test home route

app.get('/', (req,res)=>res.send('hello pokemon'))

// init server
app.listen(PORT, ()=>console.log(`Listening on PORT: ${PORT}`))