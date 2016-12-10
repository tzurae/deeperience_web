import React from 'react'
import Panel from './DefaultPanel'
import styles from './styles.scss'

const Panel2 = ({ title, children, ...props }) => (
  <Panel
    title={title}
    underlineClass={styles.underline2}
    {...props}
  >
    {children}
  </Panel>
)

export default Panel2
