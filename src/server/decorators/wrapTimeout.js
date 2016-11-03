const wrapTimeout = (milliseconds) => (fn) => (req, res, next) => {
  const t = setTimeout(() => {
    console.log('-- time out --')
    console.log('url:', req.url)
    console.log('--------------')
    next()
  }, milliseconds)
  const done = (...args) => {
    clearTimeout(t)
    next(...args)
  }
  fn(req, res, done)
}

export default wrapTimeout
