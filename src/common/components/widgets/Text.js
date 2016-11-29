import React from 'react'
import { FormattedMessage } from 'react-intl'

const Text = ({ style, className, ...props }) => (
  style ?
    <p className={className} style={{ margin: '0px', ...style }}>
      <FormattedMessage {...props} />
    </p> :
    <FormattedMessage className={className} {...props} />
)

export default Text
