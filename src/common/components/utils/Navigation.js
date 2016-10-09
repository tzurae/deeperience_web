import React, { Component } from 'react';
import { Link } from 'react-router';
import Grid from 'react-bootstrap/lib/Grid';
import { updateLocale } from '../../actions/intlActions';
import { pushErrors } from '../../actions/errorActions';
import Navbar from './BsNavbar';
import NavLink from './NavLink';
import MenuItem from './MenuItem';
import Text from '../Text';

class Navigation extends Component {
  _setLanguage(lang) {
    let { store } = this.context;
    store
      .dispatch(updateLocale(lang))
      .then(() => {
        console.log('load locale (manually) ok');
      }, (err) => {
        store.dispatch(pushErrors(err));
      });
  }

  render() {
    let { cookies: { token, user } } = this.context.store.getState();
    let isAuth = !!token;
    user = (user && JSON.parse(user)) || {};

    return (
      <Navbar staticTop>
        <Grid>
          <Navbar.Header>
            <Link className="navbar-brand" to="/" >
              Logo
            </Link>
          </Navbar.Header>

          <Navbar.Body>
            <Navbar.Nav>
              <NavLink to="/" onlyActiveOnIndex>
                <Text id="nav.home" />
              </NavLink>
              <NavLink to="/todo">
                <Text id="nav.todo" />
              </NavLink>
              <NavLink to="/does/not/exist">
                404
              </NavLink>
            </Navbar.Nav>

            <Navbar.Nav right>
              <Navbar.Dropdown title={<Text id="nav.language" />}>
                <MenuItem
                  title="English"
                  onClick={this._setLanguage.bind(this, 'en-us')}
                />
                <MenuItem
                  title="繁體中文"
                  onClick={this._setLanguage.bind(this, 'zh-tw')}
                />
                <MenuItem
                  title="Not supported"
                  onClick={this._setLanguage.bind(this, 'foo-bar')}
                />
              </Navbar.Dropdown>
              <Navbar.Dropdown
                title={
                  !isAuth ?
                  <Text id="nav.user" /> :
                  (user.name || user.email)}
              >
                {!isAuth &&
                  <NavLink to="/user/login">
                    <Text id="nav.user.login" />
                  </NavLink>}
                {!isAuth &&
                  <NavLink to="/user/register">
                    <Text id="nav.user.register" />
                  </NavLink>}
                {isAuth &&
                  <NavLink to="/user/me">
                    <Text id="nav.user.profile" />
                  </NavLink>}
                {isAuth &&
                  <NavLink to="/user/logout">
                    <Text id="nav.user.logout" />
                  </NavLink>}
              </Navbar.Dropdown>
            </Navbar.Nav>
          </Navbar.Body>
        </Grid>
      </Navbar>
    );
  }
};

Navigation.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

export default Navigation;
