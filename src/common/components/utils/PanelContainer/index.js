import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import styles from './styles.scss'

const PanelContainer = ({ children }) => {
  return (
    <Row className={styles.container}>
      {children}
    </Row>
  )
}

export default PanelContainer
