import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Grid from 'react-bootstrap/lib/Grid'
import Image from 'react-bootstrap/lib/Image'
import Roles from '../../constants/Roles'
import { updateLocale } from '../../reducers/intl/intlActions'
import { pushErrors } from '../../reducers/error/errorActions'
import Navbar from './BsNavbar'
import NavLink from './NavLink'
import MenuItem from './MenuItem'
import Text from '../widgets/Text'
import styles from '../../styles'

const style = {
  nav: {
    backgroundColor: styles.color.navbarGrey,
    borderWidth: '0px',
  },
  text: {
    color: 'white',
    fontSize: styles.font.medium,
  },
  header: {
    marginLeft: '25px',
  },
}

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
      <Navbar staticTop style={style.nav}>
        <Grid>
          <Navbar.Header style={style.header}>
            <Link className="navbar-brand" to="/" style={style.text}>
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
              <Navbar.Dropdown title={<Text id="nav.language" />}>
                <MenuItem
                  title="English"
                  onClick={this._setLanguage.bind(this, 'en-us')}
                />
                <MenuItem
                  title="繁體中文"
                  onClick={this._setLanguage.bind(this, 'zh-tw')}
                />
              </Navbar.Dropdown>
              <Navbar.Nav>
                {/* <NavLink to="/feature" onlyActiveOnIndex>*/}
                  {/* <Text id="nav.feature" style={style.text}/>*/}
                {/* </NavLink>*/}
                {/* <NavLink to="/wonderful">*/}
                  {/* <Text id="nav.wonderful" style={style.text}/>*/}
                {/* </NavLink>*/}
                <NavLink to="/customize">
                  <Text id="nav.customize" style={style.text}/>
                </NavLink>
              </Navbar.Nav>
              <Navbar.Dropdown
                title={<Text id="nav.trip" style={{ ...style.text, display: 'inline' }}/>}
              >
                <NavLink to="/trip/createTrip">
                  <Text id="nav.trip.createTrip"/>
                </NavLink>
              </Navbar.Dropdown>
              <Navbar.Dropdown
                title={
                  !isAuth ?
                  <Text id="nav.user.profile"/> :
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
