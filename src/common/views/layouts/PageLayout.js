import React from 'react';
import Container from '../components/main/Container';

const PageLayout = ({ children, ...rest }) => (
  <Container {...rest}>
    {children}
  </Container>
);

export default PageLayout;
