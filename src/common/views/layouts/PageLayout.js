import React from 'react';
import BsContainer from '../components/bs/Container';

const PageLayout = ({ children, ...rest }) => (
  <BsContainer {...rest}>
    {children}
  </BsContainer>
);

export default PageLayout;
