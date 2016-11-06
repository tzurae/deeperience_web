import { handleDbError } from '../decorators/handleError'
import Trip, { TripSchema } from '../models/Trip'
import User from '../models/User'
import filterAttribute from '../utils/filterAttribute'
import getSaveObject from '../utils/getSaveObject'
import getAttrFromSchema from '../utils/getAttrFromSchema'

const attributes = getAttrFromSchema(TripSchema)

;export default {
  create(req, res) {
    let trip = {}
    attributes.forEach(attr => {
      trip[attr] = req.body[attr]
    })
    trip = Trip({
      ...trip,
      updatedAt: new Date(),
      createdAt: new Date(),
    })

    User.update(
      { _id: req.user._id },
      { $addToSet: { ownTrip: trip } },
      handleDbError(res)((raw) => {
        res.json({
          finish: raw.ok === 1,
          modify: raw.nModified === 1,
        })
      })
    )
  },

  update(req, res) {
    const save = {
      ...filterAttribute(req.body, attributes),
      updatedAt: new Date(),
    }
    User.update(
      { _id: req.user._id, 'ownTrip._id': req.params.tripId },
      { $set: getSaveObject(save, 'ownTrip.$.') },
      handleDbError(res)((raw) => {
        res.json({
          finish: raw.ok === 1,
          modify: raw.nModified === 1,
        })
      })
    )
  },

  listOwnTrip(req, res) {
    User.findOne(
      { _id: req.user._id },
      { ownTrip: 1 },
      handleDbError(res)((raw) => {
        res.json(raw)
      })
    )
  },

  listBuyTrip(req, res) {
    User.findOne(
      { _id: req.user._id },
      { buyTrip: 1 },
      handleDbError(res)((raw) => {
        const allTrip = []
        const tripWithGuide = raw.buyTrip.map(({ guideId }) => {
          return User.findOne(
            { _id: guideId },
            { buyTrip: 0, email: 0, ownTrip: 0, posts: 0 }, // private data should be blocked out
            handleDbError(res)((raw) => {})
          )
        })

        Promise.all(tripWithGuide).then(guides => {
          raw.buyTrip.forEach(({ _doc }, index) => {
            allTrip.push({
              ..._doc,
              guideInfo: guides[index],
            })
          })
          res.json({ buyTrip: allTrip })
        })
      })
    )
  },

  remove(req, res) {

  },
}
