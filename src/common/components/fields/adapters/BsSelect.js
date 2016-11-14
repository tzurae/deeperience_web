import React, { PropTypes } from 'react';
import cx from 'classnames';
import Select from '../bases/Select';

let BsSelect = ({ input, className, ...rest }) => (
  <Select
    className={cx('form-control', className)}
    input={input}
    {...rest}
  />
);

BsSelect.propTypes = {
  input: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default BsSelect;
