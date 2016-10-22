import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Navigation from '../utils/Navigation';
import ErrorList from '../utils/ErrorList';

const PageLayout = ({ children, ...rest }) => (
  <div>
    <Navigation />
    <ErrorList />
    <Grid {...rest}>
      {children}
    </Grid>
  </div>
);

export default PageLayout;
