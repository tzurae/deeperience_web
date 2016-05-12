import React, { PropTypes } from 'react';

const BsPageHeader = ({ title }) => (
  <div className="page-header">
    <h1>{title}</h1>
  </div>
);

BsPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BsPageHeader;
