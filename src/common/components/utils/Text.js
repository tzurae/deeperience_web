import React from 'react'
import { FormattedMessage } from 'react-intl'

const Text = ({ style, className, isSpan = false, id, ...props }) => (
  id === '' ?
    <span/> : (
    isSpan ?
      <span className={className} style={style}>
        <FormattedMessage id={id} {...props} />
      </span> :
      <p className={className} style={style}>
        <FormattedMessage id={id} {...props} />
      </p>
  )
)

export default Text
