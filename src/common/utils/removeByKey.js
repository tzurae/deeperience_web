export default (obj, deleteKey) => {
  return Object.keys(obj)
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = obj[current];
      return result;
    }, {});
};
