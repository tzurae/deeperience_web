import fs from 'fs'
import path from 'path'
import assign from 'object-assign'
import configs from '../../../configs/project/server'
import Errors from '../../common/constants/Errors'
import handleError, { handleDbError } from '../decorators/handleError'
import User from '../models/User'
import filterAttribute from '../utils/filterAttribute'
import uploadToS3 from '../utils/uploadToS3'
import { setCookie } from '../../common/reducers/cookie/cookieActions'

export default {
  list(req, res) {
    User.paginate({ page: req.query.page }, handleDbError(res)((page) => {
      User
        .find({})
        .sort({ createdAt: 'desc' })
        .limit(page.limit)
        .skip(page.skip)
        .exec(handleDbError(res)((users) => {
          res.json({
            users,
            page,
          })
        }))
    }))
  },

  create(req, res, next) {
    User.findOne({
      'email.value': req.body.email,
    }, handleDbError(res)((user) => {
      if (user) {
        res.errors([Errors.USER_EXISTED])
      } else {
        const user = User({
          name: req.body.name,
          email: {
            value: req.body.email,
          },
          password: req.body.password,
          nonce: {
            verifyEmail: Math.random(),
          },
        })
        user.save(handleDbError(res)((user) => {
          req.user = user
          if (!configs.nodemailer) {
            return res.json({
              user,
            })
          }
          next()
        }))
      }
    }))
  },

  verifyEmail(req, res) {
    const { user } = req

    user.email.isVerified = true
    user.email.verifiedAt = new Date()
    user.save(handleDbError(res)(() => {
      res.json({})
    }))
  },

  login(req, res) {
    User
      .findOne({ 'email.value': req.body.email })
      .select('-social')
      .exec(handleDbError(res)((user) => {
        if (!user) {
          res.json({
            isAuth: false,
          })
        } else {
          user.auth(req.body.password, handleDbError(res)((isAuth) => {
            if (isAuth) {
              const token = user.toAuthenticationToken()
              user.lastLoggedInAt = new Date()
              user.save(handleDbError(res)(user => {
                res.json({
                  isAuth: true,
                  token,
                  user,
                })
              }))
            } else {
              res.json({
                isAuth: false,
              })
            }
          }))
        }
      }))
  },

  setNonce: (nonceKey) => (req, res, next) => {
    User.findOne({
      'email.value': req.body.email,
    }, handleDbError(res)((user) => {
      user.nonce[nonceKey] = Math.random()
      user.save(handleDbError(res)((user) => {
        req.user = user
        next()
      }))
    }))
  },

  socialLogin(req, res, next) {
    const { user } = req
    if (!user) {
      return next()
    }
    const token = user.toAuthenticationToken()
    user.lastLoggedInAt = new Date()
    user.save(handleDbError(res)(() => {
      req.store.dispatch(setCookie({
        token,
        user,
      })
      )
    }))
    res.cookie('token', token)
    res.cookie('user', JSON.stringify(user))
    res.redirect('/')
    return next()
  },

  socialLoginPhone(req, res) {
    const { user } = req
    if (!user) {
      res.json({
        modify: false,
      })
    }

    user.lastLoggedInAt = new Date()
    user.save(handleDbError(res)((user) => {
      res.json({
        user,
        modify: true,
      })
    }))
  },

  logout(req, res) {
    req.logout()
    res.json({
      isLogout: true,
    })
  },

  show(req, res) {
    res.json({
      user: req.user,
    })
  },

  update(req, res) {
    const { user } = req
    const modifiedUser = filterAttribute(req.body, [
      'name',
      'avatarURL',
      'cellPhone',
      'password',
      'sex',
      'email',
    ])

    assign(user, modifiedUser)
    // console.log(req.body)
    // console.log(modifiedUser)
    // console.log(user)
    user.save(handleDbError(res)((user) => {
      res.json({
        originAttributes: req.body,
        user,
      })
    }))
  },

  updateAvatarURL(req, res) {
    const { user } = req
    const modifiedUser = filterAttribute(req.body, ['avatarURL'])

    assign(user, modifiedUser)
    user.save(handleDbError(res)((user) => {
      res.json({
        originAttributes: req.body,
        user,
      })
    }))
  },

  updatePassword(req, res) {
    const { user } = req
    const modifiedUser = {
      password: req.body.newPassword,
    }

    user.auth(req.body.oldPassword, handleDbError(res)((isAuth) => {
      if (isAuth) {
        assign(user, modifiedUser)
        user.save(handleDbError(res)((user) => {
          res.json({
            originAttributes: req.body,
            isAuth: true,
            user,
          })
        }))
      } else {
        res.json({
          isAuth: false,
        })
      }
    }))
  },

  resetPassword(req, res) {
    const { user } = req
    const modifiedUser = {
      password: req.body.newPassword,
    }
    assign(user, modifiedUser)
    user.save(handleDbError(res)((user) => {
      res.json({
        originAttributes: req.body,
        user,
      })
    }))
  },

  getCustomizePhase(req, res) {

  },

  nextCustomizePhase(req, res) {

  },

  getRankList(req, res) {

  },

  createRankList(req, res) {

  },

  agreePlan(req, res) {

  },

  getVideoTime(req, res) {

  },

  createVideoTime(req, res) {

  },

  acceptVideoTime(req, res) {

  },

  sendEvaluation(req, res) {

  },

  uploadAvatar(req, res) {
    // use `req.file` to access the avatar file
    // and use `req.body` to access other fileds
    const tmpPath = req.files.avatar[0].path
    const remotePath = path.join('users', `${req.user._id}`, 'avatar.png')

    const UPLOAD_AVATAR = 'upload avatar'
    console.time(UPLOAD_AVATAR)

    uploadToS3({
      path: tmpPath,
      remotePath,
    }).then(downloadURL => {
      res.json({ downloadURL })
      console.timeEnd(UPLOAD_AVATAR)
      // remove temp file
      fs.unlink(tmpPath)
    }).catch(handleError(res)(() => {
      res.json({})
    }))
  },
}
