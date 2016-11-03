import React, { PropTypes } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Navigation from '../utils/Navigation';
import ErrorList from '../utils/ErrorList';

let PageLayout = ({ hasGrid, children, ...rest }) => (
  <div>
    <Navigation />
    <ErrorList />
    {hasGrid ? (
      <Grid {...rest}>
        {children}
      </Grid>
    ) : children}
  </div>
);

PageLayout.propTypes = {
  hasGrid: PropTypes.bool,
};

PageLayout.defaultProps = {
  hasGrid: true,
};

export default PageLayout;
