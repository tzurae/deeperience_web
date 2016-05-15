import React, { PropTypes } from 'react';

const FormButton = ({ title, ...rest}) => (
  <div className="form-group">
    <div className="col-sm-offset-2 col-sm-10">
      <button
        className="btn btn-default"
        {...rest}
      >
        {title}
      </button>
    </div>
  </div>
);

FormButton.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FormButton;
