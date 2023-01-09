const Train = require('../models/Train')
const Station = require('../models/Station');

// Get all trains
const getAllTrains = (req, res) => {
    Train.find({}, (err, station) => {
        if (err) {
            res.status(500).send(err)
        }
        else{
            res.status(200).json(station)
        }
    }).sort({
        name: req.body.sort_name,
        start_station: req.body.sort_start,
        end_station: req.body.sort_end,
        time_of_departure: req.body.sort_time
    }).limit(req.body.limit ? req.body.limit : 10)
}

// Get one train by the id
const getTrainById = (req, res) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {  // Check if the _id is good formated
        Train.findById(req.params.id, (err, train) => {
            if (err) {
                res.status(500).send(err)
            } else if (!train) {
                res.status(404).send('Train non trouvée')
            } else {
                res.status(200).json(train)            
            }
        })
    } else {
        res.status(400).send('Le champ _id n\'est pas correct')
    }
}

// Check if a station exists 
// Usefull to check if the start of end of a train exists
//TODO
function checkLocation(stationWanted) {
    // Don't work
    const allStations = Station.find({}, (err, station) => {
        if (err) {
            return err
        } else {
            console.log("station = " + station)
            return station
        }
    })
    //var allStations =
    //    [{
    //      _id: "63bb2b485392d9ced5e6e9fb",
    //      name: 'Lyon',
    //      open_hour: '08:00',
    //      close_hour: '20:00'
    //    },
    //    {
    //        _id: "63bb2b485392d9ced5e6e9it",
    //        name: 'Paris',
    //        open_hour: '08:00',
    //        close_hour: '20:00'
    //    }]

    // Works from here
    console.log('allStations = ' + JSON.stringify(allStations))
    for (const key in allStations) {
        if (allStations[key]["name"] === stationWanted) {
            return true            
        }
    }
    return false
}

// Create new train
const createTrain = (req, res) => {
    const newTrain = new Train(req.body);
    if (checkLocation(req.body.start_station) && checkLocation(req.body.end_station)){
        newTrain.save((err, train) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).json(train)
            }
        })
    }
}

// Update Train
const updateTrain = (req, res) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        Train.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, train) => {
            if (err) {
                res.status(500).send(err)
            } else if (!train) {
                res.status(404).send('Train non trouvé');
            } else {
                res.status(200).json(train);
            }
        })
    } else {
        res.status(400).send('Le champ _id n\'est pas correct')
    }
}

// Delete train by the id
const deleteTrain = (req, res) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        Train.findByIdAndRemove(req.params.id, (err, train) => {
            if (err) {
                res.status(500).send(err)
            } else if (!train) {
                res.status(404).send('Train non trouvé');
            } else {
                res.status(200).json(train);
            }
        })
    } else {
        res.status(400).send('Le champ _id n\'est pas correct')
    }
}

module.exports = {
    getAllTrains,
    getTrainById, 
    createTrain,
    updateTrain,
    deleteTrain
}
