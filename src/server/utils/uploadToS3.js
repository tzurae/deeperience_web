import AWS from 'aws-sdk'
import fs from 'fs'

const credential = require('../../../configs/project/s3/credential')
const s3 = new AWS.S3(credential)

function uploadToS3({ path, remotePath }) {
  const stream = fs.createReadStream(path)

  const params = {
    Bucket: 'deeperience-dev',
    Key: remotePath,
    Body: stream,
    ACL: 'public-read',
  }

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        return reject(err)
      }
            // image url
      return resolve(data.Location)
    })
  })
}

export default uploadToS3
