import { handleDbError } from '../decorators/handleError'
import GuideSite, { GuideSiteSchema } from '../models/GuideSite'
import getAttrFromSchema from '../utils/getAttrFromSchema'

const attributes = getAttrFromSchema(GuideSiteSchema)

export default {
  create(req, res) {
    let guideSite = {}
    attributes.forEach(attr => {
      guideSite[attr] = req.body[attr]
    })
    guideSite = GuideSite({
      ...guideSite,
      updatedAt: new Date(),
      createdAt: new Date(),
    })

    guideSite.save(
      handleDbError(res)((guideSite) => {
        res.json({
          guideSite,
        })
      })
    )
  },

  update(req, res) {
  },

  list(req, res) {
    GuideSite.find(
      { guide: req.user._id },
      handleDbError(res)((raw) => {
        res.json(raw)
      })
    )
  },

  remove(req, res) {

  },
}
