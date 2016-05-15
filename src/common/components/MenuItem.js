import React, { PropTypes } from 'react';

const MenuItem = ({ title, href, ...rest }) => (
  <li>
    <a href={href} {...rest}>
      {title}
    </a>
  </li>
);

MenuItem.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
};

MenuItem.defaultProps = {
  href: '#',
};

export default MenuItem;
