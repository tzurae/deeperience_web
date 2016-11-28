// https://github.com/postcss/postcss-mixins

module.exports = {
  /* noSelect is a static mixin  */
  noSelect: {
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  clearfix: {
    '&:after': {
      content: '""',
      display: 'table',
      clear: 'both',
    },
    '&:before': {
      content: '""',
      display: 'table',
    },
    '*zoom': 1,
  },
}
