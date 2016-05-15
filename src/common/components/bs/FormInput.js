import React, { PropTypes } from 'react';
import classNames from 'classnames';
import PureInput from '../PureInput';

const Input = ({ label, field, ...rest }) => {
  const cx = classNames(
    'form-group',
    {'has-error': field.touched && field.error}
  );
  return (
    <div className={cx}>
      <label className="control-label col-sm-2">
        {label}
      </label>
      <div className="col-sm-10">
        <PureInput
          className="form-control"
          field={field}
          {...rest}
        />
        {field.touched && field.error &&
          <span className="help-block">{field.error}</span>}
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
};

export default Input;
