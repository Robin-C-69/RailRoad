const express = require('express');
const router = express.Router();

const {
    getAllTrains,
    getTrainById,
    createTrain,
    updateTrain,
    deleteTrain
} = require('../controllers/trainController')

// Get all trains
router.get('/', getAllTrains)

// Get one train by the id
router.get('/:id', getTrainById)

// Create new train
router.post('/', createTrain)

// Update Train
router.put('/:id', updateTrain)

// Delete train
router.delete('/:id', deleteTrain)

module.exports = router
