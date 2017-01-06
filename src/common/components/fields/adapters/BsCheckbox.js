import React, { PropTypes } from 'react'
import CheckBox from '../bases/Checkbox'

const BsCheckbox = ({ input, text, className, ...rest }) => (
  <CheckBox
    className={className}
    input={input}
    {...rest}
    text={text}
  />
)

BsCheckbox.propTypes = {
  input: PropTypes.object.isRequired,
}

export default BsCheckbox
