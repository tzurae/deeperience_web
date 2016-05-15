import React from 'react';

const Container = ({ children, ...rest }) => (
  <div className="container" {...rest}>
    {children}
  </div>
);

export default Container;
