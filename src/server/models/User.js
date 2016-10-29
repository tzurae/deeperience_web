import crypto from 'crypto';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import configs from '../../../configs/project/server';
import Roles from '../../common/constants/Roles';
import paginatePlugin from './plugins/paginate';

const hashPassword = (rawPassword = '') => {
  let recursiveLevel = 5;
  while (recursiveLevel) {
    rawPassword = crypto
      .createHash('md5')
      .update(rawPassword)
      .digest('hex');
    recursiveLevel -= 1;
  }
  return rawPassword;
};

let UserSchema = new mongoose.Schema({
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
    enum: Object.keys(Roles).map(r => Roles[r]),
    default: Roles.USER,
  },
  avatarURL: {
    type: String,
    default: '/img/default-avatar.png',
  },
  social: {
    profile: {
      facebook: Object,
      linkedin: Object,
    },
  },
  nonce: {
    password: Number,
  },
  lastLoggedInAt: Date,
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

UserSchema.plugin(paginatePlugin);

UserSchema.methods.auth = function(password, cb) {
  const isAuthenticated = (this.password === hashPassword(password));
  cb(null, isAuthenticated);
};

UserSchema.methods.toVerifyEmailToken = function(cb) {
  const user = {
    _id: this._id,
  };
  const token = jwt.sign(user, configs.jwt.verifyEmail.secret, {
    expiresIn: configs.jwt.verifyEmail.expiresIn,
  });
  return token;
};

UserSchema.methods.toResetPasswordToken = function(cb) {
  const user = {
    _id: this._id,
    nonce: this.nonce.password,
  };
  const token = jwt.sign(user, configs.jwt.resetPassword.secret, {
    expiresIn: configs.jwt.resetPassword.expiresIn,
  });
  return token;
};

UserSchema.methods.toAuthenticationToken = function(cb) {
  const user = {
    _id: this._id,
    name: this.name,
    email: this.email,
  };
  const token = jwt.sign(user, configs.jwt.authentication.secret, {
    expiresIn: configs.jwt.authentication.expiresIn,
  });
  return token;
};

UserSchema.methods.toJSON = function() {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

let User = mongoose.model('User', UserSchema);
export default User;
