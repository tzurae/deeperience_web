import React from 'react'
import Panel from './DefaultPanel'
import styles from './styles.scss'

const Panel1 = ({ title, children, ...props }) => (
  <Panel
    title={title}
    underlineClass={styles.underline1}
    titleClass={styles.title1}
    contentDivClass={styles.contentDiv1}
    {...props}
  >
    {children}
  </Panel>
)

export default Panel1
