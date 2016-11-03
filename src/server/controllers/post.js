import { handleDbError } from '../decorators/handleError'
import User from '../models/User'
import Post from '../models/Post'
import filterAttribute from '../utils/filterAttribute'
import getSaveObject from '../utils/getSaveObject'

const attributes = [
  'people', 'residentFee', 'tripFee', 'allFee',
  'foodFee', 'hotelType', 'tripLocation', 'tripElement',
  'foodElement', 'otherDemand', 'bookHotel', 'bookRestaurant',
  'startDate', 'endDate',
]

export default {
  create(req, res) {
    let post = {}
    attributes.forEach(attr => {
      post[attr] = req.body[attr]
    })
    post = Post({
      ...post,
      updatedAt: new Date(),
      createdAt: new Date(),
    })

    User.update(
      { _id: req.params.userId },
      { $addToSet: { posts: post } },
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
      { _id: req.params.userId, 'posts._id': req.params.postId },
      { $set: getSaveObject(save, 'posts.$.') },
      handleDbError(res)((raw) => {
        res.json({
          finish: raw.ok === 1,
          modify: raw.nModified === 1,
        })
      })
    )
  },

  list(req, res) {
    User.findOne(
      { _id: req.params.userId },
      { posts: 1 },
      handleDbError(res)((raw) => {
        res.json(raw)
      })
    )
  },

  remove(req, res) {

  },
}
