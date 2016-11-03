import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setCrrentPage } from '../../actions/pageActions';
import Text from '../widgets/Text';

let style = {
  cursor: 'pointer',
  margin: 2,
};

let Pagination = ({ simple, resourceName, pages, dispatch, ...rest }) => {
  let page = pages[resourceName] || pages.default;

  return (
    <nav {...rest}>
      <ul className="pager">
        {!simple && (
          <li
            className={cx({'disabled': page.current === page.first})}
            style={style}
          >
            <a
              onClick={() =>
                dispatch(setCrrentPage(resourceName, page.first))
              }
            >
              <i className="fa fa-angle-double-left" aria-hidden="true" />
              {' '}<Text id="page.first" />
            </a>
          </li>
        )}
        <li
          className={cx({'disabled': page.current === page.first})}
          style={style}
        >
          <a
            onClick={() =>
              dispatch(setCrrentPage(resourceName, page.current - 1))
            }
          >
            <i className="fa fa-chevron-left" aria-hidden="true" />
            {' '}<Text id="page.prev" />
          </a>
        </li>
        <li
          className={cx({'disabled': page.current === page.last})}
          style={style}
        >
          <a
            onClick={() =>
              dispatch(setCrrentPage(resourceName, page.current + 1))
            }
          >
            <Text id="page.next" />{' '}
            <i className="fa fa-chevron-right" aria-hidden="true" />
          </a>
        </li>
        {!simple && (
          <li
            className={cx({'disabled': page.current === page.last})}
            style={style}
          >
            <a
              onClick={() =>
                dispatch(setCrrentPage(resourceName, page.last))
              }
            >
              <Text id="page.last" />{' '}
              <i className="fa fa-angle-double-right" aria-hidden="true" />
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  resourceName: PropTypes.string.isRequired,
  simple: PropTypes.bool,
};

export default connect(state => ({
  pages: state.pages,
}), null, null, {
  pure: false,
})(Pagination);
