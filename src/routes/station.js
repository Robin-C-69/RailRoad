const express = require('express');
const router = express.Router();

const {
    getAllStations,
    getStationById,
    createStation,
    updateStation,
    deleteStation
} = require("../controllers/stationController")

// Get all stations
router.get('/', getAllStations)

// Get one station by the id
router.get('/:id', getStationById)

// Create new station
router.post('/', createStation)

// Update station
router.put('/:id', updateStation)

// Delete Station
router.delete('/:id', deleteStation)

module.exports = router