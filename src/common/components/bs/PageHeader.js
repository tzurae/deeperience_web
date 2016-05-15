import React, { PropTypes } from 'react';

const PageHeader = ({ title }) => (
  <div className="page-header">
    <h1>{title}</h1>
  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHeader;
