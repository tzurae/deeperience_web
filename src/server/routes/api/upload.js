import express from 'express'
import authRequired from '../../middlewares/authRequired'
import fileUpload from '../../middlewares/fileUpload'
import uploadController from '../../controllers/upload'
const upload = express.Router()

upload.post('/image',
    function(req, res, next){
        console.log('123')
        next()
    },
    authRequired,
    fileUpload.disk({
        destination: 'tmp/{userId}',
    }).fields([{ name: 'img' }]),
    uploadController.uploadImage
)

export default upload