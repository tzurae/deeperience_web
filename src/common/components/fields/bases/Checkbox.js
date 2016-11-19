import React, { PropTypes } from 'react'

const Checkbox = ({ input, text, ...rest }) => (
  <label>
    <input
      {...input}
      type="checkbox"
      checked={input.value}
      {...rest}
    /> {text}
  </label>
)

Checkbox.propTypes = {
  input: PropTypes.object.isRequired,
  text: PropTypes.node,
}

export default Checkbox
