import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import Navbar from '../main/Navbar';
import Container from '../main/Container';
import NavLink from '../NavLink';
import MenuItem from '../MenuItem';
import Text from '../Text';
import { updateLocale } from '../../actions/intlActions';

class Navigation extends Component {
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
        css: require('./component.css'),
      });
    }
  }

  _setLanguage(lang) {
    this.context.store
      .dispatch(updateLocale(lang))
      .then(() => {
        console.log('load locale (manually) ok');
      }, (err) => {
        alert('load locale (manually) fail');
      });
  }

  render() {
    const isAuth = !!this.props.user.token;
    const token = this.props.user.token;
    const user = this.props.user.data;
    const csLogo = classNames('navbar-brand', this.state.css.redBorder);

    return (
      <Navbar staticTop>
        <Container>
          <Navbar.Header>
            <Link className={csLogo} to="/" >Logo</Link>
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
                  !isAuth?
                  <Text id="nav.user" />:
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
        </Container>
      </Navbar>
    );
  }
};

Navigation.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

export default Navigation;
