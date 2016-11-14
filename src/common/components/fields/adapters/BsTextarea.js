import React, { PropTypes } from 'react';
import cx from 'classnames';
import Textarea from '../bases/Textarea';

let BsTextarea = ({ input, className, ...rest }) => (
  <Textarea
    className={cx('form-control', className)}
    input={input}
    {...rest}
  />
);

BsTextarea.propTypes = {
  input: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default BsTextarea;
