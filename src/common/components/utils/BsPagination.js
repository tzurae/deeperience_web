import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import Text from '../widgets/Text';

let style = {
  margin: 2,
};

let Pagination = ({ base, page, simple, ...rest }) => {
  return (
    <nav {...rest}>
      <ul className="pager">
        {!simple && (
          <li
            className={cx({'disabled': page.current === page.first})}
            style={style}
          >
            <Link to={{
              pathname: base,
              query: {
                page: page.first,
              },
            }}>
              <i className="fa fa-angle-double-left" aria-hidden="true" />
              {' '}<Text id="page.first" />
            </Link>
          </li>
        )}
        <li
          className={cx({'disabled': page.current === page.first})}
          style={style}
        >
          <Link
            to={{
              pathname: base,
              query: {
                page: page.current - 1,
              },
            }}
          >
            <i className="fa fa-chevron-left" aria-hidden="true" />
            {' '}<Text id="page.prev" />
          </Link>
        </li>
        <li
          className={cx({'disabled': page.current === page.last})}
          style={style}
        >
          <Link
            to={{
              pathname: base,
              query: {
                page: page.current + 1,
              },
            }}
          >
            <Text id="page.next" />{' '}
            <i className="fa fa-chevron-right" aria-hidden="true" />
          </Link>
        </li>
        {!simple && (
          <li
            className={cx({'disabled': page.current === page.last})}
            style={style}
          >
            <Link to={{
              pathname: base,
              query: {
                page: page.last,
              },
            }}>
              <Text id="page.last" />{' '}
              <i className="fa fa-angle-double-right" aria-hidden="true" />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  base: PropTypes.string,
  page: PropTypes.object,
  simple: PropTypes.bool,
};

Pagination.defaultProps = {
  page: {
    skip: 0,
    limit: 0,
    first: 0,
    current: 0,
    last: 0,
    total: 0,
  },
};

export default Pagination;
