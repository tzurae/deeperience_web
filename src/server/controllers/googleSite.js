import { handleDbError } from '../decorators/handleError'
import GoogleSite, { GoogleSiteSchema } from '../models/GoogleSite'
import getAttrFromSchema from '../utils/getAttrFromSchema'

const attributes = getAttrFromSchema(GoogleSiteSchema)

export default {
  create(req, res) {
    let googleSite = {}
    attributes.forEach(attr => {
      googleSite[attr] = req.body[attr]
    })
    googleSite = GoogleSite({
      ...googleSite,
      updatedAt: new Date(),
      createdAt: new Date(),
    })

    googleSite.save(
      handleDbError(res)(googleSite => {
        res.json({
          googleSite,
        })
      })
    )
  },
}
