import crypto from 'crypto'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import URL from './plugins/URLType'
import configs from '../../../configs/project/server'
import Roles from '../../common/constants/Roles'
import { Languages, Levels as LanguageLevels } from '../../common/i18n/zh-tw/Languages'
import AbleArea from '../../common/i18n/zh-tw/AbleArea'
import { GuideTripElements, Levels as GuideTripElementLevels } from '../../common/i18n/zh-tw/GuideTripElements'
import paginatePlugin from './plugins/paginate'

const hashPassword = (rawPassword = '') => {
  let hashPassword = rawPassword
  let recursiveLevel = 5
  while (recursiveLevel) {
    hashPassword = crypto
      .createHash('md5')
      .update(hashPassword)
      .digest('hex')
    recursiveLevel -= 1
  }
  return hashPassword
}

const UserSchema = new mongoose.Schema({
  name: String,
  sex: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
  },
  email: {
    value: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedAt: Date,
  },
  password: {
    type: String,
    // there is no password for a social account
    required: false,
    set: hashPassword,
  },
  role: {
    type: String,
    enum: Object.keys(Roles),
    default: Roles.USER,
  },
  avatarURL: {
    type: String, // URL, not changed yet since default is not a url type
    default: '/img/default-avatar.png',
  },
  social: {
    profile: {
      facebook: {
        main: Object,
        likes: Array,
        friends: Array,
      },
    },
  },
  nonce: {
    verifyEmail: Number,
    resetPassword: Number,
  },
  lastLoggedInAt: Date,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  verifiedGuide: Boolean,
  selfInfo: {
    website: {
      type: URL,
      required: false,
    },
    vocation: {
      type: String,
      required: false,
    },
    selfIntro: {
      type: String,
      required: false,
    },
    hobby: {
      type: String,
      required: false,
    },
    location: {
      country: String, // TODO make tags
      province: String, // TODO
      city: String, // TODO
    },
    language: {
      type: [{
        languageName: {
          type: String,
          enum: Object.keys(Languages),
          required: true,
        },
        level: {
          type: String,
          enum: Object.keys(LanguageLevels),
          required: true,
        },
      }],
      default: [{
        languageName: 'CHINESE',
        level: 'MEDIUM',
      }],
    },
    ableArea: [{
      type: String,
      enum: Object.keys(AbleArea),
    }],
    element: [{
      type: {
        type: String,
        enum: Object.keys(GuideTripElements),
        required: true,
      },
      level: {
        type: String,
        enum: Object.keys(GuideTripElementLevels),
        required: true,
      },
    }],
    picIntro: [{
      picture: {
        type: URL,
        required: true,
      },
      words: {
        type: String,
        required: true,
      },
    }],
  },
  birthday: {
    year: {
      type: Number,
      checkRequired: value => Number.isInteger(value) && value >= 1901 && value <= new Date().getFullYear(),
      default: 1901,
      required: true,
    },
    month: { // 0 ~ 11 // same as js new Date()
      type: Number,
      checkRequired: value => Number.isInteger(value) && value >= 0 && value <= 11,
      default: 0,
      required: true,
    },
    day: { // 1 ~ 31
      type: Number,
      checkRequired: value => Number.isInteger(value) && value >= 1 && value <= 31,
      default: 1,
      required: true,
    },
  },
  cellPhone: {
    type: String,
    required: false,
  },
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})

UserSchema.plugin(paginatePlugin)

UserSchema.methods.auth = function(password, cb) {
  const isAuthenticated = (this.password === hashPassword(password))
  cb(null, isAuthenticated)
}

UserSchema.methods.toVerifyEmailToken = function(cb) {
  const user = {
    _id: this._id,
    nonce: this.nonce.verifyEmail,
  }
  const token = jwt.sign(user, configs.jwt.verifyEmail.secret, {
    expiresIn: configs.jwt.verifyEmail.expiresIn,
  })
  return token
}

UserSchema.methods.toResetPasswordToken = function(cb) {
  const user = {
    _id: this._id,
    nonce: this.nonce.resetPassword,
  }
  const token = jwt.sign(user, configs.jwt.resetPassword.secret, {
    expiresIn: configs.jwt.resetPassword.expiresIn,
  })
  return token
}

UserSchema.methods.toAuthenticationToken = function(cb) {
  const user = {
    _id: this._id,
    name: this.name,
    email: this.email,
  }
  const token = jwt.sign(user, configs.jwt.authentication.secret, {
    expiresIn: configs.jwt.authentication.expiresIn,
  })
  return token
}

UserSchema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.password
  delete obj.nonce
  delete obj.createdAt
  delete obj.social
  return obj
}

const User = mongoose.model('User', UserSchema)
export default User
