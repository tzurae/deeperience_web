import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Text from '../../widgets/Text'
import styles from '../../../styles'

const style = {
  underline: {
    background: styles.color.orange,
    margin: '10px auto',
    width: '100%',
    height: '3px',
  },
  container: {
    borderRadius: '5px',
    padding: '30px 30px',
    backgroundColor: 'white',
  },
  title: {
    fontSize: styles.font.big,
    color: styles.color.orange,
  },
}

const MainPanel = ({ title, children }) => {
  return (
    <Col md={7}>
      <div style={style.container}>
        <Title title={title}/>
        {children}
      </div>
    </Col>
  )
}

const Title = ({ title }) => (
  <div>
    <Text style={style.title} id={title}/>
    <div style={style.underline}/>
  </div>
)

export default MainPanel
