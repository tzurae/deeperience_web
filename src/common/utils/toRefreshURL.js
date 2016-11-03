export default (URL) => {
  const forceUpdate = `${URL.indexOf('?') >= 0 ?
    '&' : '?'}forceUpdate=${Math.random()}`
  return URL + forceUpdate
}
