import path from 'path'
import uuid from 'uuid'
import fs from 'fs'
import handleError from '../decorators/handleError'
import uploadToS3 from '../utils/uploadToS3'

export default {
  uploadImage(req, res) {
    // use `req.file` to access the file
    // and use `req.body` to access other fields
    const filename = `${uuid()}.png`
    const tmpPath = req.files.img[0].path
    const remotePath = path.join('users', `${req.user._id}`, 'img', filename)

    const UPLOAD_IMAGE = 'upload image'
    console.time(UPLOAD_IMAGE)

    uploadToS3({
      path: tmpPath,
      remotePath,
    }).then(downloadURL => {
      res.json({ downloadURL })
      console.timeEnd(UPLOAD_IMAGE)
      // remove temp file
      fs.unlink(tmpPath)
    }).catch(handleError(res)(() => {
      res.json({})
    }))
  },
}
