import React from 'react'
import Panel from './defaultPanel'
import styles from './styles.scss'

const PanelWithWord = ({ children, ...props }) => (
  <Panel
    underlineClass={styles.underlineWithWord}
    titleClass={styles.titleWithWord}
    contentDivClass={styles.contentDivWithWord}
    commentClass={styles.commentWithWord}
    {...props}
  >
    {children}
  </Panel>
)

export default PanelWithWord
