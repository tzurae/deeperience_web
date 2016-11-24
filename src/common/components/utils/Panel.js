import React, { PropTypes } from 'react'
import Text from '../widgets/Text'
import styles from '../../styles'

const style = {
  underline: {
    margin: '0px auto',
    width: '90%',
    height: '2px',
  },
  container: {
    borderRadius: '5px',
    backgroundColor: 'white',
    marginBottom: '20px',
  },
  title: {
    padding: '20px 30px',
    fontSize: styles.font.big,
    color: styles.color.orange,
    textAlign: 'center',
  },
  contentDiv: {
    padding: '20px 15px',
  },
}

const Panel = ({
  title,
  titleStyle,
  underlineStyle,
  isUnderline,
  children,
  contentDivStyle,
}) => {
  return (
    <div style={style.container}>
      <Text style={{ ...style.title, ...titleStyle }} id={title}/>
      {isUnderline && <div style={{ ...style.underline, ...underlineStyle }}/>}
      <div style={{ ...style.contentDiv, ...contentDivStyle }}>
        {children}
      </div>
    </div>
  )
}

Panel.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  underlineStyle: PropTypes.object,
  isUnderline: PropTypes.bool,
  contentDivStyle: PropTypes.object,
}

Panel.defaultProps = {
  title: '',
  titleStyle: {},
  underlineStyle: {},
  isUnderline: true,
  contentDivStyle: {},
}

export default Panel
