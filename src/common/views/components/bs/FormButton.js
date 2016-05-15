import React, { PropTypes } from 'react';

const BsFormButton = ({ title, ...rest}) => (
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

BsFormButton.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BsFormButton;
