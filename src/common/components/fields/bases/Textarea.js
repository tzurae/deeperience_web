import React, { PropTypes } from 'react';

let Textarea = ({ input, ...rest }) => (
  <textarea
    {...input}
    {...rest}
  />
);

Textarea.propTypes = {
  input: PropTypes.object.isRequired,
};

export default Textarea;
