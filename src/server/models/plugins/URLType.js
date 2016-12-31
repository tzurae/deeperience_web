/* eslint-disable */
import mongoose from 'mongoose'
import normalizeUrl from 'normalizeurl'

export const validateURL = val =>
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(val)

function URL(path, options) {
  mongoose.SchemaTypes.String.call(this, path, options)

  this.validate(validateURL, 'url is invalid')
}

URL.prototype.__proto__ = mongoose.SchemaTypes.String.prototype

URL.prototype.cast = function(val) {
  return normalizeUrl(val)
}

mongoose.SchemaTypes.URL = URL
mongoose.Types.URL = String

export default URL
