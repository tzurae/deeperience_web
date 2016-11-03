/**
 * ### prefix site.$.
 * { name: 'zxczxc', introduction: 'asdasd' }
 * to
 * { site.$.name: name, site.$.introduction: introduction }
 */

export default (obj, prefix) => {
  const resultObj = {}
  Object
    .keys(obj)
    .forEach((key) => {
      resultObj[prefix + key] = obj[key]
    })
  return resultObj
}
