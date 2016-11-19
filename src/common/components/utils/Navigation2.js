import React, { Component } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Navbar from './BsNavbar'
import NavLink from './NavLink'
import Text from '../widgets/Text'

const style = {
  nav: {
    backgroundColor: 'white',
    borderWidth: '0px',
  },
  header: {
    marginLeft: '20px',
  },
  text: {
    color: 'black',
  },
}

class Navigation2 extends Component {
  render() {
    return (
      <Navbar staticTop style={style.nav}>
        <Grid>
          <Navbar.Body>
            <Navbar.Nav left style={style.header}>
              <Navbar.Nav>
                <NavLink to="/createTrip/1" onlyActiveOnIndex>
                  <Text id="nav.trip.createSite" />
                </NavLink>
                <NavLink to="/createTrip/1" onlyActiveOnIndex>
                  <Text id="nav.trip.manageSite" />
                </NavLink>
                <NavLink to="/createTrip/1" onlyActiveOnIndex>
                  <Text id="nav.trip.createTrip" />
                </NavLink>
                <NavLink to="/createTrip/1" onlyActiveOnIndex>
                  <Text id="nav.trip.manageTrip" />
                </NavLink>
              </Navbar.Nav>
            </Navbar.Nav>
          </Navbar.Body>
        </Grid>
      </Navbar>
    )
  }
};

Navigation2.contextTypes = {
  store: React.PropTypes.object.isRequired,
}

export default Navigation2
