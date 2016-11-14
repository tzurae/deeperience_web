import React, { PropTypes } from 'react';
import cx from 'classnames';
import Plaintext from '../bases/Plaintext';

let BsPlaintext = ({ input, className, ...rest }) => (
  <Plaintext
    className={cx('form-control-static', className)}
    input={input}
    {...rest}
  />
);

BsPlaintext.propTypes = {
  input: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default BsPlaintext;
