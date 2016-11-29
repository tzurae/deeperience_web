import React, { PropTypes } from 'react'
import Text from '../../widgets/Text'
import styles from './styles.scss'

const Panel = ({
  title,
  titleStyle,
  underlineStyle,
  isUnderline,
  children,
  contentDivStyle,
}) => {
  return (
    <div className={styles.container}>
      <Text className={styles.title} style={titleStyle} id={title}/>
      {isUnderline && <div className={styles.underline} style={underlineStyle}/>}
      <div className={styles.contentDiv} style={contentDivStyle}>
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
