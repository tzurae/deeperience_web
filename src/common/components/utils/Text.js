import React from 'react'
import { FormattedMessage } from 'react-intl'

const Text = ({ style, className, isSpan = false, ...props }) => (
  isSpan ?
    <span className={className} style={style}>
      <FormattedMessage {...props} />
    </span> :
    <p className={className} style={style}>
      <FormattedMessage {...props} />
    </p>
)

export default Text
