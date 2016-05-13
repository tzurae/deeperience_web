import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import BsNavbar from './BsNavbar';
import BsContainer from './BsContainer';
import NavLink from './NavLink';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      css: {},
    };
  }

  componentDidMount() {
    // assign css in componentDidMount lifecycle to prevent components from
    // rendering different markups on server- and client-side
    if (process.env.BROWSER) {
      this.setState({
        css: require('./Navbar.css'),
      });
    }
  }

  render() {
    const isAuth = !!this.props.user.token;
    const token = this.props.user.token;
    const user = this.props.user.data;
    const csLogo = classNames('navbar-brand', this.state.css.redBorder);

    return (
      <BsNavbar staticTop>
        <BsContainer>
          <BsNavbar.Header>
            <Link className={csLogo} to="/" >Logo</Link>
          </BsNavbar.Header>

          <BsNavbar.Body>
            <BsNavbar.Nav>
              <NavLink to="/" onlyActiveOnIndex>Home</NavLink>
              <NavLink to="/todo">Todo</NavLink>
              <NavLink to="/does/not/exist">404</NavLink>
            </BsNavbar.Nav>

            <BsNavbar.Nav right>
              <BsNavbar.Dropdown
                title={!isAuth? 'User': (user.name || user.email)}
              >
                {!isAuth && <NavLink to="/user/login">Login</NavLink>}
                {!isAuth && <NavLink to="/user/register">Register</NavLink>}
                {isAuth && <NavLink to="/user/me">My Profile</NavLink>}
                {isAuth && <NavLink to="/user/logout">Logout</NavLink>}
              </BsNavbar.Dropdown>
            </BsNavbar.Nav>
          </BsNavbar.Body>
        </BsContainer>
      </BsNavbar>
    );
  }
};
