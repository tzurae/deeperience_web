import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import BsNavbar from './BsNavbar';
import BsContainer from './BsContainer';
import NavLink from './NavLink';
import Text from '././Text';
import localeAPI from '../../api/locale';
import { updateLocale } from '../../actions/intlActions';

class Navbar extends Component {
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

  _setLanguage(lang) {
    // only download when language changed
    if (lang !== this.context.store.getState().intl.locale) {
      localeAPI
        .show(lang)
        .catch((err) => {
          alert('load locale fail');
          throw err;
        })
        .then((json) => {
          this.context.store.dispatch(updateLocale(json));
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
              <NavLink to="/" onlyActiveOnIndex>
                <Text id="nav.home" />
              </NavLink>
              <NavLink to="/todo">
                <Text id="nav.todo" />
              </NavLink>
              <NavLink to="/does/not/exist">
                404
              </NavLink>
            </BsNavbar.Nav>

            <BsNavbar.Nav right>
              <BsNavbar.Dropdown title={<Text id="nav.language" />}>
                <li>
                  <a
                    onClick={this._setLanguage.bind(this, 'en-us')}
                    href="#"
                  >
                    English
                  </a>
                </li>
                <li>
                  <a
                    onClick={this._setLanguage.bind(this, 'zh-Tw')}
                    href="#"
                  >
                    繁體中文
                  </a>
                </li>
                <li>
                  <a
                    onClick={this._setLanguage.bind(this, 'foo-bar')}
                    href="#"
                  >
                    Not supported
                  </a>
                </li>
              </BsNavbar.Dropdown>
              <BsNavbar.Dropdown
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
              </BsNavbar.Dropdown>
            </BsNavbar.Nav>
          </BsNavbar.Body>
        </BsContainer>
      </BsNavbar>
    );
  }
};

Navbar.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

export default Navbar;
