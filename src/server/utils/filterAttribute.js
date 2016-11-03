export default (obj, allowedAttributes) => {
  let resultObj = {};
  Object
    .keys(obj)
    .filter((attribute) => allowedAttributes.indexOf(attribute) >= 0)
    .forEach((attribute) => {
      resultObj[attribute] = obj[attribute];
    });
  return resultObj;
};
