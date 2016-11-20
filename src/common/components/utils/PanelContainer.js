import React from 'react'
import Row from 'react-bootstrap/lib/Row'

const style = {
  container: {
    padding: 25,
  },
}

const PanelContainer = ({ children }) => {
  return (
    <Row style={style.container}>
      {children}
    </Row>
  )
}

export default PanelContainer
