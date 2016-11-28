module.exports = [
  /* autoprefix for different browser vendors */
  require('autoprefixer'),
  /* reset inherited rules */
  require('postcss-initial')({
    reset: 'inherited' // reset only inherited rules
  }),
  /* enable mixins like Sass/Less */
  require('postcss-mixins')({
    mixins: require('../../src/common/styles/mixins'),
  }),
  /* require global variables */
  require('postcss-simple-vars')({
    // variables: function variables() {
    //   return require('../src/variables')
    // },
    // unknown: function unknown(node, name, result) {
    //   node.warn(result, 'Unknown variable ' + name)
    // }
  }),
  /* transform W3C CSS color function to more compatible CSS. */
  require('postcss-color-function'),
]
