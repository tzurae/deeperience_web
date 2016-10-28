export default (URL) => {
  let forceUpdate = (URL.indexOf('?') >= 0 ?
    '&' : '?') + `forceUpdate=${Math.random()}`;
  return URL + forceUpdate;
};
