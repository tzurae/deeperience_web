module.exports = [
  /* autoprefix for different browser vendors */
  require('autoprefixer'),
  /* reset inherited rules */
  require('postcss-initial')({
    reset: 'inherited' // reset only inherited rules
  }),
  /* transform W3C CSS color function to more compatible CSS. */
  require('postcss-color-function'),
]
