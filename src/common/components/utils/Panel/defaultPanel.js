import React, { PropTypes } from 'react'
import Text from '../Text'
import styles from './styles.scss'
import classname from 'classnames'

const Panel = ({
  title,
  titleClass,
  underlineClass,
  isUnderline,
  children,
  contentDivClass,
}) => {
  return (
    <div className={styles.container}>
      <Text className={classname(styles.title, titleClass)} id={title}/>
      {isUnderline && <div className={classname(styles.underline, underlineClass)}/>}
      <div className={classname(styles.contentDiv, contentDivClass)}>
        {children}
      </div>
    </div>
  )
}

Panel.propTypes = {
  title: PropTypes.string,
  titleClass: PropTypes.string,
  underlineClass: PropTypes.string,
  isUnderline: PropTypes.bool,
  contentDivClass: PropTypes.string,
}

Panel.defaultProps = {
  title: '',
  titleClass: '',
  underlineClass: '',
  isUnderline: true,
  contentDivClass: '',
}

export default Panel
