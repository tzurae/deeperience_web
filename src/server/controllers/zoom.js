import request from 'superagent'
import handleError from '../decorators/handleError'

const credential = require('../../../configs/project/zoom/credential')

const createMeeting = (req, res) => {
  request
        .post('https://api.zoom.us/v1/meeting/create')
        .query(credential)
        .query({
          topic: 'test',  // meeting title
          type: 2,        // normal scheduled meeting
        })
        .end(handleError(res)((resp) => {
          const body = resp.body
          if (body.error) {
            res.json({ error: body.error })
          }
          res.json({
            meetingId: body.id,
            joinUrl: body.join_url,
          })
        }))
}

const endMeeting = (req, res, next) => {
    // todo: end meeting here
  const meetingId = req.params.meetingId
  request
        .post('https://api.zoom.us/v1/meeting/end')
        .query(credential)
        .query({
          id: meetingId,
        })
        .end(handleError(res)((resp) => {
          const body = resp.body
          if (body.error) {
            res.json({ error: body.error })
          } else {
            next()
          }
        }))
}

const deleteMeeting = (req, res) => {
  const meetingId = req.params.meetingId
  request
        .post('https://api.zoom.us/v1/meeting/delete')
        .query(credential)
        .query({
          id: meetingId,
        })
        .end(handleError(res)((resp) => {
          const body = resp.body
          if (body.error) {
            res.json({ error: body.error })
          }
          res.json(resp.body)
        }))
}

export default {
  create: createMeeting,
  end: endMeeting,
  delete: deleteMeeting,
}
