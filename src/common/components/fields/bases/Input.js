import React, { PropTypes } from 'react'

const Input = ({ input, meta, type, ...rest }) => (
  <input
    {...input}
    type={type}
    {...rest}
  />
)

Input.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.oneOf([
    'text',
    'password',
    'number',
    'date',
    'time',
    'file',
  ]),
}

export default Input
