import React, { PropTypes } from 'react';

const AnchorItem = ({ title, href, ...rest }) => (
  <li>
    <a href={href} {...rest}>
      {title}
    </a>
  </li>
);

AnchorItem.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
};

AnchorItem.defaultProps = {
  href: '#',
};

export default AnchorItem;
