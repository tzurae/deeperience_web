import configs from '../../../configs/project/server'
import bodyParser from '../middlewares/bodyParser'
import authRequired from '../middlewares/authRequired'
import fileUpload from '../middlewares/fileUpload'
import userController from '../controllers/user'
import formValidationController from '../controllers/formValidation'
import localeController from '../controllers/locale'
import todoController from '../controllers/todo'
import tripController from '../controllers/trip'
import siteController from '../controllers/site'

export default ({ app }) => {
  // user
  app.post('/api/users', bodyParser.json, userController.create)
  app.post('/api/users/login', bodyParser.json, userController.login)
  app.get('/api/users/logout', userController.logout)
  app.get('/api/users/me', authRequired, userController.show)
  app.put('/api/users/me',
    authRequired,
    bodyParser.json,
    userController.update
  )
  if (configs.firebase) {
    const firebaseController = require('../controllers/firebase').default
    app.get('/api/users/me/firebase/token',
      authRequired, firebaseController.readToken)
  }
  app.post('/api/users/me/avatar',
    authRequired,
    fileUpload.disk({
      destination: 'users/{userId}',
      filename: 'avatar.jpg',
    }).single('avatar'),
    userController.uploadAvatar)

  // form
  app.post('/api/forms/register/fields/email/validation',
    bodyParser.json,
    formValidationController.register.email
  )

  // locale
  app.get('/api/locales/:locale', localeController.show)

  // todo
  app.get('/api/todos', todoController.list)
  app.post('/api/todos', bodyParser.json, todoController.create)
  app.put('/api/todos/:id', bodyParser.json, todoController.update)
  app.delete('/api/todos/:id', todoController.remove)

  // trip for customer
  app.get('/api/trips/buy/:userId', authRequired, tripController.listBuyTrip)

  // trip for guide
  app.get('/api/trips/own/:userId', authRequired, tripController.listOwnTrip)
  app.post('/api/trips/:userId', authRequired, bodyParser.json, tripController.create)
  app.put('/api/trips/:userId/:tripId', authRequired, bodyParser.json, tripController.update)

  // site
  app.get('/api/sites/:userId', authRequired, siteController.list)
  app.post('/api/sites/:userId', authRequired, bodyParser.json, siteController.create)
  app.put('/api/sites/:userId/:siteId', authRequired, bodyParser.json, siteController.update)
}
