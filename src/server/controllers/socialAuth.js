import passport from 'passport'
import User from '../models/User'
import { handleDbError } from '../decorators/handleError'

export default {
  setupError: (req, res) => {
    res.send(
      'Please setup and turn on `passportStrategy.&lt;social provider&gt;` ' +
      'of config file `configs/project/server.js`'
    )
  },
  initFacebook: (req, res, next) => {
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email', 'user_friends', 'user_birthday', 'user_likes'],
      state: JSON.stringify({ next: req.query.next }),
    })(req, res, next)
  },
  createUser: (req, res, next) => {
    const {
      friends,
      likes,
      birthday,
      email,
      name,
      picture,
      id,
    } = req.body
    User.findOne({ 'email.value': email }, handleDbError(res)((user) => {
      if (!user) {
        user = new User({
          avatarURL: '', // overwrite default avatar
        })
      }
      if (!user.social.profile.facebook.main) {
        user.social.profile.facebook.main = { picture, email, name, id }
      }
      user.social.profile.facebook.friends = friends
      user.social.profile.facebook.likes = likes
      user.email.value = email || user.email.value
      user.email.isVerified = true
      user.name = name || user.name
      user.avatarURL = picture.data.url || user.avatarURL
      user.birthday.day = birthday.day || user.birthday.day
      user.birthday.month = birthday.month || user.birthday.month
      user.birthday.year = birthday.year || user.birthday.year
      req.user = user
      next()
    }))
  },
}
