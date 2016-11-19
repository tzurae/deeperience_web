import React, { PropTypes } from 'react'

const Plaintext = ({ input, text, ...rest }) => (
  <p {...rest}>
    {text}
  </p>
)

Plaintext.propTypes = {
  input: PropTypes.object.isRequired,
  text: PropTypes.string,
}

export default Plaintext
