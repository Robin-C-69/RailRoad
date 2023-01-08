var mongoose = require("mongoose");

var stationSchema = new mongoose.Schema({
    name: String,
    open_hour: String,
    close_hour: String,
    image: {
        data: Buffer,
        contentType: String
    }
})

module.exports = new mongoose.model('Station', stationSchema)