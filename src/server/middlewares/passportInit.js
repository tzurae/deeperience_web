import 'babel-polyfill'
import passport from 'passport'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import configs from '../../../configs/project/server'
import { redirect } from '../../common/reducers/router/routerActions'
import Errors from '../../common/constants/Errors'
import { handleDbError } from '../decorators/handleError'
import User from '../models/User'

const cookieExtractor = (req) => {
  return req.store.getState().getIn(['cookies', 'token'])
}

export default (req, res, next) => {
  function findOrCreateUser(schemaProfileKey, email, cb) {
    if (!email) {
      res.pushError(Errors.AUTHORIZATION_FAIL, {
        requiredFields: ['email'],
      })
      req.store.dispatch(redirect('/user/login'))
      return next()
    }
    User
      .findOne({ 'email.value': email })
      .select('-social')
      .exec((err, user) => {
        if (err) {
          return cb(err)
        }
        if (!user) {
          user = new User({
            avatarURL: '', // overwrite default avatar
          })
        }
        if (!user.social.profile[schemaProfileKey].main) {
          user.social.profile[schemaProfileKey].main = {}
        }
        return cb(null, user)
      })
  }

  passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: configs.jwt.authentication.secret,
  }, (jwtPayload, done) => {
    // this callback is invoked only when jwt token is correctly decoded
    User.findById(jwtPayload._id, handleDbError(res)(user => {
      done(null, user)
    }))
  }))

  if (configs.passportStrategy.facebook) {
    passport.use(new FacebookStrategy({
      ...configs.passportStrategy.facebook.default,
      ...configs.passportStrategy.facebook[process.env.NODE_ENV],
      scope: ['public_profile', 'email', 'user_friends', 'user_birthday', 'user_likes'],
    }, (accessToken, refreshToken, profile, done) => {
      findOrCreateUser(
        'facebook',
        profile._json.email,
        handleDbError(res)((user) => {
          // map `facebook-specific` profile fields to our custom profile fields
          const { name, id, email, picture } = profile._json
          user.social.profile.facebook.main = { name, id, email, picture }
          user.email.value =  profile._json.email || user.email.value
          user.email.isVerified = true
          user.name = profile._json.name || user.name
          user.avatarURL = profile._json.picture.data.url || user.avatarURL
          // get all friend and likes

          const graph = require('fbgraph')
          graph.setAccessToken(accessToken)

          const fetchWrapper =
            (data, domain, cb) => (!domain ?
                cb(data) :
                graph.get(domain, (err, res) => {
                  if (!err) {
                    const domain = res.paging && res.paging.next ? res.paging.next : null
                    const arr = data.concat(res.data ? res.data : [])
                    fetchWrapper(arr, domain, cb)
                  } else {
                    console.log(err)
                  }
                })
            )

          const getAllFbData = async () => {
            const likeDomain = `https://graph.facebook.com/v2.8/me/likes?limit=100&access_token=${accessToken}`
            const friendDomain = `https://graph.facebook.com/v2.8/me/friends?limit=100&access_token=${accessToken}`
            const birthdayDomain = `https://graph.facebook.com/v2.8/me?fields=birthday&access_token=${accessToken}`
            const likesPromise = new Promise((resolve, reject) => {
              fetchWrapper([], likeDomain, resolve)
            })
            const friendsPromise = new Promise((resolve, reject) => {
              fetchWrapper([], friendDomain, resolve)
            })
            const birthdayPromise = new Promise((resolve, reject) => {
              graph.get(birthdayDomain, (err, res) => {
                if (!err) resolve(res)
              })
            })
            const data = await Promise.all([likesPromise, friendsPromise, birthdayPromise])
            // need to be commented or cookie won't be set because of the length of the data
            // user.social.profile.facebook.likes = data[0]
            // user.social.profile.facebook.friends = data[1]
            user.birthday.day = Number(data[2].birthday.substr(3, 2))
            user.birthday.month = Number(data[2].birthday.substr(0, 2))
            user.birthday.year = Number(data[2].birthday.substr(6, 4))
            done(null, user)
          }

          getAllFbData()
        }))
    }))
  }

  passport.initialize()(req, res, next)
}
