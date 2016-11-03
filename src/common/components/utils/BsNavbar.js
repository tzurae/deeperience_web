import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class BsNavbar extends Component {
  componentDidMount() {
    if (process.env.BROWSER && this.props.fixedTop) {
      document.body.style.marginTop = '50px';
    }
  }

  render() {
    const {
      fixedTop,
      staticTop,
      children,
      ...rest
    } = this.props;
    const cx = classNames(
      'navbar',
      'navbar-default',
      {
        'navbar-fixed-top': fixedTop,
        'navbar-static-top': staticTop,
      }
    );
    return (
      <nav className={cx} {...rest}>
        {children}
      </nav>
    );
  }
};

const Header = ({ children, ...rest }) => (
  <div className="navbar-header" {...rest}>
    <button
      type="button"
      className="navbar-toggle collapsed"
      data-toggle="collapse"
      data-target="#navbar"
      aria-expanded="false">
      <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
    </button>
    {children}
  </div>
);

const Body = ({ children, ...rest }) => (
  <div className="collapse navbar-collapse" id="navbar" {...rest}>
    {children}
  </div>
);

const Nav = ({ right, children, ...rest }) => {
  const cx = classNames(
    'nav',
    'navbar-nav',
    {
      'navbar-right': right,
    }
  );
  return (
    <ul className={cx} {...rest}>
      {children}
    </ul>
  );
};

const Dropdown = ({ title, children }) => (
  <li className="dropdown">
    <a
      href="#"
      className="dropdown-toggle"
      data-toggle="dropdown"
      role="button"
      aria-haspopup="true"
      aria-expanded="false"
    >
      {title}
      <span className="caret"></span>
    </a>
    <ul className="dropdown-menu">
      {children}
    </ul>
  </li>
);

BsNavbar.propTypes = {
  fixedTop: PropTypes.bool,
  staticTop: PropTypes.bool,
};

Nav.propTypes = {
  right: PropTypes.bool,
};

Dropdown.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

BsNavbar.Header = Header;
BsNavbar.Body = Body;
BsNavbar.Nav = Nav;
BsNavbar.Dropdown = Dropdown;

export default BsNavbar;
