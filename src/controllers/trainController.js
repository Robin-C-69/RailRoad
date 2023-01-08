const Train = require('../models/Train')
const Station = require('../models/Station');

// Get all trains
const getAllTrains = (req, res) => {
    Train.find({}, (err, station) => {
        if (err) {
            res.status(500).send(err)
        }
        else{
            const sliced = station.slice(0,10)
            res.status(200).json(sliced)
        }
    })
}

// Get one train by the id
const getTrainById = (req, res) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
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

// Create new train  //TODO
function checkStation(station) {
    return true
    const allStations = Station.find({}, (err, station) => {
        if (err) {
            res.status(500).send(err)
        }
        else{
            res.status(200).json(station)
        }
    })
}

const createTrain = (req, res) => {
    const newTrain = new Train(req.body);
    if (checkStation(req.body.start_station) && checkStation(req.body.end_station)){
        newTrain.save((err, train) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(201).json(train)
            }
        })
    }
}

// Update Train
const updateTrain = (req, res) => {
    Train.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, train) => {
        if (err) {
            res.status(500).send(err)
        } else if (!train) {
            res.status(404).send('Train non trouvé');
        } else {
            res.status(200).json(train);
        }
    })
}

// Delete train
const deleteTrain = (req, res) => {
    Train.findByIdAndRemove(req.params.id, (err, train) => {
        if (err) {
            res.status(500).send(err)
        } else if (!train) {
            res.status(404).send('Train non trouvé');
        } else {
            res.status(200).json(train);
        }
    })
}

module.exports = {
    getAllTrains,
    getTrainById, 
    createTrain,
    updateTrain,
    deleteTrain
}
