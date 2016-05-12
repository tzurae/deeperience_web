import React from 'react';

const BsHorizontalForm = (props) => (
  <form className="form-horizontal" {...props}>
    {props.children}
  </form>
);

export default BsHorizontalForm;
