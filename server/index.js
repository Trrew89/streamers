const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = 5000


const app = express()
app.use(express.json())
app.use('/', router)


// Error processing, last middleware
app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://Trrew:Trrew@cluster0.coouwqx.mongodb.net/streamers?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(PORT))
    } catch (error) {
        console.log(error)
    }
}

start()