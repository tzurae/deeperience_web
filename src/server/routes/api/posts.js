import express from 'express'
import bodyParser from '../../middlewares/bodyParser'
import postController from '../../controllers/post'
import authRequired from '../../middlewares/authRequired'
const posts = express.Router()

posts.get('/', authRequired, postController.list) // todo
posts.post('/', authRequired, bodyParser.json, postController.create) // todo
posts.put('/:postId', authRequired, bodyParser.json, postController.update) // todo
posts.delete('/:postId', authRequired, postController.remove) // todo

export default posts
