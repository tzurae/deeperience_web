import React from 'react';

const HorizontalForm = ({ children, ...rest }) => (
  <form className="form-horizontal" {...rest}>
    {children}
  </form>
);

export default HorizontalForm;
