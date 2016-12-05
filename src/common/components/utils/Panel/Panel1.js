import React from 'react'
import Panel from './defaultPanel'
import styles from './styles.scss'

const Panel1 = ({ title, children }) => (
  <Panel
    title={title}
    underlineClass={styles.underline1}
    titleClass={styles.title1}
    contentDivClass={styles.contentDiv1}
  >
    {children}
  </Panel>
)

export default Panel1
