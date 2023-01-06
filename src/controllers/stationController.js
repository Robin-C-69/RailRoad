const Station = require('../models/Station');
const multer = require('multer');
var fs = require('fs');
var path = require('path');


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
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Station.findById(req.params.id, (err, station) => {
            if (err) {
                res.status(500).send(err)
            } else if (!station) {
                res.status(404).send('Gare non trouvée')
            } else {
                res.status(200).json(station)            
            }
        })
    } else {
        res.status(400).send('Le champ _id n\'est pas correct')
    }
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

// Define image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname + '-' + Date.now())
    }
})
var upload = multer({storage: storage})

// Create new station //TODO
const createStation = (upload.single('image'), (req, res) => {
    var newStation = {
        name: req.body.name,
        open_hour: req.body.open_hour,
        close_hour: req.body.close_hour,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }

    Station.create(newStation, (err, station) => {
        if (err) {
			res.status(500).send(err);
		}
		else {
			// item.save();
			res.status(200).json(station);
		}
    })
})

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