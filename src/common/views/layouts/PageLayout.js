import React from 'react';
import BsContainer from '../components/BsContainer';

const PageLayout = ({ children, ...rest }) => (
  <BsContainer {...rest}>
    {children}
  </BsContainer>
);

export default PageLayout;
