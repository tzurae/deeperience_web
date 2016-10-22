import crypto from 'crypto';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import configs from '../../../configs/project/server';
import Roles from '../../common/constants/Roles';

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
  },
  password: {
    type: String,
    required: true,
    set: hashPassword,
  },
  role: {
    type: String,
    enum: Object.keys(Roles).map(r => Roles[r]),
    default: Roles.USER,
  },
  avatarURL: String,
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

UserSchema.path('email.value').validate(function(value, cb) {
  User.findOne({ 'email.value': value }, (err, user) => {
    cb(!err && !user);
  });
}, 'This email address is already registered');

UserSchema.methods.auth = function(password, cb) {
  const isAuthenticated = (this.password === hashPassword(password));
  cb(null, isAuthenticated);
};

UserSchema.methods.toJwtToken = function(cb) {
  const user = {
    _id: this._id,
    name: this.name,
    email: this.email,
  };
  const token = jwt.sign(user, configs.jwt.secret, {
    expiresIn: configs.jwt.expiresIn,
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
