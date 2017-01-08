// prevent SQL injection that inject different attribute

export default (obj, allowedAttributes, disAllow = false) => {
  const resultObj = {}
  Object
    .keys(obj)
    .filter(attribute =>
      disAllow ?
      allowedAttributes.indexOf(attribute) < 0 :
      allowedAttributes.indexOf(attribute) >= 0
    )
    .forEach(attribute => {
      resultObj[attribute] = obj[attribute]
    })
  return resultObj
}
