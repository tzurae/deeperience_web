import React, { PropTypes } from 'react'
import cx from 'classnames'
import Panel from './DefaultPanel'
import styles from './styles.scss'

const Panel1 = ({
  children,
  contentDivClass,
  titleClass,
  underlineClass,
  ...props
}) => (
  <Panel
    underlineClass={cx(styles.underline1, underlineClass)}
    titleClass={cx(styles.title1, titleClass)}
    contentDivClass={cx(styles.contentDiv1, contentDivClass)}
    {...props}
  >
    {children}
  </Panel>
)

Panel1.PropTypes = {
  contentDivClass: PropTypes.string,
  titleClass: PropTypes.string,
  underlineClass: PropTypes.string,
}

Panel1.defaultProps = {
  contentDivClass: '',
  titleClass: '',
  underlineClass: '',
}

export default Panel1
