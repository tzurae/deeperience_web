import { handleDbError } from '../decorators/handleError'
import Trip from '../models/Trip'
import User from '../models/User'
import filterAttribute from '../utils/filterAttribute'
import getSaveObject from '../utils/getSaveObject'

const attributes = ['name', 'allSites', 'backgroundPic', 'dayInfo', 'price',
  'tags', 'startSite', 'routes']

export default {
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
      { _id: req.params.userId },
      { $addToSet: { own: trip } },
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
    console.log(save)
    User.update(
      { _id: req.params.userId, 'ownTrip._id': req.params.tripId },
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
  },

  listBuyTrip(req, res) {
  },
}
