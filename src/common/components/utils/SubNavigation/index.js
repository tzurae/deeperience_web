import React, { PropTypes } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Navbar from '../BsNavbar'
import NavLink from '../NavLink'
import Text from '../Text'
import styles from './styles.scss'

const SubNavigation = ({ activeTab, tabText, tabLink }) => (
  <Navbar staticTop className={styles.nav}>
    <Grid>
      <Navbar.Body>
        <Navbar.Nav className={styles.header}>
          <Navbar.Nav>
            {
              tabText.map((text, index) => (
                <NavLink
                  key={index}
                  to={tabLink[index]}
                  onlyActiveOnIndex
                >
                  <Text
                    className={activeTab === index ? styles.textActive : styles.textInactive}
                    id={text}/>
                </NavLink>
              ))
            }
          </Navbar.Nav>
        </Navbar.Nav>
      </Navbar.Body>
    </Grid>
  </Navbar>
)

SubNavigation.propTypes = {
  activeTab: PropTypes.number,
  tabText: PropTypes.arrayOf(PropTypes.string),
  tabLink: PropTypes.arrayOf(PropTypes.string),
}

SubNavigation.defaultProps = {
  activeTab: 0,
  tabText: [],
  tabLink: [],
}

export default SubNavigation
