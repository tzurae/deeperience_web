import React from 'react';

const BsContainer = ({ children, ...rest }) => (
  <div className="container" {...rest}>
    {children}
  </div>
);

export default BsContainer;
