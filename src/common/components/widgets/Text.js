import React from 'react'
import { FormattedMessage } from 'react-intl'

const Text = ({ style, ...props }) => (
  style ?
    <p style={{ margin: 0, ...style }}><FormattedMessage {...props} /></p> :
    <FormattedMessage {...props} />
)

export default Text
