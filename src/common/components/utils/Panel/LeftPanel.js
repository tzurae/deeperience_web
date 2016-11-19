import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Text from '../../widgets/Text'
import styles from '../../../styles'

const style = {
  underline: {
    background: styles.color.borderGrey,
    margin: '0px auto',
    width: '90%',
    height: '2px',
  },
  container: {
    borderRadius: '5px',
    backgroundColor: 'white',
  },
  title: {
    padding: '10px 0',
    fontSize: styles.font.big,
    color: styles.color.orange,
    textAlign: 'center',
  },
  contentDiv: {
    padding: '10px 15px',
  },
}

const LeftPanel = ({ title, children }) => {
  return (
    <Col md={2}>
      <div style={style.container}>
        <Title title={title}/>
        <div style={style.contentDiv}>
          {children}
        </div>

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

export default LeftPanel
