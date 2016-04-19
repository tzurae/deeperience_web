import crypto from 'crypto';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import credentials from '../../../config/credentials';

const encodePassword = (rawPassword) => {
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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: String,
  email: String,
  password: {
    type: String,
    required: true,
    set: encodePassword,
  },
});

User.methods.auth = function(password, cb) {
  const isAuthenticated = (this.password === encodePassword(password));
  cb(null, isAuthenticated);
};

User.methods.toJwtToken = function(cb) {
  const user = {
    _id: this._id,
    name: this.name,
    email: this.email,
  };
  const token = jwt.sign(user, credentials.jwt.secret, {
    expiresIn: credentials.jwt.expiresIn,
  });
  return token;
};

export default mongoose.model('User', User);