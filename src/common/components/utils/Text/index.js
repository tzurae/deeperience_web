import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'

const Text = ({ style, className, isSpan, id, ...props }) => (
  id === '' ?
    <span/> : (
    isSpan ?
      <FormattedMessage
        className={className}
        style={style}
        id={id}
        {...props}
      /> :
      <p className={className} style={style}>
        <FormattedMessage id={id} {...props} />
      </p>
  )
)

Text.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  isSpan: PropTypes.bool,
  id: PropTypes.string,
}

Text.defaultProps = {
  style: {},
  className: '',
  isSpan: false,
  id: '',
}

export default Text
