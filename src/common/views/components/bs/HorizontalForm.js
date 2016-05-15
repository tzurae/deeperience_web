import React from 'react';

const BsHorizontalForm = ({ children, ...rest }) => (
  <form className="form-horizontal" {...rest}>
    {children}
  </form>
);

export default BsHorizontalForm;
