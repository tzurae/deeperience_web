import React, { PropTypes } from 'react'

const Textarea = ({ input, meta, ...rest }) => (
  <textarea
    {...input}
    {...rest}
  />
)

Textarea.propTypes = {
  input: PropTypes.object.isRequired,
}

export default Textarea
