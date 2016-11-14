import React, { PropTypes } from 'react';
import cx from 'classnames';
import Input from '../bases/Input';

let BsInput = ({ input, className, ...rest }) => (
  <Input
    className={cx('form-control', className)}
    input={input}
    {...rest}
  />
);

BsInput.propTypes = {
  input: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default BsInput;
