const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

async function start() {
    try {
        await mongoose.connect(process.env.ATLAS_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
    } catch (e) {
        console.log(e)
    }
}

const exerciseRoutes = require('./routes/exercises')
const userRoutes = require('./routes/users')

app.use('/exercises', exerciseRoutes)
app.use('/users', userRoutes)

app.listen(PORT, () =>
    console.log(`Server has been started on port: ${PORT}`)
)

start()
mongoose.connection.once('open', () => console.log('Db connection established successfully'))