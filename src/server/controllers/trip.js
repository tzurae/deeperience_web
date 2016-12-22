import { handleDbError } from '../decorators/handleError'
import Trip, { TripSchema } from '../models/Trip'
import Site from '../models/Site'
import User from '../models/User'
import filterAttribute from '../utils/filterAttribute'
import getSaveObject from '../utils/getSaveObject'
import getAttrFromSchema from '../utils/getAttrFromSchema'

const attributes = getAttrFromSchema(TripSchema)

;export default {
  create(req, res) {
    let trip = {
      ...filterAttribute(req.body, attributes),
      guide: req.user._id,
    }

    trip = Trip({
      ...trip,
      updatedAt: new Date(),
      createdAt: new Date(),
    })

    trip.save(
      handleDbError(res)(trip => {
        res.json({
          trip,
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
        const allGuide = raw.buyTrip.map(({ guideId }) => guideId)
        User.find(
          { _id: { $in: allGuide } },
          { name: 1, avatarURL: 1, selfInfo: 1 }, // private data should be blocked out
          handleDbError(res)(guides => {
            const siteContent = raw.buyTrip.map(({ allSites }) => {
              return Site.find(
                { _id: { $in: allSites } },
                { updatedAt: 0, createdAt: 0 },
                handleDbError(res)(raw => {})
              )
            })

            Promise.all(siteContent).then(sites => {
              raw.buyTrip.forEach(({ _doc }, index) => {
                allTrip.push({
                  ..._doc,
                  guideInfo: guides[index],
                  sites: sites[index],
                })
              })
              res.json({ buyTrip: allTrip })
            })
          })
        )
      })
    )
  },

  remove(req, res) {

  },
}
