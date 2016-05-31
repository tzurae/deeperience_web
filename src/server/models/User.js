import crypto from 'crypto';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import configs from '../../../configs/project/server';

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

let User = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
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
});

User.methods.auth = function(password, cb) {
  const isAuthenticated = (this.password === hashPassword(password));
  cb(null, isAuthenticated);
};

User.methods.toJwtToken = function(cb) {
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

User.methods.toJSON = function() {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', User);
