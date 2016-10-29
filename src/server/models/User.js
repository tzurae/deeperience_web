import crypto from 'crypto'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import configs from '../../../configs/project/server'

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
  email: {
    value: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  password: {
    type: String,
    required: true,
    set: hashPassword,
  },
  avatarURL: String,
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})

UserSchema.path('email.value').validate((value, cb) => {
  User.findOne({ 'email.value': value }, (err, user) => {
    cb(!err && !user)
  })
}, 'This email address is already registered')

UserSchema.methods.auth = function(password, cb) {
  const isAuthenticated = (this.password === hashPassword(password))
  cb(null, isAuthenticated)
}

UserSchema.methods.toJwtToken = function(cb) {
  const user = {
    _id: this._id,
    name: this.name,
    email: this.email,
  }
  const token = jwt.sign(user, configs.jwt.secret, {
    expiresIn: configs.jwt.expiresIn,
  })
  return token
}

UserSchema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.password
  return obj
}

const User = mongoose.model('User', UserSchema)
export default User
