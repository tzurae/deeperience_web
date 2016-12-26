import express from 'express'
import bodyParser from '../../middlewares/bodyParser'
import tripController from '../../controllers/trip'
import authRequired from '../../middlewares/authRequired'
const trips = express.Router()

// trip for customer
trips.get('/buy', authRequired, tripController.listBuyTrip)

// trip for guide
trips.get('/own', authRequired, tripController.listOwnTrip) // todo
trips.post('', authRequired, bodyParser.json, tripController.create)
trips.put('/:tripId', authRequired, bodyParser.json, tripController.update) // todo
trips.delete('/:tripId', authRequired, bodyParser.json, tripController.remove) // todo

export default trips
