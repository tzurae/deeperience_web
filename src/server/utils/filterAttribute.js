export default (obj, allowedAttributes) => {
  const resultObj = {}
  Object
    .keys(obj)
    .filter((attribute) => allowedAttributes.indexOf(attribute) >= 0)
    .forEach((attribute) => {
      resultObj[attribute] = obj[attribute]
    })
  return resultObj
}
