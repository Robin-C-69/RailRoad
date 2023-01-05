const Station = require('../models/Station');

// Get all stations
const getAllStations = (req, res) => {
    Station.find({}, (err, station) => {
        if (err) {
            res.status(500).send(err)
        }
        else{
            res.status(200).json(station)
        }
    })
}

// Get one station by the id
const getStationById = (req, res) => {
    Station.findById(req.params.id, (err, station) => {
        if (err) {
            res.status(500).send(err)
        } else if (!station) {
            res.status(404).send('Gare non trouvée')
        } else {
            res.status(200).json(station)            
        }
    })
}


// CHeck if the time is good formating
/*function checkTimeFormating(time) {
    var [hour, minutes] = time.split(':')
    let hourCheck = (parseInt(hour) >= 0 && parseInt(hour) <= 23  && hour.length === 2)
    let minuteCheck = (parseInt(minutes) >= 0 && parseInt(minutes) <= 59 && minutes.length === 2)
    if (hourCheck && minuteCheck) {
        return true
    }
    return false
}*/

// Create new station //TODO
const createStation = (req, res) => {
    var newStation = {
        name
    }
}

// Update station //TODO
const updateStation = (req, res) => {}

// Delete station //TODO
const deleteStation = (req, res) => {}

module.exports = {
    getAllStations,
    getStationById,
    createStation,
    updateStation,
    deleteStation
}