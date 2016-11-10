import { handleDbError } from '../decorators/handleError'
import Site, { SiteSchema } from '../models/Site'
import getAttrFromSchema from '../utils/getAttrFromSchema'

const attributes = getAttrFromSchema(SiteSchema)

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

    site.save(
      handleDbError(res)((site) => {
        res.json({
          site,
        })
      })
    )
  },

  update(req, res) {
  },

  list(req, res) {
    Site.find(
      { guideId: req.user._id },
      handleDbError(res)((raw) => {
        res.json(raw)
      })
    )
  },

  remove(req, res) {

  },
}
