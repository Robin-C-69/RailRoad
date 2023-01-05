const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
    name: String,
    open_hour: String,
    close_hour: String,
    image: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Station', stationSchema)