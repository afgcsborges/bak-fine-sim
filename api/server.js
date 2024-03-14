const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = 3001

// Middleware
app.use(bodyParser.json())

// Connect to MongoDB Atlas
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err))

// Enable All CORS Requests
app.use(cors())
// Routes setup will go here
const finesRouter = require('./routes/fines')
app.use('/fines', finesRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
