import express from 'express'
import zoomController from '../../controllers/zoom'
import authRequired from '../../middlewares/authRequired'
import bodyParser from '../../middlewares/bodyParser'
const zoom = express.Router()

zoom.get('/', authRequired, zoomController.create)
zoom.delete('/:meetingId', authRequired, bodyParser.json, zoomController.end, zoomController.delete)

export default zoom
