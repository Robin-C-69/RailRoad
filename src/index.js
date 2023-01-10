const express = require('express')
const mongoose = require('mongoose')
const { isLoggedIn } = require("./middlewares/middleware.js");
require("dotenv").config()

async function connect() {
    try { 
        await mongoose.connect(process.env.MONGOOSE_CONNECT_URL)
        mongoose.set('strictQuery', true)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}
connect();

const bodyParser = require('body-parser')

const userRoutes = require('./routes/user')
const stationRoutes = require('./routes/station')
const trainRoutes = require('./routes/train')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))

app.use('/user', userRoutes)
app.use('/station', isLoggedIn, stationRoutes)
app.use('/train', isLoggedIn, trainRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("RailRoad is listening on the port ", port)
})

module.exports = app;