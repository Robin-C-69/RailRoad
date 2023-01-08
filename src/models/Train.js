var mongoose = require("mongoose");

var trainSchema = new mongoose.Schema({
    name: String,
    start_station: String,
    end_station: String,
    time_of_departure: Date
})

module.exports = new mongoose.model('Train', trainSchema)