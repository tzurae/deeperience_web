import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Navbar from './BsNavbar'
import NavLink from './NavLink'
import Text from '../widgets/Text'
import styles from '../../styles'

const style = {
  nav: {
    backgroundColor: 'white',
    borderWidth: '0px',
    zIndex: 0,
  },
  header: {
    marginLeft: '20px',
  },
  text: {
    color: 'black',
    fontSize: styles.font.medium,
  },
  textActive: {
    color: styles.color.orange,
    fontSize: styles.font.medium,
  },
}

const Navigation2 = ({ tripTabActive }) => (
      <Navbar staticTop style={style.nav}>
        <Grid>
          <Navbar.Body>
            <Navbar.Nav style={style.header}>
              <Navbar.Nav>
                <NavLink to="/trip/createSite" onlyActiveOnIndex>
                  {tripTabActive === 1 ?
                    <Text style={style.textActive} id="nav.trip.createSite"/> :
                      <Text style={style.text} id="nav.trip.createSite" />}
                </NavLink>
                <NavLink to="#" onlyActiveOnIndex>
                  {tripTabActive === 2 ?
                    <Text style={style.textActive} id="nav.trip.manageSite"/> :
                    <Text style={style.text} id="nav.trip.manageSite" />}
                </NavLink>
                <NavLink to="/trip/createTrip">
                  {tripTabActive === 3 ?
                    <Text style={style.textActive} id="nav.trip.createTrip"/> :
                    <Text style={style.text} id="nav.trip.createTrip"/>}
                </NavLink>
                <NavLink to="#" onlyActiveOnIndex>
                  {tripTabActive === 4 ?
                    <Text style={style.textActive} id="nav.trip.manageTrip"/> :
                    <Text style={style.text} id="nav.trip.manageTrip" />}
                </NavLink>
              </Navbar.Nav>
            </Navbar.Nav>
          </Navbar.Body>
        </Grid>
      </Navbar>)

export default Navigation2
