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
  className,
  comment,
  commentClass,
}) => {
  return (
    <div className={classname(styles.container, className)}>
      <Text className={classname(styles.title, titleClass)} id={title}/>
      {isUnderline && <div className={classname(styles.underline, underlineClass)}/>}
      <Text className={classname(styles.comment, commentClass)} id={comment}/>
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
  className: PropTypes.string,
  comment: PropTypes.string,
  commentClass: PropTypes.string,
}

Panel.defaultProps = {
  title: '',
  titleClass: '',
  underlineClass: '',
  isUnderline: true,
  contentDivClass: '',
  className: '',
  comment: '',
  commentClass: '',
}

export default Panel
