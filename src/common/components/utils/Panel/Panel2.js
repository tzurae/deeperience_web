import React from 'react'
import Panel from './DefaultPanel'
import styles from './styles.scss'
import cx from 'classnames'

const Panel2 = ({ title, children, underlineClass, ...props }) => (
  <Panel
    title={title}
    underlineClass={cx(styles.underline2, underlineClass)}
    {...props}
  >
    {children}
  </Panel>
)

export default Panel2
