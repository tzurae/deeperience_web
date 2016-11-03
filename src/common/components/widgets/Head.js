import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const Head = ({ title, metas, links, scripts }) => (
  <Helmet
    title={title}
    meta={metas}
    link={links.map(src =>
      ({ href: src, rel: 'stylesheet' }))}
    script={scripts.map(src =>
      ({ src: src, type: 'text/javascript' }))} />
);

Head.defaultProps = {
  metas: [],
  links: [],
  scripts: [],
};

Head.propTypes = {
  title: PropTypes.string,
  metas: PropTypes.arrayOf(PropTypes.object),
  links: PropTypes.arrayOf(PropTypes.string),
  scripts: PropTypes.arrayOf(PropTypes.string),
};

export default Head;
