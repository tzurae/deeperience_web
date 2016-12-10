import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Grid from 'react-bootstrap/lib/Grid'
import Roles from '../../../constants/Roles'
import { updateLocale } from '../../../reducers/global/globalActions'
import { pushErrors } from '../../../reducers/error/errorActions'
import Navbar from '../BsNavbar'
import NavLink from '../NavLink'
import MenuItem from '../MenuItem'
import Text from '../Text'
import styles from './styles.scss'
import classname from 'classnames'

class Navigation extends Component {
  _setLanguage(lang) {
    const { store } = this.context
    store
      .dispatch(updateLocale(lang))
      .then(() => {
        console.log('load locale (manually) ok')
      }, (err) => {
        store.dispatch(pushErrors(err))
      })
  }

  render() {
    const { isAuth, user } = this.props
    const isAdmin = (user.role === Roles.ADMIN)

    return (
      <Navbar staticTop className={styles.nav}>
        <Grid>
          <Navbar.Header className={styles.header}>
            <Link className={classname('navbar-brand', styles.text)} to="/">
              Deeperience
            </Link>
          </Navbar.Header>

          <Navbar.Body>
            {/*
              <Navbar.Nav>
                <NavLink to="/" onlyActiveOnIndex>
                  <Text id="nav.home" />
                </NavLink>
                <NavLink to="/does/not/exist">
                  404
                </NavLink>
              </Navbar.Nav>
            */}

            <Navbar.Nav right>
              <Navbar.Dropdown
                title={<Text id="nav.language" className={styles.dropdownText}/>}>
                <MenuItem
                  title="English"
                  onClick={this._setLanguage.bind(this, 'en-us')}
                />
                <MenuItem
                  title="繁體中文"
                  onClick={this._setLanguage.bind(this, 'zh-tw')}
                />
              </Navbar.Dropdown>

              <Navbar.Dropdown
                title={<Text id="nav.customize" className={styles.dropdownText}/>}
              >
                <NavLink to="/trip/customize">
                  <Text id="nav.customize.customize"/>
                </NavLink>
                <NavLink to="/trip/myCustomTrip">
                  <Text id="nav.customize.myCustomTrip"/>
                </NavLink>
              </Navbar.Dropdown>

              <Navbar.Dropdown
                title={<Text id="nav.trip" className={styles.dropdownText}/>}
              >
                <NavLink to="/trip/createSite">
                  <Text id="nav.trip.createSite"/>
                </NavLink>
                <NavLink to="/trip/createTrip">
                  <Text id="nav.trip.createTrip"/>
                </NavLink>
              </Navbar.Dropdown>

              <Navbar.Dropdown
                title={
                  !isAuth ?
                    <Text id="nav.user.profile" className={styles.dropdownText}/> :
                    user.avatarURL ? (
                      <div
                        className={styles.avatar}
                        style={{
                          background: `#ffffff url(${user.avatarURL}) no-repeat center center`,
                          backgroundSize: 'contain',
                        }}
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
    )
  }
};

Navigation.contextTypes = {
  store: React.PropTypes.object.isRequired,
}

export default connect(({ cookies: { token, user } }) => ({
  isAuth: !!token,
  user: (user && JSON.parse(user)) || {},
}), null, null, {
  pure: false,
})(Navigation)
