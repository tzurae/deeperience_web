import express from 'express'
import localeController from '../../controllers/locale'
const locales = express.Router()

locales.get('/:locale', localeController.show)

export default locales
