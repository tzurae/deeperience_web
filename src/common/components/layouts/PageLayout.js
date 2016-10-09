import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';

const PageLayout = ({ children, ...rest }) => (
  <Grid {...rest}>
    {children}
  </Grid>
);

export default PageLayout;
