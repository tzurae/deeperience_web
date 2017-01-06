import express from 'express'
import authRequired from '../../middlewares/authRequired'
import bodyParser from '../../middlewares/bodyParser'
import siteController from '../../controllers/guideSite'
const sites = express.Router()

sites.get('/', authRequired, siteController.list) // todo
sites.post('/', authRequired, bodyParser.json, siteController.create)
sites.put('/:siteId', authRequired, bodyParser.json, siteController.update) // todo
sites.delete('/:siteId', authRequired, siteController.remove) // todo

export default sites
