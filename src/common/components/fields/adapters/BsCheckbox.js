import React, { PropTypes } from 'react'
import CheckBox from 'react-bootstrap/lib/Checkbox'

const BsCheckbox = ({ input, text, ...rest }) => (
  <CheckBox>
    {text}
  </CheckBox>
)

BsCheckbox.propTypes = {
  input: PropTypes.object.isRequired,
}

export default BsCheckbox
