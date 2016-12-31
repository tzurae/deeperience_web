import { handleDbError } from '../decorators/handleError'
import GuideSite, { GuideSiteSchema } from '../models/GuideSite'
import GoogleSite, { GoogleSiteSchema } from '../models/GoogleSite'
import getAttrFromSchema from '../utils/getAttrFromSchema'
import filterAttribute from '../utils/filterAttribute'

// prevent SQL injection that inject different attribute
const guideAttr = getAttrFromSchema(GuideSiteSchema)
const googleAttr = getAttrFromSchema(GoogleSiteSchema)

export default {
  create(req, res) {
    // guide must be after filterAttribute as to cover the origin attribute
    let guideSite = {
      ...filterAttribute(req.body, guideAttr),
      guide: req.user._id,
    }

    // googleSite update or save

    // get all placeid from googleSite
    const googlesite =
      [guideSite.mainSite]
        .concat(guideSite.subSites)
        .map(({ googleInfo }) => filterAttribute(googleInfo, googleAttr))
    const googleIdArr = googlesite.map(({ placeId }) => placeId)

    // update all googleSite
    Promise.all(googleIdArr.map(
      (id, index) => new Promise(
        (resolve, reject) =>
          GoogleSite.findOneAndUpdate(
            { placeId: id },
            { $set: googlesite[index] },
            { upsert: true, new: true },
            handleDbError(res)(({ _id }) => resolve(_id))
          )
      ))
    ).then(_idArr => {
      guideSite.mainSite.googleInfo = _idArr[0]
      guideSite.subSites = guideSite.subSites.map((value, index) => ({
        ...value,
        googleInfo: _idArr[index + 1],
      }))

      guideSite = GuideSite({
        ...guideSite,
        updatedAt: new Date(),
        createdAt: new Date(),
      })
      guideSite.save(handleDbError(res)(guideSite => {
        res.json({
          guideSite,
        })
      }))
    })
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
