import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Grid from 'react-bootstrap/lib/Grid';
import Image from 'react-bootstrap/lib/Image';
import Roles from '../../constants/Roles';
import { updateLocale } from '../../actions/intlActions';
import { pushErrors } from '../../actions/errorActions';
import Navbar from './BsNavbar';
import NavLink from './NavLink';
import MenuItem from './MenuItem';
import Text from '../widgets/Text';

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
    let { isAuth, user } = this.props;
    let isAdmin = (user.role === Roles.ADMIN);

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
              <NavLink to="/demo/form-element">
                Form Elements
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
                  user.avatarURL ? (
                    <Image
                      style={{ height: 18 }}
                      src={user.avatarURL} rounded
                    />
                  ) : (user.name || user.email)
                }
              >
                {!isAuth &&
                  <NavLink to="/user/login">
                    <Text id="nav.user.login" />
                  </NavLink>}
                {!isAuth &&
                  <NavLink to="/user/register">
                    <Text id="nav.user.register" />
                  </NavLink>}
                {isAuth && isAdmin &&
                  <NavLink to="/admin">
                    Admin System
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

export default connect(({ cookies: { token, user } }) => ({
  isAuth: !!token,
  user: (user && JSON.parse(user)) || {},
}), null, null, {
  pure: false,
})(Navigation);
