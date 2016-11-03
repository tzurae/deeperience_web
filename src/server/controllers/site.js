import { handleDbError } from '../decorators/handleError'
import Site from '../models/Site'
import User from '../models/User'
import filterAttribute from '../utils/filterAttribute'
import getSaveObject from '../utils/getSaveObject'

const attributes = ['name', 'introduction', 'audioURL', 'mapSite']

export default {
  create(req, res) {
    let site = {}
    attributes.forEach(attr => {
      site[attr] = req.body[attr]
    })
    site = Site({
      ...site,
      updatedAt: new Date(),
      createdAt: new Date(),
    })

    User.update(
      { _id: req.params.userId },
      { $addToSet: { sites: site } },
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
      { _id: req.params.userId, 'sites._id': req.params.siteId },
      { $set: getSaveObject(save, 'sites.$.') },
      handleDbError(res)((raw) => {
        res.json({
          finish: raw.ok === 1,
          modify: raw.nModified === 1,
        })
      })
    )
  },

  list(req, res) {
  },
}
